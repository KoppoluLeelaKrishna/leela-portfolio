export default function AboutPage() {
  return (
    <div>
      <h1 className="h1">About</h1>

      <p className="sub">
        I am a Staff Machine Learning Research Scientist with deep expertise across Large Language Models (LLMs), Generative AI systems, and Cloud Data Engineering. My career spans enterprise-scale data platforms, production ML systems, and frontier AI evaluation research.
        At Scale AI, I lead research on rigorous evaluation methodologies for frontier LLMs. I design scalable benchmarks across instruction-following, factuality, robustness, and fairness, and build reproducible evaluation pipelines that enable reliable cross-model comparison in collaboration with leading foundation model labs.
        Prior to this, at Palantir Technologies, I developed enterprise-grade Generative AI systems using RAG architectures, vector search, and LLM-based automation pipelines deployed on cloud-native infrastructure.
        At Infosys, I led AI/ML initiatives while architecting distributed data systems — building real-time streaming pipelines (Kafka + Spark), designing cloud-native ETL workflows, and deploying ML models across AWS and Azure environments.
        Earlier at Amazon, I worked across analytics, data engineering, and applied machine learning — building large-scale ETL pipelines, optimizing Redshift and EMR workloads, designing A/B experiments, and deploying forecasting and recommendation systems on multi-million-record datasets.
        
        🔬 Core Strengths
        • LLM Evaluation & Benchmark Design
        • Transformer Modeling & Generative AI Systems
        • RAG & Vector Database Architectures
        • Cloud Data Engineering (AWS & Azure)
        • Distributed Data Processing (Spark, Kafka)
        • Production ML Deployment & Monitoring
        • Scalable ETL & Data Modeling
        • Experimentation & Statistical Analysis

        🛠 Technical Stack
        Python | PyTorch | Transformers | Hugging Face | LangChain | AWS (S3, Glue, Redshift, EMR, SageMaker) | Azure | Spark | Kafka | SQL | Airflow | MLflow | Distributed ML Systems
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
