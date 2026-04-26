const stack = [
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
  "Reporting Support",
];

export default function AboutPage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">About</p>
        <h1 className="pageTitle">A data engineer with a delivery mindset, enterprise experience, and strong analytics alignment.</h1>
        <p className="sectionBody narrow">
          I focus on building dependable data workflows that move raw source data into curated, analytics-ready outputs.
          My work is grounded in cloud platforms, operational stability, and business reporting needs.
        </p>
      </section>

      <section className="twoColSection">
        <article className="infoCard">
          <h2>How I work</h2>
          <ul className="detailList">
            <li>I design pipelines with downstream reporting and analytics users in mind.</li>
            <li>I prioritize validation, scheduling reliability, and maintainable orchestration.</li>
            <li>I work across AWS and Azure based on existing enterprise platforms and team context.</li>
            <li>I translate business reporting requirements into practical, usable data structures.</li>
          </ul>
        </article>

        <article className="infoCard">
          <h2>Professional summary</h2>
          <p className="sectionBody">
            My background combines hands-on enterprise delivery with academic grounding in computer science. I completed my
            M.S. in Computer Science at The University of Texas at Arlington in December 2024, with focus areas in data
            engineering, analytics, distributed systems, and cloud computing.
          </p>
        </article>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">Core stack</p>
          <h2 className="sectionTitle">Tools and platforms I use most often in production data engineering work.</h2>
        </div>
        <div className="badgeCloud">
          {stack.map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
