export default function PGsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        🏠 PGs & Rentals for IT Professionals
      </h1>

      <p className="text-gray-600 mb-10">
        Curated PGs and rental stays near Bangalore tech hubs — designed for
        freshers and working IT employees.
      </p>

      {/* Soft-launch notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 mb-10">
        <p className="font-medium text-blue-900 mb-1">
          🚀 Soft launch in progress
        </p>
        <p className="text-blue-800 text-sm">
          We’re currently curating PGs near major tech hubs like Electronic City,
          Bellandur, Whitefield and Manyata.  
          This section will unlock as the community grows.
        </p>
      </div>

      {/* Preview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-5">
          <h3 className="font-semibold text-gray-900">
            Sample PG near Electronic City
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Affordable stay for IT employees, walkable distance from tech parks.
          </p>
          <span className="inline-block mt-3 text-xs text-gray-500">
            Electronic City • Preview
          </span>
        </div>

        <div className="rounded-lg border p-5">
          <h3 className="font-semibold text-gray-900">
            Sample PG near Bellandur
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Ideal for working professionals around ORR & startup offices.
          </p>
          <span className="inline-block mt-3 text-xs text-gray-500">
            Bellandur • Preview
          </span>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-12">
        Data will be community-verified. Always visit and confirm before finalising.
      </p>
    </main>
  );
}
