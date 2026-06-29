import Link from "next/link";
import ResumeChat from "@/components/ResumeChat";
import PortraitCard from "@/components/PortraitCard";

const recruiterSignals = [
  "4+ years across AI/ML engineering, GenAI applications, and the data infrastructure behind them",
  "Enterprise experience at Keurig Dr Pepper and Deloitte across banking, retail, and enterprise",
  "AWS, Azure, PySpark, SQL, Airflow, Databricks, Snowflake, and Kafka",
  "AI/ML stack: LangChain, RAG, vector databases, LLM APIs, MLflow, SageMaker",
  "M.S. in Computer Science from The University of Texas at Arlington",
];

const priorityCards = [
  {
    title: "AI-augmented data pipelines",
    body: "Building intelligent pipelines that integrate LLMs, RAG architectures, and embedding workflows alongside traditional ETL to unlock AI-ready data products.",
  },
  {
    title: "Production reliability",
    body: "Focused on stable scheduled pipelines, validation checkpoints, and recurring delivery that reporting teams and ML models can trust.",
  },
  {
    title: "Cloud platform range",
    body: "Comfortable operating across AWS and Azure environments — including SageMaker, Databricks, and managed AI services — depending on enterprise stack.",
  },
  {
    title: "Business alignment",
    body: "Work is shaped around reporting readiness, downstream usability, and AI-ready data structures that unlock intelligence for analytics consumers.",
  },
];

const experience = [
  {
    company: "Keurig Dr Pepper",
    role: "AI Engineer",
    period: "Oct 2024 – Present",
    body:
      "Building AI and GenAI applications on AWS across sales, supply chain, manufacturing, and consumer analytics; designing RAG pipelines and LLM-powered applications with Amazon Bedrock, Hugging Face, Pinecone, and FAISS; maintaining a centralized feature store on Databricks for batch and real-time ML inference; orchestrating ML training and ELT workflows with Airflow and Unity Catalog.",
  },
  {
    company: "Deloitte",
    role: "Software Engineer",
    period: "Jun 2020 – Dec 2022",
    body:
      "Designed end-to-end AWS ETL pipelines using S3, Glue, Lambda, Step Functions, and Redshift; implemented Airflow orchestration for hundreds of DAGs with PagerDuty alerting and SLA dashboards; tuned PySpark and Snowflake workloads for runtime and cost; modeled star-schema warehouses with SCD Type 1 and 2 supporting enterprise reporting for hundreds of analysts.",
  },
];

const hiringChecklist = [
  {
    title: "Can step into enterprise AI and data workflows",
    detail: "Experience is already framed around production support, recurring data movement, and reporting-oriented outputs.",
  },
  {
    title: "Understands enterprise tooling",
    detail: "The portfolio highlights practical experience with cloud platforms, orchestration, transformation, and analytics-facing delivery.",
  },
  {
    title: "Connects engineering work to business value",
    detail: "The emphasis stays on reliability, analytics readiness, and operational reporting outcomes instead of listing tools without context.",
  },
];

const spotlightMetrics = [
  { label: "Experience", value: "4+ years" },
  { label: "Cloud focus", value: "AWS + Azure" },
  { label: "AI stack", value: "LangChain, RAG, LLMs" },
  { label: "Location", value: "Dallas, TX" },
];

export default function HomePage() {
  return (
    <div className="pageStack">
      <section className="heroSection">
        <div className="heroCopy">
          <div className="eyebrow">AI &amp; Data engineer portfolio</div>
          <div className="heroBadge">Open to AI/ML Engineering, Data Engineering, and Software Engineering roles</div>
          <h1 className="heroTitle">
            AI engineer building GenAI applications, RAG pipelines, and the data infrastructure behind them.
          </h1>
          <p className="heroSub">
            I build AI/ML and GenAI applications — LLM-powered systems, RAG pipelines, vector search, and ML feature
            engineering — along with the cloud data infrastructure behind them on AWS, Databricks, and Snowflake. My work
            spans embeddings and retrieval systems, real-time ML feature engineering, and reliable ETL delivery ready for
            production.
          </p>

          <div className="heroActions">
            <a
              className="btn btnPrimary"
              href="/Leela_Krishna_Koppolu_Resume_AI_Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/leela-krishna-klk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View LinkedIn
            </a>
            <Link className="btn" href="/projects">
              Review Projects
            </Link>
          </div>

          <div className="metricsGrid">
            {spotlightMetrics.map((item) => (
              <div className="metricCard" key={item.label}>
                <span className="metricValue">{item.value}</span>
                <span className="metricLabel">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="signalList">
            {recruiterSignals.map((item) => (
              <div className="signalItem" key={item}>
                <span className="signalDot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="heroAside">
          <PortraitCard />
        </aside>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Core strengths</p>
          <h2 className="sectionTitle">The capabilities I bring to AI/ML and data engineering teams.</h2>
        </div>
        <div className="featureGrid">
          {priorityCards.map((item, i) => (
            <article className="featureCard" key={item.title} data-reveal="scale" data-reveal-delay={String(i * 90)}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Experience snapshot</p>
          <h2 className="sectionTitle">Recent roles aligned with AI/ML engineering and enterprise data delivery.</h2>
        </div>
        <div className="timeline">
          {experience.map((job, i) => (
            <article className="timelineCard" key={job.company} data-reveal="" data-reveal-delay={String(i * 110)}>
              <div className="timelineHeader">
                <div>
                  <h3>{job.company}</h3>
                  <p className="roleLine">{job.role}</p>
                </div>
                <span className="timelinePeriod">{job.period}</span>
              </div>
              <p className="timelineBody">{job.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">Hiring fit</p>
          <h2 className="sectionTitle">What hiring teams can confirm quickly from my background.</h2>
        </div>
        <div className="featureGrid">
          {hiringChecklist.map((item, i) => (
            <article className="projectPreview" key={item.title} data-reveal="scale" data-reveal-delay={String(i * 90)}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">ASSIST AI</p>
          <h2 className="sectionTitle">Ask my recruiter-facing assistant for a fast, professional summary.</h2>
        </div>
        <div className="infoCard">
          <ResumeChat />
        </div>
      </section>

      <section className="section recruiterCta" data-reveal="">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="sectionTitle">Available for AI/ML engineering, data engineering, and software engineering opportunities.</h2>
          <p className="sectionBody">
            Review the resume, AI project case studies, and contact page for the fastest qualification pass. If you want
            a concise walkthrough of cloud pipelines, RAG architectures, LLM integrations, or ML feature engineering
            experience, contact me directly.
          </p>
        </div>
        <div className="heroActions">
          <Link className="btn btnPrimary" href="/contact">
            Contact Me
          </Link>
          <Link className="btn" href="/resume">
            Resume Page
          </Link>
        </div>
      </section>
    </div>
  );
}
