export default function AboutPage() {
  return (
    <div>
      <h1 className="h1">About</h1>

      <p className="sub">
        I’m Leela Krishna Koppolu — a Cloud Data Engineer & Data Analyst. I build
        scalable ETL/ELT pipelines, improve data quality, and deliver analytics
        dashboards across AWS and Azure.
      </p>

      <div className="card">
        <h2>What I focus on</h2>
        <ul className="ul">
          <li>Batch + streaming pipelines (Spark / PySpark)</li>
          <li>Data quality, validation, and monitoring</li>
          <li>Data modeling for analytics + reporting</li>
          <li>Power BI dashboards and KPI definitions</li>
          <li>Cloud platforms: AWS and Azure</li>
        </ul>
      </div>

      <div className="card">
        <h2>Core stack</h2>
        <div className="badges">
          <span className="badge">AWS</span>
          <span className="badge">Azure</span>
          <span className="badge">S3</span>
          <span className="badge">Glue</span>
          <span className="badge">Redshift</span>
          <span className="badge">Databricks</span>
          <span className="badge">Spark</span>
          <span className="badge">Airflow</span>
          <span className="badge">SQL</span>
          <span className="badge">Python</span>
          <span className="badge">Power BI</span>
        </div>
      </div>
    </div>
  );
}
