import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  const { data: pgs, error } = await supabase
    .from("pgs_rentals")
    .select("id, location, maps_url, priority, status")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (error) {
    return <p>Failed to load PG listings.</p>;
  }

  return (
    <main className="list-page">
      <h1>🏠 PGs & Rentals</h1>
      <p>
        PGs and rental stays near Bangalore tech hubs — useful for freshers and
        working professionals.
      </p>

      {/* Same refined premium hover as Weekend Spots */}
      <style>{`
        .premium-card {
          background: rgba(255, 255, 255, 0.035);
          border-radius: 16px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .premium-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
          border-color: rgba(59, 130, 246, 0.45);
        }

        .premium-card h3 {
          margin-bottom: 8px;
        }

        .premium-card a {
          display: inline-block;
          margin-top: 10px;
          font-weight: 500;
        }
      `}</style>

      <section className="card-grid">
        {pgs && pgs.length > 0 ? (
          pgs.map((pg) => (
            <div key={pg.id} className="premium-card">
              <h3>{pg.location}</h3>

              {pg.maps_url && (
                <a
                  href={pg.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Open in Google Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No PG listings available yet.</p>
        )}
      </section>
    </main>
  );
}
