'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Draft = {
  id: string
  name: string
  description: string
  hub: string
  category: string
}

export default function AdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)
  const [approvingId, setApprovingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadDrafts() {
      const { data } = await supabase
        .from('ai_suggested_spots')
        .select('id, name, description, hub, category')
        .order('created_at', { ascending: false })

      setDrafts(data || [])
      setLoading(false)
    }

    loadDrafts()
  }, [])

  function updateDraft(
    id: string,
    field: keyof Draft,
    value: string
  ) {
    setDrafts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      )
    )
  }

  async function approveDraft(draft: Draft) {
    setApprovingId(draft.id)

    const { error: insertError } = await supabase
      .from('approved_spots')
      .insert({
        name: draft.name,
        description: draft.description,
        hub: draft.hub,
        category: draft.category,
        source: 'ai'
      })

    if (insertError) {
      alert('Approval failed')
      console.error(insertError)
      setApprovingId(null)
      return
    }

    await supabase
      .from('ai_suggested_spots')
      .delete()
      .eq('id', draft.id)

    setDrafts((prev) =>
      prev.filter((d) => d.id !== draft.id)
    )

    setApprovingId(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* DEV MODE BANNER */}
      <div className="mb-4 text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
        DEV MODE — AI suggestions, approval and publish are manual and safe
      </div>

      <h1 className="text-2xl font-semibold mb-6">
        Admin — Review AI Drafts
      </h1>

      {loading && <p>Loading drafts…</p>}

      {!loading && drafts.length === 0 && (
        <p className="text-gray-500">
          No AI drafts pending review.
        </p>
      )}

      <div className="space-y-6">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-white border rounded p-4 space-y-3"
          >
            <input
              className="w-full border px-3 py-2 font-semibold"
              value={draft.name}
              onChange={(e) =>
                updateDraft(draft.id, 'name', e.target.value)
              }
            />

            <textarea
              className="w-full border px-3 py-2 text-sm"
              rows={4}
              value={draft.description}
              onChange={(e) =>
                updateDraft(
                  draft.id,
                  'description',
                  e.target.value
                )
              }
            />

            <div className="flex gap-3">
              <input
                className="flex-1 border px-3 py-2 text-sm"
                value={draft.hub}
                onChange={(e) =>
                  updateDraft(draft.id, 'hub', e.target.value)
                }
              />

              <input
                className="flex-1 border px-3 py-2 text-sm"
                value={draft.category}
                onChange={(e) =>
                  updateDraft(
                    draft.id,
                    'category',
                    e.target.value
                  )
                }
              />
            </div>

            <button
              onClick={() => approveDraft(draft)}
              disabled={approvingId === draft.id}
              className="bg-black text-white px-4 py-1 text-sm"
            >
              {approvingId === draft.id
                ? 'Approving…'
                : 'Approve'}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
