import Image from "next/image";

type Project = {
  title: string;
  context: string;
  challenge: string;
  delivery: string[];
  stack: string[];
  isAI?: boolean;
};

const projects: Project[] = [
  {
    title: "AI-Powered Data Intelligence Pipeline (RAG + Vector Store)",
    context: "AI/ML data engineering",
    isAI: true,
    challenge:
      "Enterprise analytics teams need intelligent pipelines that can process unstructured documents alongside structured data, supporting semantic search and LLM-powered querying without replacing existing data infrastructure.",
    delivery: [
      "Built an end-to-end RAG (Retrieval-Augmented Generation) pipeline that ingests enterprise documents and structured datasets, generates embeddings via OpenAI API, and indexes them in a Pinecone vector store for semantic search.",
      "Orchestrated ingestion, chunking, embedding, and refresh cycles with Airflow, ensuring the vector store stays in sync with upstream source updates on scheduled intervals.",
      "Designed a LangChain-powered query layer that routes user questions to the vector store and synthesizes grounded, context-aware answers — reducing ad-hoc analyst request volume by enabling self-serve document Q&A.",
      "Integrated the pipeline with existing AWS S3 and Snowflake infrastructure so AI-ready outputs remained accessible alongside traditional reporting datasets.",
    ],
    stack: ["Python", "LangChain", "OpenAI API", "Pinecone", "Airflow", "AWS S3", "Snowflake", "PostgreSQL"],
  },
  {
    title: "Real-Time ML Feature Engineering Platform",
    context: "AI/ML infrastructure — data engineering",
    isAI: true,
    challenge:
      "Machine learning models in production require fresh, low-latency features derived from live event streams, but most enterprise data platforms only support batch-oriented pipelines that introduce hours of feature staleness.",
    delivery: [
      "Designed a real-time feature engineering platform using Kafka and PySpark Structured Streaming to compute aggregation and window-based ML features with sub-second latency from production event streams.",
      "Built a feature store layer backed by Redis for low-latency online serving and Snowflake for offline training data, with MLflow tracking feature versions and lineage for model reproducibility.",
      "Delivered computed features consumed by fraud detection and personalization models, reducing feature serving latency from 4-hour batch cycles to under 2 seconds for real-time inference.",
      "Implemented schema registry validation and data quality checks at ingestion so features reaching ML models met type and range constraints before entering the serving layer.",
    ],
    stack: ["Kafka", "PySpark Streaming", "MLflow", "Redis", "Python", "AWS Kinesis", "Snowflake", "Feature Store"],
  },
  {
    title: "LLM-Powered Data Quality and Anomaly Detection Engine",
    context: "AI-enhanced data governance — software engineering",
    isAI: true,
    challenge:
      "Traditional rule-based data quality checks miss contextual anomalies, require constant manual maintenance, and produce opaque failure messages that delay root-cause analysis across complex enterprise pipelines.",
    delivery: [
      "Integrated Claude API with existing data validation workflows to profile new datasets, detect statistical and semantic anomalies, and generate natural-language quality reports engineers and analysts can act on immediately.",
      "Built a FastAPI service that exposes a quality check endpoint — pipelines submit a dataset sample and receive structured anomaly flags, plain-English explanations, and suggested remediation steps.",
      "Implemented automated rule suggestion where the LLM inspects column distributions and data contracts to propose dbt tests and Great Expectations rules, reducing manual rule authoring time significantly.",
      "Deployed the service on AWS Lambda with Airflow triggering post-transform quality scans, making AI-driven validation a standard checkpoint in production ETL workflows.",
    ],
    stack: ["Python", "Claude API", "FastAPI", "Airflow", "Great Expectations", "dbt", "Snowflake", "AWS Lambda"],
  },
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`caseStudy${project.isAI ? " caseStudyAI" : ""}`}
      data-reveal=""
      data-reveal-delay={String(index * 80)}
    >
      <div className="caseHeader">
        <div>
          <p className="caseKicker">{project.context}</p>
          <h2>{project.title}</h2>
        </div>
        {project.isAI && <span className="aiTag">AI Project</span>}
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
        <div className="pageHeroLayout">
          <div>
            <p className="eyebrow">Projects</p>
            <h1 className="pageTitle">AI and data engineering projects presented as concise case studies.</h1>
            <p className="sectionBody narrow">
              These case studies span AI/ML pipeline development, real-time feature engineering, LLM-powered data systems,
              and traditional enterprise ETL — aligned to AI/ML Engineer, Data Engineer, and Software Engineer roles.
            </p>
          </div>
          <div className="pageHeroPortrait">
            <Image
              src="/profile.jpg"
              alt="Leela Krishna Koppolu"
              width={230}
              height={280}
              className="pageHeroPortraitImg"
              priority
            />
          </div>
        </div>
      </section>

      <section className="caseStudyList">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </section>
    </div>
  );
}
