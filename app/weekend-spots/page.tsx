import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("id, name, description, location")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Weekend Spots for Bangalore IT Professionals
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Short getaways, hangout places, and calm escapes curated for people
          working in tech — easy to plan after a busy workweek.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {error && (
          <p className="text-red-500">
            Unable to load weekend spots right now.
          </p>
        )}

        {!spots || spots.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-slate-600">
            Weekend spots will appear here soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <div
                key={spot.id}
                className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-slate-800">
                  {spot.name}
                </h3>

                {spot.location && (
                  <p className="mt-1 text-sm text-slate-500">
                    {spot.location}
                  </p>
                )}

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {spot.description?.slice(0, 140)}…
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER NOTE */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500">
          Curated for Bangalore IT professionals • TechLifePortal
        </div>
      </footer>
    </main>
  );
}
