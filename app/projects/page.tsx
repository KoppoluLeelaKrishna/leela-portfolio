type Project = {
  title: string;
  context: string;
  challenge: string;
  delivery: string[];
  stack: string[];
};

const projects: Project[] = [
  {
    title: "AWS Pipeline Delivery for Analytics Reporting",
    context: "Enterprise data engineering",
    challenge:
      "Business reporting depends on reliable ingestion, transformation, and curated outputs that can handle recurring refresh cycles without manual intervention.",
    delivery: [
      "Built and supported ETL workflows for batch data movement and transformation.",
      "Used PySpark and SQL to shape source data into reporting-ready structures.",
      "Delivered curated datasets for analytics stakeholders and business decision support.",
    ],
    stack: ["AWS", "PySpark", "SQL", "Airflow", "Databricks", "Snowflake"],
  },
  {
    title: "Operational Monitoring and Data Quality Controls",
    context: "Reliability and governance",
    challenge:
      "Production pipelines lose trust quickly when validation, scheduling, and failure handling are weak or inconsistent.",
    delivery: [
      "Supported monitoring and scheduling patterns for recurring production jobs.",
      "Applied validation checks before data moved into curated reporting layers.",
      "Improved operational visibility around dependencies, failures, and recovery paths.",
    ],
    stack: ["Airflow", "SQL", "Python", "CloudWatch", "Data Validation"],
  },
  {
    title: "Reporting-Friendly Data Modeling",
    context: "Analytics enablement",
    challenge:
      "Analytics teams need datasets that are stable, understandable, and structured for reporting rather than raw engineering outputs.",
    delivery: [
      "Prepared transformation logic and modeled datasets for downstream reporting use.",
      "Supported clean schemas and reusable data structures for dashboarding workflows.",
      "Aligned data preparation work with business reporting and KPI consumption needs.",
    ],
    stack: ["SQL", "Power BI", "Data Modeling", "Python"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="caseStudy">
      <div className="caseHeader">
        <div>
          <p className="caseKicker">{project.context}</p>
          <h2>{project.title}</h2>
        </div>
      </div>

      <p className="caseChallenge">{project.challenge}</p>

      <ul className="detailList">
        {project.delivery.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="badgeCloud">
        {project.stack.map((item) => (
          <span className="badge" key={item}>
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Projects</p>
        <h1 className="pageTitle">Representative work presented as concise case studies for hiring managers and recruiters.</h1>
        <p className="sectionBody narrow">
          These examples show how I approach enterprise data engineering work through business context, engineering
          challenge, delivery approach, and supporting technology.
        </p>
      </section>

      <section className="caseStudyList">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </div>
  );
}
