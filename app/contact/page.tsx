import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <div className="pageHeroLayout">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="pageTitle">Open to recruiter outreach for AI/ML engineering, data engineering, and software engineering roles.</h1>
            <p className="sectionBody narrow">
              Email or LinkedIn are the fastest ways to reach me. I am based in Dallas, Texas and open to relocation for the
              right opportunity.
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
          <h2>Reach me directly</h2>
          <div className="contactActions">
            <a className="btn btnPrimary" href="mailto:leelakrishnakoppolu@gmail.com">
              Email
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/leela-krishna-klk/"
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
          </div>
        </article>

        <article className="infoCard" data-reveal="" data-reveal-delay="100">
          <h2>Role fit</h2>
          <ul className="detailList">
            <li>AI/ML Engineer / GenAI Engineer</li>
            <li>Data Engineer / Cloud Data Engineer</li>
            <li>Software Engineer (AI/ML focus)</li>
            <li>Data Analyst</li>
            <li>ETL Developer / Analytics Engineer</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
