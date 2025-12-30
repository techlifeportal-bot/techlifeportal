"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const IT_HUBS = [
  "Electronic City",
  "Whitefield",
  "Outer Ring Road",
  "Bellandur",
  "HSR Layout",
  "Manyata Tech Park",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HubPage() {
  const { hub } = useParams();
  const router = useRouter();

  const hubSlug = typeof hub === "string" ? hub : "";
  const hubName = hubSlug.replace(/-/g, " ");

  const [pgs, setPgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hubSlug) return;

    const fetchPGs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("*")
        .eq("hub", hubSlug);

      if (error) {
        setError("Failed to load PGs");
        setPgs([]);
      } else {
        setPgs(data || []);
        setError(null);
      }

      setLoading(false);
    };

    fetchPGs();
  }, [hubSlug]);

  return (
    <main className="hub-page">
      {/* HEADER */}
      <section className="hub-header">
        <h1>{hubName}</h1>
        <p>PGs & rentals available near this IT hub.</p>

        {/* HUB SWITCHER (OPTION A) */}
        <div className="hub-switcher">
          <select
            value={hubName}
            onChange={(e) => {
              const slug = e.target.value
                .toLowerCase()
                .replace(/\s+/g, "-");
              router.push(`/it-hubs/${slug}`);
            }}
          >
            {IT_HUBS.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* STATES */}
      {loading && <p>Loading PGs...</p>}
      {error && <p className="hub-error">{error}</p>}

      {!loading && !error && pgs.length === 0 && (
        <p className="hub-empty">
          No PGs listed yet for this IT hub.
        </p>
      )}

      {/* PG GRID */}
      <section className="hub-grid">
        {pgs.map((pg) => (
          <div key={pg.id} className="hub-card">
            <h3>{pg.name}</h3>

            {pg.address && (
              <p className="hub-address">{pg.address}</p>
            )}

            {pg.rent && (
              <p className="hub-rent">Rent: ₹{pg.rent}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
