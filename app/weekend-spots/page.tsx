import { createClient } from "@supabase/supabase-js";

/**
 * IMPORTANT:
 * This uses PUBLIC keys only.
 * This page runs on the server (App Router).
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function WeekendSpotsPage() {
  // Safety check: env vars
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Weekend Spots</h1>
        <p style={{ color: "red" }}>
          Supabase environment variables are missing.
        </p>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("weekend_spots")
    .select("*")
    .order("created_at", { ascending: false });

  // Error state
  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Weekend Spots</h1>
        <p style={{ color: "red" }}>
          Supabase error: {error.message}
        </p>
      </main>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Weekend Spots</h1>
        <p>No weekend spots found in database.</p>
        <p style={{ color: "#666", fontSize: 14 }}>
          (This means the query worked, but returned 0 rows.)
        </p>
      </main>
    );
  }

  // Success state
  return (
    <main style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>
        Weekend Spots
      </h1>

      <p style={{ color: "#666", marginBottom: 24 }}>
        Curated weekend places popular among Bangalore IT professionals.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {data.map((spot: any) => (
          <div
            key={spot.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>
              {spot.name || "Unnamed place"}
            </h2>

            <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
              {spot.description || "No description provided."}
            </p>

            {spot.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  spot.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2563eb", fontSize: 14 }}
              >
                Open in Google Maps →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
