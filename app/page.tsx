import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (safe for App Router pages)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  // Fetch approved weekend spots (homepage preview)
  const { data: weekendSpots } = await supabase
    .from("weekend_spots")
    .select("id, name, description")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  // Fetch approved PGs (B1 logic: show if exists, else coming soon)
  const { data: pgs } = await supabase
    .from("pg_rentals")
    .select("id, name, location, rent")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">

      {/* ================= HERO ================= */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          TechLifePortal
        </h1>

        <p className="text-sm uppercase tracking-wide text-gray-500">
          Built for IT professionals
        </p>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover stress-free weekend getaways and quality PGs around
          Bangalore — curated with AI, reviewed by humans.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/weekend-spots"
            className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90"
          >
            Explore Weekend Spots
          </Link>
          <Link
            href="/pgs"
            className="px-6 py-3 border border-black rounded-lg hover:bg-gray-50"
          >
            Find PGs
          </Link>
        </div>
      </section>

      {/* ============ WEEKEND SPOTS ============ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Weekend Spots</h2>
          <Link href="/weekend-spots" className="text-sm underline">
            View all →
          </Link>
        </div>

        {weekendSpots && weekendSpots.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {weekendSpots.map((spot) => (
              <div
                key={spot.id}
                className="border rounded-lg p-4 space-y-2 hover:shadow-sm transition"
              >
                <h3 className="font-semibold text-lg">
                  {spot.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {spot.description?.slice(0, 120)}…
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Weekend spots will start appearing here soon.
          </p>
        )}
      </section>

      {/* ================= PGs (B1) ================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            PGs for IT Professionals
          </h2>
          <Link href="/pgs" className="text-sm underline">
            View all →
          </Link>
        </div>

        {pgs && pgs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {pgs.map((pg) => (
              <div
                key={pg.id}
                className="border rounded-lg p-4 space-y-1 hover:shadow-sm transition"
              >
                <h3 className="font-semibold">
                  {pg.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {pg.location} • ₹{pg.rent}/month
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 text-gray-500">
            PG listings are coming soon. We’re curating quality stays
            near major IT hubs.
          </div>
        )}
      </section>

      {/* ============== TRUST / INTENT ============== */}
      <section className="text-center space-y-3">
        <p className="font-medium">
          Curated with AI. Reviewed by humans.
        </p>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          TechLifePortal is designed to save time for IT professionals —
          no spam, no clutter, only useful places and stays.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TechLifePortal · About · Contact
      </footer>

    </main>
  );
}
