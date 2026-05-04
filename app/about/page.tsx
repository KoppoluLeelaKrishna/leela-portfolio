import Image from "next/image";

const coreStack = [
  "Python",
  "PySpark",
  "SQL",
  "Airflow",
  "Databricks",
  "Snowflake",
  "AWS",
  "Azure",
  "ETL / ELT",
  "Data Modeling",
  "dbt",
  "Kafka",
  "Reporting Support",
];

const aiSkillGroups = [
  {
    role: "Data Engineer — AI/ML",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG Architecture",
      "Vector Databases (Pinecone, ChromaDB)",
      "Embedding Pipelines",
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
            <h1 className="pageTitle">Data + AI engineer with enterprise delivery experience and a strong ML engineering foundation.</h1>
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
            My background combines hands-on enterprise data delivery with deep ML engineering skills. I completed my
            M.S. in Computer Science at The University of Texas at Arlington in December 2024, with focus areas in data
            engineering, distributed systems, machine learning, and cloud computing. I actively build with LLM APIs,
            vector databases, and AI orchestration frameworks alongside traditional ETL and pipeline tooling.
          </p>
        </article>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Data engineering stack</p>
          <h2 className="sectionTitle">Core tools and platforms used in production data engineering work.</h2>
        </div>
        <div className="badgeCloud">
          {coreStack.map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
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
    </div>
  );
}
