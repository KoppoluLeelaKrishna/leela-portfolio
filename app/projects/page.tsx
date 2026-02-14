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
    title: "Enterprise ETL Platform — AWS (S3 • Glue • Spark • Redshift)",
    timeframe: "Data Engineering",
    description:
      "Built automated batch pipelines for analytics-ready datasets with strong data quality + performance tuning.",
    tech: ["S3", "Glue", "Spark", "Redshift", "Athena", "Python", "SQL"],
    bullets: [
      "Automated ingestion + transformation workflows; reduced manual effort by ~60% through scheduling + reusable jobs.",
      "Improved pipeline reliability using validation checks + retry patterns; minimized broken dashboard incidents.",
      "Optimized ETL runtime using partitioning + join tuning; improved daily refresh performance significantly.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/KoppoluLeelaKrishna" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },
  {
    title: "Data Quality Framework — Rules + Alerts",
    timeframe: "Quality + Monitoring",
    description:
      "Created a reusable data quality layer for pipelines to catch schema drift, null spikes, and duplicate records.",
    tech: ["Python", "SQL", "Great Expectations (optional)", "CloudWatch", "Airflow"],
    bullets: [
      "Implemented validation rules (null %, duplicates, schema checks) before loading curated tables.",
      "Added alerting for failures to reduce debugging time and speed up recovery during data issues.",
      "Standardized error outputs (quarantine tables/logs) to make root-cause analysis faster.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KoppoluLeelaKrishna" }],
  },
  {
    title: "KPI Dashboards — Power BI + Star Schema",
    timeframe: "Analytics",
    description:
      "Designed stakeholder dashboards with consistent KPI definitions and refresh-friendly modeling.",
    tech: ["Power BI", "SQL", "Data Modeling", "Python"],
    bullets: [
      "Built star-schema reporting model; improved refresh stability and simplified KPI calculations.",
      "Created executive-level KPI views with trend + variance insights to support decision making.",
      "Documented metric definitions so business teams trust the numbers and reduce back-and-forth.",
    ],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/" }],
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
            rel="noopener noreferrer"
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
