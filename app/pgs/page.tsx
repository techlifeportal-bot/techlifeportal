import { createClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  const supabase = createClient();

  const { data: pgs, error } = await supabase
    .from("pgs_rentals")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <section className="list-page">
        <h1 className="page-title">PGs & Rentals</h1>
        <p className="error-text">Failed to load PGs. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="list-page">
      <header className="page-header">
        <h1 className="page-title">🏠 PGs & Rentals</h1>
        <p className="page-subtitle">
          Affordable PGs and rental stays near Bangalore tech hubs — useful for
          freshers and working professionals.
        </p>
      </header>

      <div className="card-grid">
        {pgs && pgs.length > 0 ? (
          pgs.map((pg) => (
            <div key={pg.id} className="card">
              <h2 className="card-title">{pg.name}</h2>

              <p className="card-description">
                {pg.description || "Comfortable PG stay near tech hubs."}
              </p>

              <div className="card-meta">
                {pg.location && <span>📍 {pg.location}</span>}
                {pg.type && <span>🏷 {pg.type}</span>}
              </div>

              {pg.maps_url && (
                <a
                  href={pg.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  📍 View on Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="empty-text">
            No PGs added yet. New listings coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
