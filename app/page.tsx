import Link from "next/link";
import Image from "next/image";
import ResumeChat from "@/components/ResumeChat";

const skills = [
  "AWS (S3, Glue, Redshift, Athena, Lambda)",
  "Azure (ADLS, Databricks, Synapse)",
  "Spark / PySpark • Kafka • Airflow",
  "SQL • Python (Pandas, NumPy)",
  "ETL/ELT • Data Modeling • Warehousing",
  "Power BI • Dashboards • Automation",
];




export default function HomePage() {
  return (
    <div className="hero">

      {/* AI Background Grid */}
      <div className="aiGrid" />

       {/* LEFT SIDE */}
        <div className="heroContent">
          <div className="kicker">
            <span>Open to:</span>
            <strong> Data Scientist • Data Engineer • Data Analyst</strong>
          </div>


        

        {/* RIGHT SIDE PHOTO */}
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
            <h2>Ask my Resume (AI)</h2>
            <p className="sub">
              Ask anything about my skills, projects, or experience — instant answers.
            </p>
            <ResumeChat />
          </section>
        </div>


    <div className="aiGrid" />

      <h1 className="heroTitle">
        Engineering Intelligent Data Systems That Power Analytics & Decision Science
      </h1>


      <p className="heroSub">
         I work at the intersection of Data Science, Data Engineering, and Analytics — 
         designing scalable data platforms, implementing quality-driven pipelines, 
         and delivering actionable insights for business growth.
      </p>



      <div className="heroHighlights">

        <div className="pill">ETL/ELT • Batch + Streaming</div>
        <div className="pill">Data Quality • Validation • Monitoring</div>
        <div className="pill">Spark • Airflow • SQL</div>
        <div className="pill">AWS • Azure • Snowflake/Redshift</div>

      </div>


       
    </div>
      

      <div className="ctaRow">
        <Link className="btn btnPrimary" href="/projects">
            View projects →
        </Link>
        <Link className="btn" href="/resume">
            Download resume
        </Link>
        <Link className="btn" href="/contact">
            Contact
        </Link>
        <Link className="btn" href="/Leela_Krishna_Koppolu_Resume.pdf" target="_blank">
            Download Resume
        </Link>
        <a
          href="https://www.linkedin.com/in/leela-krishna-klk/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btnPrimary"
        >
          LinkedIn →
        </a>

      </div>

      <div className="grid">
        <section className="card col8">
          <h2>What I do</h2>
          <p>
            I design and build data pipelines (batch + streaming), enforce data
            quality, model data for analytics, and deliver BI dashboards for
            business teams.
          </p>
          <div className="badges">
            <span className="badge">ETL/ELT</span>
            <span className="badge">Data Quality</span>
            <span className="badge">Spark</span>
            <span className="badge">Airflow</span>
            <span className="badge">SQL</span>
            <span className="badge">Power BI</span>
          </div>
        </section>

        <section className="card col4">
          <h2>Quick links</h2>
          <div className="split">
            <a className="btn" href="https://www.linkedin.com/in/leela-krishna-klk" target="_blank" rel="noopener noreferrer">
              LinkedIn 
            </a>
            <a className="btn" href="https://github.com/KoppoluLeelaKrishna" target="_blank" rel="noopener noreferrer">
              GitHub 
            </a>
            <a className="btn" href="mailto:leelakrishnakoppolu@gmail.com">
              Email 
            </a>
          </div>
          <p className="itemMeta" style={{ marginTop: 10 }}>
            Click on it — I reply quickly!
          </p>
        </section>

        <section className="card col12">
          <h2>Core skills</h2>
          <div className="badges">
            {skills.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

{/* 
<h2 className="sectionTitle">Next steps</h2>
<div className="grid">
  <div className="card col4">
    <h2>1 Add your projects</h2>
    <p>Show 3–6 projects with impact, tools, and links.</p>
  </div>
  <div className="card col4">
    <h2>2 Upload resume PDF</h2>
    <p>Put it in /public and link it on the resume page.</p>
  </div>
  <div className="card col4">
    <h2>3 Deploy on Vercel</h2>
    <p>Connect GitHub → Vercel → Deploy in 2 minutes.</p>
  </div>
</div>
*/}

    </div>
  );
}
