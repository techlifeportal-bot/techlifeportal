import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body?.type;

    if (!type) {
      return NextResponse.json(
        { error: "Missing suggestion type" },
        { status: 400 }
      );
    }

    const promptMap: Record<string, string> = {
      weekend_spots:
        "Suggest 3 Bangalore weekend spots for IT professionals.",
      cafes:
        "Suggest 3 cafes in Bangalore popular among IT professionals.",
      gyms:
        "Suggest 3 gyms in Bangalore near IT hubs.",
      companies:
        "Suggest 3 IT companies in Bangalore.",
      jobs:
        "Suggest 3 IT job roles currently popular in Bangalore.",
    };

    const prompt = promptMap[type];
    if (!prompt) {
      return NextResponse.json(
        { error: "Invalid suggestion type" },
        { status: 400 }
      );
    }

    // 🔒 STRICT JSON enforcement
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You MUST return ONLY valid JSON. No text, no markdown, no explanations.",
        },
        {
          role: "user",
          content: `
Return a JSON array of exactly 3 items.
Each item must have:
- name (string)
- description (string)
- location (string)

${prompt}
`,
        },
      ],
    });

    const raw = completion.choices[0].message.content;

    if (!raw) {
      throw new Error("Empty AI response");
    }

    let items;
    try {
      items = JSON.parse(raw);
    } catch (err) {
      console.error("JSON parse failed:", raw);
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    for (const item of items) {
      const { error } = await supabase
        .from("ai_suggested_spots")
        .insert({
          name: item.name,
          description: item.description,
          location: item.location,
          category: type,
        });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Database insert failed" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("AI suggest API error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
