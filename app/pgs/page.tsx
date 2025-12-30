import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PG = {
  id: number;
  name: string;
  area: string;
  type: string;
  price_range: string;
  description: string;
  maps_url: string;
};

export default async function PGsPage() {
  const { data: pgs, error } = await supabase
    .from("pgs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error loading PGs:", error.message);
  }

  return (
    <main className="list-page">
      {/* Page Header */}
      <header className="page-header">
        <h1>🏠 PGs & Rentals</h1>
        <p className="subtitle">
          Comfortable PGs and rental stays near Bangalore tech hubs —
          ideal for freshers and IT professionals.
        </p>
      </header>

      {/* Empty State */}
      {!pgs || pgs.length === 0 ? (
        <p className="empty-state">No PGs listed yet.</p>
      ) : (
        <section className="card-grid">
          {pgs.map((pg: PG) => (
            <article key={pg.id} className="card">
              <h3 className="card-title">{pg.name}</h3>

              <div className="meta">
                📍 {pg.area} • 🏠 {pg.type}
              </div>

              <p className="description">{pg.description}</p>

              <div className="card-footer">
                <span className="price">💰 {pg.price_range}</span>

                {pg.maps_url && (
                  <Link
                    href={pg.maps_url}
                    target="_blank"
                    className="maps-link"
                  >
                    📍 View on Maps
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
