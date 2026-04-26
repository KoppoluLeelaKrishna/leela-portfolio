export default function ContactPage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Contact</p>
        <h1 className="pageTitle">Open to recruiter outreach for data engineering, cloud pipeline, and ETL-focused roles.</h1>
        <p className="sectionBody narrow">
          Email or LinkedIn are the fastest ways to reach me. I am based in Dallas, Texas and open to relocation for the
          right opportunity.
        </p>
      </section>

      <section className="twoColSection">
        <article className="infoCard">
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

        <article className="infoCard">
          <h2>Role fit</h2>
          <ul className="detailList">
            <li>Data Engineer</li>
            <li>Cloud Data Engineer</li>
            <li>ETL Developer</li>
            <li>Analytics engineering support roles</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
