export default function AboutPage() {
  return (
    <div>
      <h1 className="h1">About</h1>

      <p className="sub">
        I am a Data Engineer with 4+ years of experience building cloud-based data
        pipelines, ETL workflows, and analytics-ready datasets. My work focuses on
        scalable batch processing, workflow orchestration, data transformation, and
        reporting support across AWS and Azure environments.
      </p>

      <p className="sub">
        I work primarily with PySpark, SQL, Airflow, Databricks, and Snowflake to
        deliver reliable data products for business reporting and decision-making.
        I completed my M.S. in Computer Science at The University of Texas at
        Arlington in December 2024, with focus areas in data engineering,
        distributed systems, analytics, and cloud computing.
      </p>

      <div className="card">
        <h2>What I Focus On</h2>
        <ul className="ul">
          <li>Designing ETL and ELT pipelines for analytics and reporting</li>
          <li>Building cloud-native data workflows on AWS and Azure</li>
          <li>Transforming raw data into curated, business-ready datasets</li>
          <li>Improving pipeline reliability, validation, and monitoring</li>
          <li>Supporting scalable analytics platforms and stakeholder reporting</li>
        </ul>
      </div>

      <div className="card">
        <h2>Core Stack</h2>
        <div className="badges">
          <span className="badge">Python</span>
          <span className="badge">PySpark</span>
          <span className="badge">SQL</span>
          <span className="badge">Airflow</span>
          <span className="badge">Databricks</span>
          <span className="badge">Snowflake</span>
          <span className="badge">ETL / ELT</span>
          <span className="badge">Data Modeling</span>
          <span className="badge">Reporting Support</span>
          <span className="badge">AWS</span>
          <span className="badge">Azure</span>
        </div>
      </div>
    </div>
  );
}
