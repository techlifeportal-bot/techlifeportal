import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section>
        <h1>TechLifePortal</h1>
        <p>
          A lifestyle platform built for <strong>IT professionals</strong>.
          Discover weekend spots, PGs, and work-life essentials around Bangalore.
        </p>
      </section>

      {/* FEATURE CARDS */}
      <section className="feature-grid">
        {/* Weekend Spots */}
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Short trips, food streets, walks, and hangout places IT professionals
            usually visit after a busy work week.
          </p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        {/* PGs */}
        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        {/* Cafes */}
        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>Work-friendly cafes near IT parks and tech hubs.</p>
          <span className="badge">Coming soon</span>
        </div>

        {/* Gyms */}
        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>Fitness centers preferred by IT professionals.</p>
          <span className="badge">Coming soon</span>
        </div>

        {/* Companies */}
        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>Nearby tech companies and office locations.</p>
          <span className="badge">Coming soon</span>
        </div>

        {/* Jobs */}
        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>Curated IT job openings around Bangalore.</p>
          <span className="badge">Coming soon</span>
        </div>

        {/* AI Resume */}
        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>Create resumes tailored for IT roles and companies.</p>
          <span className="badge">Coming soon</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
