import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="list-page">
        <h1>Weekend Spots</h1>
        <p>Failed to load weekend spots.</p>
      </main>
    );
  }

  return (
    <main className="list-page">
      <header className="list-header">
        <h1>🌴 Weekend Spots</h1>
        <p>
          Short trips, walks, food streets and hangout places IT employees
          usually visit after a busy work week.
        </p>
      </header>

      <section className="card-grid">
        {spots && spots.length > 0 ? (
          spots.map((spot) => (
            <div key={spot.id} className="card">
              <h3>{spot.name}</h3>

              <p className="card-desc">{spot.description}</p>

              <div className="card-meta">
                <span>📍 {spot.location}</span>
                <span>🏷️ {spot.category}</span>
              </div>

              {spot.map_url && (
                <a
                  href={spot.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  Open in Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No weekend spots added yet.</p>
        )}
      </section>
    </main>
  );
}
