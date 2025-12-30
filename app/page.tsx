export default function HomePage() {
  return (
    <main className="homepage">
      <section className="card-grid">

        {/* Weekend Spots */}
        <div className="card">
          <h3>🌴 Weekend Spots</h3>
          <p className="card-desc">
            Relaxed places IT professionals visit after work.
          </p>
          <a href="/weekend-spots" className="card-link">
            Explore weekend spots →
          </a>
        </div>

        {/* PGs & Rentals */}
        <div className="card">
          <h3>🏠 PGs & Rentals</h3>
          <p className="card-desc">
            PGs and rentals near Bangalore tech hubs.
          </p>
          <a href="/pgs" className="card-link">
            View PGs & rentals →
          </a>
        </div>

        {/* Cafes */}
        <div className="card">
          <h3>☕ Cafes</h3>
          <p className="card-desc">
            Cafes around IT hubs for work, meetings, and breaks.
          </p>
          <span className="status-pill">
            Unlocks gradually as community grows
          </span>
        </div>

        {/* Gyms */}
        <div className="card">
          <h3>🏋️ Gyms</h3>
          <p className="card-desc">
            Gyms and fitness centers near major tech corridors.
          </p>
          <span className="status-pill">
            Unlocks gradually as community grows
          </span>
        </div>

        {/* Companies */}
        <div className="card highlight">
          <h3>🏢 Companies</h3>
          <p className="card-desc">
            IT companies and startups operating in nearby tech hubs.
          </p>
          <span className="status-pill">
            Unlocks gradually as community grows
          </span>
        </div>

        {/* IT Jobs */}
        <div className="card">
          <h3>💼 IT Jobs</h3>
          <p className="card-desc">
            Job openings from companies located in IT hubs.
          </p>
          <span className="status-pill">
            Unlocks gradually as community grows
          </span>
        </div>

        {/* AI Resume Builder */}
        <div className="card">
          <h3>🤖 AI Resume Builder</h3>
          <p className="card-desc">
            Create ATS-friendly resumes tailored for IT jobs.
          </p>
          <span className="status-pill">
            Unlocks gradually as community grows
          </span>
        </div>

      </section>
    </main>
  );
}
