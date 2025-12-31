"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  return (
    <main className={inter.className}>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>TechLifePortal</h1>

        {/* TAGLINE */}
        <p className="tagline">
          Built for Bangalore IT Professionals
        </p>

        <p className="hero-description">
          A lifestyle platform designed for IT professionals.
          Discover PGs, rentals, and weekend spots around Bangalore —
          all in one place.
        </p>
      </section>

      {/* FEATURES */}
      <section className="feature-grid">
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>Relaxed places IT professionals visit to unwind.</p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>PGs and rentals near Bangalore IT hubs.</p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        TechLifePortal · Built for Bangalore IT Professionals
      </footer>
    </main>
  );
}
