import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          TechLifePortal
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Built for Bangalore IT professionals
        </p>

        <p className="mt-6 max-w-2xl text-slate-300 leading-relaxed">
          Discover weekend spots and PG stays near Bangalore’s major tech hubs.
          Curated for people working in tech — calm, useful, and focused.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/weekend-spots"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Explore Weekend Spots
          </Link>

          <Link
            href="/pgs"
            className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-900 transition"
          >
            Find PGs Near Office
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Beta launch • Focused on Bangalore IT lifestyle
        </p>
      </section>

      {/* PREVIEWS */}
      <section className="max-w-6xl mx-auto px-6 pb-24 space-y-20">
        {/* WEEKEND SPOTS */}
        <div>
          <h2 className="text-2xl font-semibold">
            Weekend Spots
          </h2>
          <p className="mt-2 text-slate-400">
            Short, stress-free getaways popular among IT professionals.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Nandi Hills Sunrise Ride",
                desc: "Early morning escape before the crowd hits."
              },
              {
                name: "JP Nagar Mini Forest",
                desc: "Quiet greenery for a slow weekend walk."
              },
              {
                name: "Ramanagara Hills",
                desc: "Short trek and sunset views near the city."
              }
            ].map((spot) => (
              <div
                key={spot.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition"
              >
                <h3 className="font-semibold text-slate-100">
                  {spot.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {spot.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/weekend-spots"
            className="inline-block mt-6 text-indigo-400 hover:underline"
          >
            View all weekend spots →
          </Link>
        </div>

        {/* PGs */}
        <div>
          <h2 className="text-2xl font-semibold">
            PGs & Rentals
          </h2>
          <p className="mt-2 text-slate-400">
            Stays near tech parks, preferred by working professionals.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Men’s PG – Electronic City",
                desc: "Walkable distance to tech offices."
              },
              {
                name: "Coliving – Bellandur",
                desc: "Furnished stay with flexible terms."
              },
              {
                name: "Budget PG – Whitefield",
                desc: "Popular with new IT joiners."
              }
            ].map((pg) => (
              <div
                key={pg.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition"
              >
                <h3 className="font-semibold text-slate-100">
                  {pg.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {pg.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/pgs"
            className="inline-block mt-6 text-indigo-400 hover:underline"
          >
            Explore PGs →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500">
          Built for Bangalore IT professionals • TechLifePortal (beta)
        </div>
      </footer>
    </main>
  );
}
