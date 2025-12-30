import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("id, location, maps_url, priority, status")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (error) {
    return <p>Failed to load weekend spots.</p>;
  }

  return (
    <main className="list-page">
      <h1>🌴 Weekend Spots</h1>
      <p>
        Handpicked weekend getaways and hangout places for Bangalore IT
        professionals.
      </p>

      {/* Refined premium hover – subtle & calm */}
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
        {spots && spots.length > 0 ? (
          spots.map((spot) => (
            <div key={spot.id} className="premium-card">
              <h3>{spot.location}</h3>

              {spot.maps_url && (
                <a
                  href={spot.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Open in Google Maps →
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
