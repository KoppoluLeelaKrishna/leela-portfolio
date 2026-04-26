import Link from "next/link";
import Image from "next/image";
import ResumeChat from "@/components/ResumeChat";

const skills = [
  "AWS (S3, Glue, Redshift, Athena, Lambda)",
  "Azure (ADLS, Databricks, Synapse)",
  "PySpark",
  "SQL",
  "ETL / ELT",
  "Airflow",
  "Databricks",
  "Snowflake",
  "Data Pipelines",
  "Data Modeling",
  "Data Ingestion",
  "Data Transformation",
  "Workflow Orchestration",
  "Pipeline Optimization",
  "Reporting Support",
  "Power BI",
];

export default function HomePage() {
  return (
    <div className="hero">
      <div className="aiGrid" />

      <div className="heroContent">
        <div className="kicker">
          <span>Open to:</span>
          <strong> Data Engineer | Cloud Data Engineer | ETL Developer</strong>
        </div>

        <h1 className="heroTitle">
          Building scalable data pipelines and cloud data platforms for analytics and business growth
        </h1>

        <p className="heroSub">
          I am a Data Engineer with 4+ years of experience designing and supporting
          cloud-based data pipelines, ETL workflows, and analytics systems using AWS and Azure.
          I specialize in PySpark, SQL, Airflow, and distributed data processing to deliver
          reliable, high-performance datasets for business decision-making.
        </p>

        <div className="heroHighlights">
          <div className="pill">ETL / ELT | Batch Processing | Data Ingestion</div>
          <div className="pill">PySpark | SQL | Airflow | Databricks</div>
          <div className="pill">AWS | Azure | Snowflake | Reporting</div>
          <div className="pill">Data Modeling | Validation | Pipeline Monitoring</div>
        </div>

        <div className="heroImage">
          <Image
            src="/profile.jpg"
            alt="Leela Krishna Koppolu"
            width={380}
            height={420}
            className="profileImage"
            priority
          />
        </div>

        <div className="grid" style={{ marginTop: 24 }}>
          <section className="card col12">
            <h2>&apos;Nani AI&apos; - My Intelligent Assistant</h2>
            <p className="sub">
              Ask anything about my data engineering skills, tools, projects, and experience.
            </p>
            <ResumeChat />
          </section>
        </div>
      </div>

      <div className="ctaRow">
        <Link className="btn btnPrimary" href="/projects">
          View Projects
        </Link>
        <Link className="btn" href="/resume">
          Resume Page
        </Link>
        <Link className="btn" href="/contact">
          Contact
        </Link>
        <Link
          className="btn"
          href="/Resume_Data%20Engineer_Leela%20Krishna%20Koppolu_2026.pdf"
          target="_blank"
        >
          Download Resume
        </Link>
        <a
          href="https://www.linkedin.com/in/leela-krishna-klk/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btnPrimary"
        >
          LinkedIn
        </a>
      </div>

      <div className="grid">
        <section className="card col8">
          <h2>What I Focus On</h2>
          <ul className="ul">
            <li>Designing scalable ETL/ELT pipelines using PySpark and SQL</li>
            <li>Batch data processing and workflow orchestration with Airflow</li>
            <li>Data modeling and transformation for analytics and reporting</li>
            <li>Cloud data platforms across AWS and Azure</li>
            <li>Data quality, validation, and pipeline performance optimization</li>
          </ul>
        </section>

        <section className="card col4">
          <h2>Quick Links</h2>
          <div className="split">
            <a
              className="btn"
              href="https://www.linkedin.com/in/leela-krishna-klk"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn"
              href="https://github.com/KoppoluLeelaKrishna"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a className="btn" href="mailto:koppoluleelakrishna@gmail.com">
              Email
            </a>
          </div>
          <p className="itemMeta" style={{ marginTop: 10 }}>
            Dallas, Texas, USA | Open to relocate
          </p>
        </section>

        <section className="card col12">
          <h2>Core Skills</h2>
          <div className="badges">
            {skills.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="card col12">
          <h2>Experience Snapshot</h2>
          <div className="grid">
            <div className="card col4">
              <h3>Walmart</h3>
              <p className="itemMeta">Data Engineer | Dec 2024 - Present</p>
              <p>
                Designing and maintaining AWS-based data pipelines, ETL workflows,
                and reporting solutions using PySpark, SQL, Airflow, Databricks,
                and Snowflake for scalable enterprise analytics.
              </p>
            </div>

            <div className="card col4">
              <h3>Truist</h3>
              <p className="itemMeta">Information Engineer Intern | Mar 2023 - Nov 2023</p>
              <p>
                Supported AWS ETL development, pipeline monitoring, scheduling,
                validation, dependency handling, and analytics-ready dataset
                delivery for business reporting and analysis.
              </p>
            </div>

            <div className="card col4">
              <h3>Infosys</h3>
              <p className="itemMeta">Software Engineer | Jan 2021 - Dec 2022</p>
              <p>
                Worked in a data engineering-focused role across AWS and Azure,
                building ETL workflows, data integration pipelines, PySpark
                transformations, and reporting support solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="card col12">
          <h2>Education</h2>
          <p>
            M.S. in Computer Science, The University of Texas at Arlington, completed
            in December 2024. Focus areas included data engineering, analytics,
            distributed systems, and cloud computing.
          </p>
        </section>

        <section className="card col12">
          <h2>Professional Summary</h2>
          <p>
            Data Engineer with 4+ years of experience designing and supporting
            cloud-based data pipelines, ETL workflows, and analytics solutions.
            Experienced in AWS and Azure data engineering with strong hands-on
            expertise in PySpark, SQL, Airflow, Databricks, and Snowflake.
            Proven ability to build scalable data pipelines, optimize processing
            performance, manage workflow orchestration, and deliver reliable
            datasets for analytics, reporting, and business decision-making.
          </p>
        </section>
      </div>
    </div>
  );
}
