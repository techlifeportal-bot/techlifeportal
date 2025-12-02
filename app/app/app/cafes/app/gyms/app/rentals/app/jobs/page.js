const dummyJobs = [
  {
    title: "React Developer",
    company: "Bangalore Startup",
    exp: "1–3 years",
    location: "Outer Ring Road",
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "Product Company",
    exp: "2–4 years",
    location: "Whitefield",
  },
  {
    title: "QA Engineer",
    company: "MNC",
    exp: "0–2 years",
    location: "Manyata Tech Park",
  },
];

export default function Jobs() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Latest IT Job Vacancies</h1>
      <p>These are sample jobs. Later we’ll connect real job feeds automatically.</p>
      <ul>
        {dummyJobs.map((job, i) => (
          <li key={i} style={{ margin: "15px 0" }}>
            <b>{job.title}</b> – {job.company} ({job.exp})<br />
            <small>{job.location}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
