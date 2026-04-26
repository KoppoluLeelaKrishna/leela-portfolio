import ResumeChat from "@/components/ResumeChat";

export default function ResumePage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Resume</p>
        <h1 className="pageTitle">Everything a recruiter needs, organized for a fast qualification pass.</h1>
        <p className="sectionBody narrow">
          Access the latest resume directly, review a quick summary of fit, or use the assistant for concise questions
          about skills, tools, and experience.
        </p>
      </section>

      <section className="twoColSection">
        <article className="infoCard">
          <h2>Resume access</h2>
          <div className="heroActions">
            <a
              className="btn btnPrimary"
              href="/Resume_Data%20Engineer_Leela%20Krishna%20Koppolu_2026.pdf"
              download
            >
              Download Resume
            </a>
            <a
              className="btn"
              href="/Resume_Data%20Engineer_Leela%20Krishna%20Koppolu_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Browser
            </a>
          </div>
        </article>

        <article className="infoCard">
          <h2>Quick summary</h2>
          <ul className="detailList">
            <li>4+ years of experience across data engineering and analytics support</li>
            <li>AWS and Azure platform exposure in enterprise environments</li>
            <li>PySpark, SQL, Airflow, Databricks, Snowflake, and reporting support</li>
            <li>M.S. in Computer Science from UT Arlington, completed December 2024</li>
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">Assistant</p>
          <h2 className="sectionTitle">Ask for a concise resume walkthrough.</h2>
        </div>
        <div className="infoCard">
          <ResumeChat />
        </div>
      </section>
    </div>
  );
}
