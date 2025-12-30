import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  const { data: pgs, error } = await supabase
    .from("pgs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="container">
        <h1>PGs & Rentals</h1>
        <p>Failed to load PG listings.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Page header */}
      <header className="list-header">
        <h1>🏠 PGs & Rentals</h1>
        <p>
          PGs and rental stays near Bangalore tech hubs — useful for freshers
          and working professionals.
        </p>
      </header>

      {/* Cards */}
      <section className="card-grid">
        {pgs && pgs.length > 0 ? (
          pgs.map((pg) => (
            <div key={pg.id} className="card">
              <h3>{pg.name}</h3>

              <p className="meta">
                📍 {pg.area} · 💰 {pg.price_range}
              </p>

              <p>{pg.description}</p>

              {pg.maps_url && (
                <a
                  href={pg.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Open in Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No PGs added yet.</p>
        )}
      </section>
    </div>
  );
}
