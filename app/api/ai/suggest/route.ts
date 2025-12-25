import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST() {
  // 🔒 SAFETY: disable AI in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'AI suggestions disabled in production' },
      { status: 403 }
    )
  }

  try {
    const prompt = `
Suggest ONE real weekend spot in Bangalore.
Return STRICT JSON with keys:
name, description, hub, category.
No markdown. No extra text.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    const raw = completion.choices[0].message.content || '{}'
    const data = JSON.parse(raw)

    const { error } = await supabase
      .from('ai_suggested_spots')
      .insert({
        name: data.name,
        description: data.description,
        hub: data.hub,
        category: data.category,
        status: 'pending',
        source: 'ai'
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
