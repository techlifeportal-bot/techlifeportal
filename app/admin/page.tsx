'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type DraftSpot = {
  id: string;
  name: string;
  description: string;
  ai_summary: string;
  hub: string;
  category: string;
};

const mockDrafts: DraftSpot[] = [
  {
    id: 'draft-1',
    name: 'Whitefield Tech Park Food Street',
    description:
      'Popular evening food street near tech parks in Whitefield.',
    ai_summary:
      'A lively food street near Whitefield IT hubs with diverse food options.',
    hub: 'Whitefield',
    category: 'Food / Hangout'
  }
];

export default function AdminPage() {
  const [drafts, setDrafts] = useState(mockDrafts);
  const [activeDraft, setActiveDraft] = useState<DraftSpot | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirmApprove() {
    if (!activeDraft) return;

    setLoading(true);

    const { error } = await supabase.from('approved_spots').insert({
      name: activeDraft.name,
      description: activeDraft.description,
      ai_summary: activeDraft.ai_summary,
      hub: activeDraft.hub,
      category: activeDraft.category,
      source: 'ai',
      status: 'approved'
    });

    setLoading(false);

    if (error) {
      alert('Insert failed. Check RLS / policy.');
      console.error(error);
      return;
    }

    // Remove from draft list
    setDrafts((prev) =>
      prev.filter((d) => d.id !== activeDraft.id)
    );

    setActiveDraft(null);
    setShowConfirm(false);

    alert('Approved and saved to approved_spots');
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        🤖 Admin — AI Draft Approval
      </h1>

      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="bg-white border rounded-lg p-4 mb-4"
        >
          <p className="font-semibold">{draft.name}</p>
          <p className="text-sm text-gray-600">
            📍 {draft.hub} · 🏷️ {draft.category}
          </p>

          <button
            onClick={() => setActiveDraft(draft)}
            className="mt-3 text-blue-600 text-sm"
          >
            ✏️ Edit & Approve
          </button>
        </div>
      ))}

      {/* Edit Modal */}
      {activeDraft && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Edit Draft</h2>

            {['name', 'hub', 'category'].map((field) => (
              <input
                key={field}
                className="w-full border rounded p-2 mb-3"
                value={(activeDraft as any)[field]}
                onChange={(e) =>
                  setActiveDraft({
                    ...activeDraft,
                    [field]: e.target.value
                  })
                }
              />
            ))}

            <textarea
              className="w-full border rounded p-2 mb-3"
              rows={3}
              value={activeDraft.description}
              onChange={(e) =>
                setActiveDraft({
                  ...activeDraft,
                  description: e.target.value
                })
              }
            />

            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              value={activeDraft.ai_summary}
              onChange={(e) =>
                setActiveDraft({
                  ...activeDraft,
                  ai_summary: e.target.value
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveDraft(null)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-3">
              Confirm Approval
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This will save the draft to <b>approved_spots</b>.
              It will NOT be public.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? 'Saving…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
