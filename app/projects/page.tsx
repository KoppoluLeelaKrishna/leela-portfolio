type Project = {
  title: string;
  timeframe: string;
  description: string;
  tech: string[];
  bullets: string[];
  links: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "Cloud ETL Pipeline (Batch) — AWS",
    timeframe: "2025",
    description:
      "Built an automated batch pipeline for curated analytics datasets with data quality checks and optimized SQL.",
    tech: ["S3", "Glue", "Spark", "Redshift", "Athena", "Python", "SQL"],
    bullets: [
      "Ingested raw data to S3, transformed using Glue/Spark, loaded curated tables for reporting.",
      "Added data validation rules and failure alerts for reliable daily runs.",
      "Optimized queries using partitioning and efficient joins to reduce runtime.",
    ],
    links: [
      { label: "GitHub (add)", href: "https://github.com/" },
      { label: "Dashboard (add)", href: "https://www.linkedin.com/" },
    ],
  },
  {
    title: "Analytics Dashboard — Power BI",
    timeframe: "2025",
    description:
      "Designed KPI dashboards for business stakeholders with clean, reusable data models.",
    tech: ["Power BI", "SQL", "Python", "Data Modeling"],
    bullets: [
      "Built star-schema style model for reporting and improved refresh reliability.",
      "Created actionable visuals: trend, variance, and segmentation views.",
      "Documented measures and definitions to reduce stakeholder confusion.",
    ],
    links: [{ label: "Screenshots (add)", href: "https://www.linkedin.com/" }],
  },
  {
    title: "Streaming Ingestion (Template) — Kafka/Spark",
    timeframe: "2024–2025",
    description:
      "Created a reusable template for near real-time ingestion and processing using streaming primitives.",
    tech: ["Kafka", "Spark Streaming", "Python", "Cloud Storage"],
    bullets: [
      "Implemented checkpointing and idempotent writes for reliable processing.",
      "Handled schema drift with defensive parsing and quarantine outputs.",
      "Prepared the pipeline for monitoring and SLA reporting.",
    ],
    links: [{ label: "GitHub (add)", href: "https://github.com/" }],
  },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card">
      <div className="itemTitle">
        <strong>{p.title}</strong>
        <span>{p.timeframe}</span>
      </div>
      <p className="itemMeta">{p.description}</p>

      <div className="badges">
        {p.tech.map((t) => (
          <span className="badge" key={t}>
            {t}
          </span>
        ))}
      </div>

      <ul className="ul">
        {p.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="ctaRow">
        {p.links.map((l) => (
          <a
            key={l.href + l.label}
            className="btn"
            href={l.href}
            target="_blank"
            rel="noreferrer"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="h1">Projects</h1>
      <p className="sub">
        A few projects highlighting my work across cloud pipelines, analytics,
        and automation. Replace the placeholder links with your GitHub, demos,
        and screenshots.
      </p>

      <h2 className="sectionTitle">Featured</h2>
      <div className="list">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </div>
  );
}
