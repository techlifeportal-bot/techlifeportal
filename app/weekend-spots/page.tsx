import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("id, location, maps_url, priority, status")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (error) {
    console.error(error);
    return <p className="error-text">Failed to load weekend spots.</p>;
  }

  return (
    <main className="list-page">
      <h1 className="page-title">🌴 Weekend Spots</h1>
      <p className="page-subtitle">
        Handpicked weekend getaways and hangout places for Bangalore IT professionals.
      </p>

      <section className="card-grid">
        {spots && spots.length > 0 ? (
          spots.map((spot) => (
            <div key={spot.id} className="card">
              <h3>{spot.location}</h3>

              {spot.maps_url ? (
                <a
                  href={spot.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  📍 Open in Google Maps →
                </a>
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    spot.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  📍 Search on Google Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No weekend spots available yet.</p>
        )}
      </section>
    </main>
  );
}
