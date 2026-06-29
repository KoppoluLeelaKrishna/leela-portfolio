import Image from "next/image";

const skillCategories = [
  {
    label: "AI & ML Engineering",
    skills: [
      "LLMs",
      "RAG Pipelines",
      "Prompt Engineering",
      "Embeddings",
      "Semantic / Vector Search",
      "LangChain",
      "Hugging Face Transformers",
      "PyTorch",
      "scikit-learn",
      "MLflow",
      "Feature Store",
      "Model Serving & Inference",
      "Vector Databases (Pinecone, FAISS)",
    ],
  },
  {
    label: "Cloud & ML Platforms",
    skills: [
      "AWS SageMaker",
      "Amazon Bedrock",
      "S3",
      "Lambda",
      "Glue",
      "EMR",
      "Redshift",
      "Kinesis",
      "Step Functions",
      "EKS",
      "CloudWatch",
      "Azure Databricks",
      "Data Factory",
      "Synapse",
      "Snowflake",
      "Delta Lake",
      "Unity Catalog",
    ],
  },
  {
    label: "Data Engineering",
    skills: [
      "Apache Spark",
      "PySpark",
      "Spark SQL",
      "Apache Airflow",
      "Apache Kafka",
      "dbt",
      "AWS Glue",
      "Azure Data Factory",
      "Debezium CDC",
      "AWS DMS",
      "Great Expectations",
    ],
  },
  {
    label: "Languages & Frameworks",
    skills: ["Python", "SQL", "TypeScript", "FastAPI", "Pandas", "Pydantic"],
  },
  {
    label: "Warehousing & Modeling",
    skills: [
      "Snowflake",
      "Redshift",
      "Star / Snowflake Schemas",
      "SCD Type 1 & 2",
      "Conformed Dimensions",
      "Fact-Grain Design",
      "Materialized Views",
    ],
  },
  {
    label: "MLOps, DevOps & BI",
    skills: [
      "Docker",
      "Kubernetes (EKS)",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "Azure DevOps",
      "Prometheus",
      "Grafana",
      "OpenLineage",
      "PagerDuty",
      "Power BI (DAX, RLS)",
      "Tableau",
      "PostgreSQL",
      "Oracle",
      "SQL Server",
      "MySQL",
    ],
  },
];

const certifications = [
  "AWS Certified Data Engineer – Associate",
  "Databricks Certified Data Engineer Associate",
  "SnowPro Core",
  "dbt Fundamentals",
];

const aiSkillGroups = [
  {
    role: "AI/ML Engineer",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG Architecture",
      "Vector Databases (Pinecone, FAISS, ChromaDB)",
      "Embedding Pipelines",
      "Amazon Bedrock",
      "Hugging Face Transformers",
      "PyTorch",
      "OpenAI API",
      "Anthropic Claude API",
      "AWS SageMaker",
      "MLflow",
      "Feature Engineering",
      "Kafka Streaming + ML",
      "Spark Structured Streaming",
    ],
  },
  {
    role: "Software Engineer — AI",
    skills: [
      "FastAPI",
      "LLM Integration",
      "Prompt Engineering",
      "AI Agent Workflows",
      "REST APIs for AI",
      "Hugging Face Transformers",
      "Docker",
      "CI/CD Pipelines",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    role: "Data Analyst — AI",
    skills: [
      "scikit-learn",
      "Pandas / NumPy",
      "NLP / Text Analytics",
      "Power BI",
      "AI-Assisted Reporting",
      "Automated Insight Generation",
      "Statistical Anomaly Detection",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <div className="pageHeroLayout">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="pageTitle">AI engineer with deep ML engineering skills and enterprise data delivery experience.</h1>
            <p className="sectionBody narrow">
              I build dependable data workflows and intelligent AI-powered systems — from raw ETL to RAG pipelines, real-time
              feature stores, and LLM-integrated applications. My work bridges traditional data engineering with modern AI
              infrastructure.
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

      <section className="twoColSection">
        <article className="infoCard" data-reveal="" data-reveal-delay="0">
          <h2>How I work</h2>
          <ul className="detailList">
            <li>I design pipelines with downstream reporting, ML models, and analytics users in mind.</li>
            <li>I integrate AI capabilities — RAG, embeddings, LLMs — into data platforms that already need to be reliable.</li>
            <li>I work across AWS and Azure based on existing enterprise platforms, leveraging SageMaker, Databricks, and managed AI services.</li>
            <li>I translate business requirements into AI-ready data structures and intelligent automation workflows.</li>
          </ul>
        </article>

        <article className="infoCard" data-reveal="" data-reveal-delay="100">
          <h2>Professional summary</h2>
          <p className="sectionBody">
            I am an AI Engineer with 4+ years of experience building AI/ML and GenAI applications and the data
            infrastructure behind them across banking, retail, and enterprise. I combine production data delivery with
            deep ML engineering — LLM-powered systems, RAG pipelines, vector search, feature engineering, and model
            serving with deep AWS expertise — alongside data-quality engineering and Spark/SQL tuning that reduces
            latency and cost. I completed my M.S. in Computer Science at The University of Texas at Arlington in
            December 2024.
          </p>
        </article>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Technical skills</p>
          <h2 className="sectionTitle">Full technical stack across AI/ML, cloud, data engineering, and modeling.</h2>
        </div>
        <div className="aiSkillGrid">
          {skillCategories.map((group, i) => (
            <article className="aiSkillCard" key={group.label} data-reveal="scale" data-reveal-delay={String(i * 80)}>
              <p className="aiSkillRole">{group.label}</p>
              <div className="badgeCloud">
                {group.skills.map((skill) => (
                  <span className="badge" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">AI & machine learning skills</p>
          <h2 className="sectionTitle">AI capabilities organized by role — ready for data, software, and analytics teams.</h2>
        </div>
        <div className="aiSkillGrid">
          {aiSkillGroups.map((group, i) => (
            <article className="aiSkillCard" key={group.role} data-reveal="scale" data-reveal-delay={String(i * 100)}>
              <p className="aiSkillRole">{group.role}</p>
              <div className="badgeCloud">
                {group.skills.map((skill) => (
                  <span className="badge badgeAI" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Certifications</p>
          <h2 className="sectionTitle">Industry certifications across cloud, data, and analytics engineering.</h2>
        </div>
        <div className="badgeCloud">
          {certifications.map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
