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

const AI_TYPES = [
  { label: "Weekend Spots", value: "weekend_spots" },
  { label: "Cafes", value: "cafes" },
  { label: "Gyms", value: "gyms" },
  { label: "Companies", value: "companies" },
  { label: "Jobs", value: "jobs" },
];

export default function AdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    const { data } = await supabase
      .from("ai_suggested_spots")
      .select("*")
      .order("created_at", { ascending: false });

    setDrafts(data || []);
    setLoading(false);
  };

  const generateAISuggestions = async () => {
    if (!selectedType) {
      alert("Select suggestion type first");
      return;
    }

    setGenerating(true);

    try {
      const res = await fetch("/api/ai/generate-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType }),
      });

      if (!res.ok) throw new Error();

      await fetchDrafts();
    } catch {
      alert("Failed to generate AI suggestions");
    }

    setGenerating(false);
  };

  const approveDraft = async (draft: Draft) => {
    // Insert into correct table based on category
    await supabase.from(draft.category).insert({
      name: draft.name,
      description: draft.description,
      location: draft.location,
    });

    await supabase
      .from("ai_suggested_spots")
      .delete()
      .eq("id", draft.id);

    fetchDrafts();
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Admin — AI Draft Review</h1>
        <p>
          Automation status: <strong>MANUAL ONLY</strong>
        </p>

        {/* AI CONTROL */}
        <div className="admin-ai-control">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select AI suggestion type</option>
            {AI_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <button
            onClick={generateAISuggestions}
            disabled={generating}
          >
            {generating ? "Generating…" : "Generate AI Suggestions"}
          </button>
        </div>
      </header>

      {loading && <p>Loading drafts...</p>}

      <section className="admin-grid">
        {drafts.map((draft) => (
          <div key={draft.id} className="admin-card">
            <h3>{draft.name}</h3>
            <p>{draft.description}</p>
            <p>
              <strong>Location:</strong> {draft.location}
            </p>
            <p>
              <strong>Category:</strong> {draft.category}
            </p>

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
