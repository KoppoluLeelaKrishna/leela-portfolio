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
      "Business reporting depends on reliable ingestion, transformation, and curated outputs that can process structured and semi-structured data on recurring enterprise refresh cycles.",
    delivery: [
      "Designed and maintained AWS-based pipelines supporting ingestion, transformation, and reporting workflows for large-scale enterprise datasets.",
      "Built ETL logic with PySpark and SQL to prepare analytics-ready data structures for downstream consumption.",
      "Partnered with analysts, engineers, and business stakeholders to deliver data solutions aligned with operational reporting needs.",
    ],
    stack: ["AWS", "PySpark", "SQL", "Airflow", "Databricks", "Snowflake"],
  },
  {
    title: "Operational Monitoring and Data Quality Controls",
    context: "Reliability and governance",
    challenge:
      "Production pipelines lose trust quickly when scheduling, dependency handling, validation, and issue resolution are inconsistent across recurring jobs.",
    delivery: [
      "Supported pipeline management activities including job scheduling, monitoring, dependency handling, and recurring job automation.",
      "Validated transformed datasets with SQL-based checks to improve reporting accuracy before data moved into curated layers.",
      "Contributed to workflow optimization and documentation so pipelines were easier to support, troubleshoot, and maintain.",
    ],
    stack: ["Airflow", "SQL", "Python", "CloudWatch", "Data Validation"],
  },
  {
    title: "Reporting-Friendly Data Modeling",
    context: "Analytics enablement",
    challenge:
      "Analytics teams need datasets that are stable, accessible, and modeled for reporting use instead of remaining as raw engineering outputs.",
    delivery: [
      "Supported data modeling and integration work that improved accessibility of business-critical data for downstream teams.",
      "Developed reusable transformation components for cleansing, loading, and shaping data into reporting-friendly structures.",
      "Delivered reliable datasets for analytics and operational reporting across banking, retail, and enterprise environments.",
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
          These case studies are aligned to my resume and show how I approach enterprise data engineering through
          production pipeline delivery, workflow reliability, and reporting-ready data preparation.
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
