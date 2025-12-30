export const metadata = {
  title: "TechLifePortal – For Bangalore IT Professionals",
  description:
    "TechLifePortal helps Bangalore IT professionals discover weekend spots and PG stays near major tech hubs. Built for tech life.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          TechLifePortal
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          A lifestyle portal built <strong>for Bangalore IT professionals</strong>.
          Discover weekend spots and PGs near tech hubs — simple, focused and useful.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700">
          🚀 Soft Launch • Bangalore IT Community
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">
          What you can explore now
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Weekend Spots */}
          <div className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              🌴 Weekend Spots
            </h3>
            <p className="text-slate-600 mb-4">
              Curated hangout places, walks and short trips Bangalore IT employees
              usually visit after a busy work week.
            </p>
            <a
              href="/weekend-spots"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              Explore weekend spots →
            </a>
          </div>

          {/* PGs */}
          <div className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              🏠 PGs & Rentals
            </h3>
            <p className="text-slate-600 mb-4">
              PGs and rental stays near Bangalore tech hubs —
              helpful for freshers and working professionals.
            </p>
            <a
              href="/pgs"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              View PGs & rentals →
            </a>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">
          Coming soon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "📄 AI Resume Builder",
            "☕ Cafés near tech hubs",
            "🏋️ Gyms & fitness",
            "🏢 Nearby companies",
            "💼 IT Jobs",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-dashed border-slate-300 p-5 bg-slate-50 text-slate-500"
            >
              <p className="font-medium">{feature}</p>
              <p className="text-sm mt-1">
                Coming soon for the Bangalore IT community.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Built with ❤️ in Bangalore • TechLifePortal (Beta)
      </footer>
    </main>
  );
}
