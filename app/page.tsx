import Image from "next/image";
import Link from "next/link";
import ResumeChat from "@/components/ResumeChat";

const recruiterSignals = [
  "4+ years across data engineering, ETL delivery, and analytics support",
  "Enterprise experience spanning Walmart, Truist, and Infosys",
  "AWS, Azure, PySpark, SQL, Airflow, Databricks, and Snowflake",
  "M.S. in Computer Science from The University of Texas at Arlington",
];

const priorityCards = [
  {
    title: "Production reliability",
    body: "Focused on stable scheduled pipelines, validation checkpoints, and recurring delivery that reporting teams can trust.",
  },
  {
    title: "Cloud platform range",
    body: "Comfortable operating across AWS and Azure environments depending on enterprise stack, governance, and team needs.",
  },
  {
    title: "Business alignment",
    body: "Work is shaped around reporting readiness, downstream usability, and clear handoff to analytics consumers.",
  },
  {
    title: "Practical engineering judgment",
    body: "Delivery style emphasizes maintainability, orchestration clarity, and clean transformation logic over unnecessary complexity.",
  },
];

const experience = [
  {
    company: "Walmart",
    role: "Data Engineer",
    period: "Dec 2024 - Present",
    body:
      "Build and support AWS-based data pipelines, PySpark ETL workflows, and reporting-ready datasets using SQL, Airflow, Databricks, and Snowflake.",
  },
  {
    company: "Truist",
    role: "Information Engineer Intern",
    period: "Mar 2023 - Nov 2023",
    body:
      "Supported ETL scheduling, monitoring, validation, and dependency management for business-facing datasets and recurring enterprise reporting.",
  },
  {
    company: "Infosys",
    role: "Software Engineer",
    period: "Jan 2021 - Dec 2022",
    body:
      "Worked in a data-engineering-focused role across AWS and Azure, building integration pipelines, PySpark transformations, and analytics support workflows.",
  },
];

const hiringChecklist = [
  {
    title: "Can step into enterprise data workflows",
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
  { label: "Core stack", value: "PySpark, SQL, Airflow" },
  { label: "Location", value: "Dallas, TX" },
];

export default function HomePage() {
  return (
    <div className="pageStack">
      <section className="heroSection">
        <div className="heroCopy">
          <div className="eyebrow">Data engineer portfolio</div>
          <div className="heroBadge">Open to data engineering and cloud pipeline roles</div>
          <h1 className="heroTitle">
            Professional data engineer focused on cloud pipelines, production ETL, and analytics-ready delivery.
          </h1>
          <p className="heroSub">
            I build and support enterprise data workflows across AWS and Azure with hands-on experience in PySpark, SQL,
            Airflow, Databricks, Snowflake, and reporting support. My work centers on reliable pipelines, scalable
            transformation logic, and datasets that are ready for business use.
          </p>

          <div className="heroActions">
            <a
              className="btn btnPrimary"
              href="/Resume_Data%20Engineer_Leela%20Krishna%20Koppolu_2026.pdf"
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
          <div className="portraitCard">
            <div className="portraitFrame">
              <Image
                src="/profile.jpg"
                alt="Leela Krishna Koppolu"
                width={420}
                height={500}
                className="profileImage"
                priority
              />
            </div>
            <div className="portraitMeta">
              <div>
                <p className="metaLabel">Target roles</p>
                <p className="metaValue">Data Engineer, Cloud Data Engineer, ETL Developer</p>
              </div>
              <div>
                <p className="metaLabel">Location</p>
                <p className="metaValue">Dallas, Texas with openness to relocation</p>
              </div>
              <div>
                <p className="metaLabel">Education</p>
                <p className="metaValue">M.S. Computer Science, UT Arlington</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">Core strengths</p>
          <h2 className="sectionTitle">The capabilities I bring to enterprise data engineering teams.</h2>
        </div>
        <div className="featureGrid">
          {priorityCards.map((item) => (
            <article className="featureCard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">Experience snapshot</p>
          <h2 className="sectionTitle">Recent roles aligned with enterprise data engineering and analytics delivery.</h2>
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <article className="timelineCard" key={job.company}>
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

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">Hiring fit</p>
          <h2 className="sectionTitle">What hiring teams can confirm quickly from my background.</h2>
        </div>
        <div className="featureGrid">
          {hiringChecklist.map((item) => (
            <article className="projectPreview" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">ASSIST AI</p>
          <h2 className="sectionTitle">Ask my recruiter-facing assistant for a fast, professional summary.</h2>
        </div>
        <div className="infoCard">
          <ResumeChat />
        </div>
      </section>

      <section className="section recruiterCta">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="sectionTitle">Available for data engineering opportunities with teams building reliable cloud data platforms.</h2>
          <p className="sectionBody">
            Review the resume, project case studies, and contact page for the fastest qualification pass. If you want a
            concise walkthrough of cloud pipelines, orchestration, or reporting support experience, contact me directly.
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
