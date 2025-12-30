import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  return (
    <main
      className={inter.className}
      style={{
        background:
          "radial-gradient(1200px 600px at top, rgba(59,130,246,0.12), transparent 60%)",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "3.5rem",
          paddingBottom: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "0.8rem" }}>TechLifePortal</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
          A lifestyle platform built for <strong>IT professionals</strong>.
          Helping you navigate work-life essentials around Bangalore — calmly,
          practically, and with trust.
        </p>
      </section>

      {/* FEATURES */}
      <section className="feature-grid">
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Short trips, food streets, walks, and hangout places IT professionals
            usually visit after a busy work week.
          </p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>Work-friendly cafes near IT parks and tech hubs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>Fitness centers preferred by IT professionals.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>Nearby tech companies and office locations.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>Curated IT job openings around Bangalore.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>Create resumes tailored for IT roles and companies.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>
      </section>

      {/* ABOUT */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "3rem",
        }}
      >
        <h2>About TechLifePortal</h2>
        <p>
          TechLifePortal is built with a simple belief:{" "}
          <strong>
            IT professionals need practical, trustworthy information — not
            noise.
          </strong>
        </p>
        <p>
          We start with real needs like weekend spots and PGs. As the community
          grows, we gradually unlock more features — always keeping quality and
          trust first.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: "4rem" }}>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
