import Link from "next/link";

const skills = [
  "AWS (S3, Glue, Redshift, Athena, Lambda)",
  "Azure (ADLS, Databricks, Synapse)",
  "Spark / PySpark • Kafka • Airflow",
  "SQL • Python (Pandas, NumPy)",
  "ETL/ELT • Data Modeling • Warehousing",
  "Power BI • Dashboards • Automation",
];

export default function HomePage() {
  return (
    <div className="hero">
      <div className="kicker">
        <span>Open to:</span>
        <strong style={{ color: "var(--text)" }}>
          Data Engineer • Data Analyst
        </strong>
      </div>

      <h1 className="h1">Building reliable data pipelines + clear insights.</h1>
      <p className="sub">
        I'm <strong>Leela Krishna Koppolu</strong> — a Cloud Data Engineer / Data
        Analyst focused on scalable ETL, data quality, analytics dashboards, and
        performance optimization across AWS and Azure.
      </p>

      <div className="ctaRow">
        <Link className="btn btnPrimary" href="/projects">
          View Projects →
        </Link>
        <Link className="btn" href="/resume">
          Download Resume
        </Link>
        <Link className="btn" href="/contact">
          Contact
        </Link>
      </div>

      <div className="grid">
        <section className="card col8">
          <h2>What I do</h2>
          <p>
            I design and build data pipelines (batch + streaming), enforce data
            quality, model data for analytics, and deliver BI dashboards for
            business teams.
          </p>
          <div className="badges">
            <span className="badge">ETL/ELT</span>
            <span className="badge">Data Quality</span>
            <span className="badge">Spark</span>
            <span className="badge">Airflow</span>
            <span className="badge">SQL</span>
            <span className="badge">Power BI</span>
          </div>
        </section>

        <section className="card col4">
          <h2>Quick links</h2>
          <div className="split">
            <a className="btn" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              LinkedIn (add your URL)
            </a>
            <a className="btn" href="https://github.com/" target="_blank" rel="noopener noreferrer">
              GitHub (add your URL)
            </a>
            <a className="btn" href="mailto:yourname@email.com">
              Email (update)
            </a>
          </div>
          <p className="itemMeta" style={{ marginTop: 10 }}>
            Tip: Replace these links with your actual profile URLs.
          </p>
        </section>

        <section className="card col12">
          <h2>Core skills</h2>
          <div className="badges">
            {skills.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

      <h2 className="sectionTitle">Next steps</h2>
      <div className="grid">
        <div className="card col4">
          <h2>1 Add your projects</h2>
          <p>Show 3–6 projects with impact, tools, and links.</p>
        </div>
        <div className="card col4">
          <h2>2 Upload resume PDF</h2>
          <p>Put it in /public and link it on the Resume page.</p>
        </div>
        <div className="card col4">
          <h2>3 Deploy on Vercel</h2>
          <p>Connect GitHub → Vercel → Deploy in 2 minutes.</p>
        </div>
      </div>
    </div>
  );
}
