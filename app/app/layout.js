import "./globals.css";

export const metadata = {
  title: "TechLifePortal – AI Lifestyle & Jobs for Bangalore IT Employees",
  description: "TechLifePortal helps IT employees discover cafés, gyms, PGs, rentals, companies, and job opportunities around Bangalore tech parks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="4X5Mn7zU_yq2dFr8IggXVUM4eiBqNl2AN8-TPOLf6gg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
