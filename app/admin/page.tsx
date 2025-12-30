"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Draft = {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
};

export default function AdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    const { data, error } = await supabase
      .from("ai_suggested_spots")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load drafts", error);
    } else {
      setDrafts(data || []);
    }

    setLoading(false);
  };

  const approveDraft = async (draft: Draft) => {
    // 1. Insert into approved spots
    const { error: insertError } = await supabase
      .from("approved_spots")
      .insert({
        name: draft.name,
        description: draft.description,
        location: draft.location,
        category: draft.category,
      });

    if (insertError) {
      alert("Failed to approve draft");
      return;
    }

    // 2. Remove from AI suggestions
    await supabase
      .from("ai_suggested_spots")
      .delete()
      .eq("id", draft.id);

    // 3. Refresh list
    fetchDrafts();
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Admin — AI Draft Review</h1>
        <p>
          Automation status: <strong>MANUAL ONLY</strong> (admin-triggered)
        </p>
      </header>

      {loading && <p>Loading AI drafts...</p>}

      {!loading && drafts.length === 0 && (
        <p>No AI drafts pending review.</p>
      )}

      <section className="admin-grid">
        {drafts.map((draft) => (
          <div key={draft.id} className="admin-card">
            <div className="admin-card-header">
              <h3>AI Suggested Spot</h3>
              <span className="admin-status">Pending</span>
            </div>

            <label>Name</label>
            <input value={draft.name} readOnly />

            <label>Description</label>
            <textarea value={draft.description} rows={4} readOnly />

            <div className="admin-row">
              <div>
                <label>Location</label>
                <input value={draft.location} readOnly />
              </div>

              <div>
                <label>Category</label>
                <input value={draft.category} readOnly />
              </div>
            </div>

            <button
              className="approve-btn"
              onClick={() => approveDraft(draft)}
            >
              Approve
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
