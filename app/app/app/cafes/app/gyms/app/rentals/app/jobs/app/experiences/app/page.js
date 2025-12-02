export default function Home() {
  const linkStyle = {
    display: "block",
    padding: "12px 16px",
    margin: "8px 0",
    borderRadius: "8px",
    background: "#f2f2f2",
    textDecoration: "none",
    color: "#111",
  };

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>TechLifePortal – Bangalore</h1>
      <p>
        AI-powered lifestyle and job assistant for IT employees around Bangalore
        tech parks.
      </p>

      <h2>Explore</h2>
      <a href="/cafes" style={linkStyle}>Cafés near Tech Parks</a>
      <a href="/gyms" style={linkStyle}>Gyms & Fitness</a>
      <a href="/rentals" style={linkStyle}>PGs & Rentals</a>
      <a href="/jobs" style={linkStyle}>IT Job Vacancies</a>
      <a href="/experiences" style={linkStyle}>TechLife Experiences</a>
    </main>
  );
}
