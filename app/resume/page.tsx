import Image from "next/image";
import ResumeChat from "@/components/ResumeChat";

export default function ResumePage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <div className="pageHeroLayout">
          <div>
            <p className="eyebrow">Resume</p>
            <h1 className="pageTitle">Everything a recruiter needs — AI/ML, data engineering, and software engineering background in one place.</h1>
            <p className="sectionBody narrow">
              Access the latest resume directly, review a quick summary of fit, or ask ASSIST AI any question about skills,
              AI projects, tools, and experience across all target roles.
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
          <h2>Resume access</h2>
          <div className="heroActions">
            <a
              className="btn btnPrimary"
              href="/Leela_Krishna_Koppolu_Resume_AI_Engineer.pdf"
              download
            >
              Download Resume
            </a>
            <a
              className="btn"
              href="/Leela_Krishna_Koppolu_Resume_AI_Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View in Browser
            </a>
          </div>
        </article>

        <article className="infoCard" data-reveal="" data-reveal-delay="100">
          <h2>Quick summary</h2>
          <ul className="detailList">
            <li>AI Engineer with 4+ years across AI/ML, GenAI, and the data infrastructure behind them</li>
            <li>AI/ML stack: LLMs, RAG, Pinecone, FAISS, Amazon Bedrock, Hugging Face, PyTorch, MLflow, SageMaker</li>
            <li>Data engineering: PySpark, SQL, Airflow, Databricks, Snowflake, Kafka, dbt, AWS, Azure</li>
            <li>Certifications: AWS Data Engineer Associate, Databricks Data Engineer Associate, SnowPro Core, dbt Fundamentals</li>
            <li>M.S. in Computer Science from UT Arlington, completed December 2024</li>
          </ul>
        </article>
      </section>

      <section className="section" data-reveal="">
        <div className="sectionIntro">
          <p className="eyebrow">ASSIST AI</p>
          <h2 className="sectionTitle">Ask about AI/ML skills, data engineering, software engineering, or any role-specific question.</h2>
        </div>
        <div className="infoCard">
          <ResumeChat />
        </div>
      </section>
    </div>
  );
}
