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
    title: "Enterprise ETL Platform - AWS Data Pipelines",
    timeframe: "Walmart / Truist Experience",
    description:
      "Built and supported cloud ETL workflows that delivered analytics-ready datasets for enterprise reporting.",
    tech: ["S3", "Glue", "Spark", "Redshift", "Athena", "Python", "SQL"],
    bullets: [
      "Designed ingestion and transformation workflows for scalable batch data processing.",
      "Improved pipeline reliability with monitoring, validation checks, and dependency-aware scheduling.",
      "Delivered curated datasets that supported downstream reporting, analytics, and business decision-making.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/KoppoluLeelaKrishna" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/leela-krishna-klk/" },
    ],
  },
  {
    title: "Data Quality and Workflow Monitoring",
    timeframe: "ETL Operations",
    description:
      "Implemented validation and monitoring patterns to keep production data pipelines stable and trustworthy.",
    tech: ["Python", "SQL", "Airflow", "CloudWatch", "Data Validation"],
    bullets: [
      "Supported pipeline scheduling, monitoring, and failure handling for recurring enterprise jobs.",
      "Applied data validation and quality checks before publishing curated outputs.",
      "Reduced reporting disruption by strengthening dependency handling and operational visibility.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KoppoluLeelaKrishna" }],
  },
  {
    title: "Analytics Reporting and Business Data Modeling",
    timeframe: "Reporting Support",
    description:
      "Prepared transformed data models and reporting-friendly tables for stakeholder analytics and dashboards.",
    tech: ["Power BI", "SQL", "Data Modeling", "Python"],
    bullets: [
      "Built reporting-ready datasets with consistent transformations and business logic.",
      "Supported analytics consumers with stable schemas and refresh-friendly data structures.",
      "Connected engineering work to measurable business reporting needs across teams.",
    ],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/leela-krishna-klk/" }],
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
            {l.label}
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
        A few representative project areas based on my resume, covering cloud
        pipelines, data quality, and analytics delivery.
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
