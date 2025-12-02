export const metadata = {
  title: "TechLifePortal",
  description: "AI-powered lifestyle & jobs platform for IT employees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        <header style={{ background: "#111", color: "white", padding: "15px" }}>
          <h2>TechLifePortal</h2>
        </header>

        {children}

        <footer style={{ background: "#eee", padding: "20px", marginTop: "40px" }}>
          <p>© 2025 TechLifePortal</p>
        </footer>
      </body>
    </html>
  );
}
