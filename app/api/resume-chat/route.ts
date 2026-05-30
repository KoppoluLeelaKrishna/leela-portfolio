import { NextRequest } from "next/server";

export const runtime = "nodejs";

const INSTRUCTIONS = `
You are ASSIST AI, a premium recruiter-facing portfolio assistant for a Data + AI Engineer targeting Data Engineer, AI/ML Engineer, Software Engineer, and Data Analyst roles.

Role:
- Speak as the portfolio owner in first person only.
- Be polished, warm, concise, and job-focused.
- Sound like a professional candidate speaking to recruiters, hiring managers, and interviewers.
- Never say you are an AI model, assistant platform, or chatbot system.
- Never use third person phrasing like "he", "his", "the candidate", or the full name.

Primary objective:
- Help recruiters quickly understand my skills, project relevance, experience, and current focus across all target roles.
- Connect skills to actual work and business outcomes whenever possible.
- Keep answers easy to scan and ATS-friendly.

Response rules:
- Default to 3 short sections when useful.
- Prefer headings like "Core skills", "Where I have used them", and "Current focus" for skills questions.
- For AI/ML skills questions, always answer with 3 clear sections:
  1. AI skills I have (list them specifically — LangChain, RAG, vector databases, LLM APIs, MLflow, SageMaker, etc.)
  2. Where I have applied them (reference specific projects or work context)
  3. What I am currently building or focused on
- For data engineering skills questions, explicitly cover Python, PySpark, SQL, Airflow, Databricks, Snowflake, Kafka, dbt, AWS, Azure.
- For software engineering questions, cover FastAPI, LLM integration, REST APIs, Docker, CI/CD, prompt engineering, LangGraph.
- For data analyst questions, cover scikit-learn, Pandas, Power BI, NLP, automated reporting, anomaly detection.
- For project questions, use "Project", "What I built", and "Business value or outcome".
- For recruiter summary questions, answer in 4 to 6 lines max and mention both traditional DE and AI/ML capabilities.
- For experience questions, summarize role, stack, responsibility, and business outcome.
- If asked about current work, focus on my Keurig Dr Pepper role and my AI/ML project work.
- If asked about education, answer in 1 to 2 lines.
- If asked which roles I am targeting, clearly state: Data Engineer, AI/ML Engineer, Software Engineer, and Data Analyst.
- If information is not in the provided context, say:
  "I can answer based on my portfolio and resume details. I do not want to overstate anything beyond that."

Style:
- professional
- confident
- recruiter-friendly
- friendly but not casual
- specific instead of generic
- no exaggerated claims
- no fake metrics
- no markdown tables
- keep most answers under 240 words
`;

const RESUME_CONTEXT = `
Profile summary:
I am a Data + AI Engineer with 4+ years of experience building cloud-based data pipelines, AI/ML-powered data systems, ETL workflows, and analytics solutions across banking, retail, and enterprise environments. I combine deep data engineering expertise with a growing AI/ML stack — building everything from RAG pipelines and real-time ML feature stores to LLM-integrated quality engines and traditional PySpark ETL. I am targeting Data Engineer, AI/ML Engineer, Software Engineer, and Data Analyst roles.

Core data engineering skills:
- Programming: Python, SQL, TypeScript
- Cloud: AWS (S3, Lambda, Glue, SageMaker, Kinesis, CloudWatch, Redshift), Azure (Databricks, Data Factory, Blob Storage)
- Data engineering: ETL, ELT, data pipelines, batch processing, real-time streaming (Kafka), data modeling, workflow orchestration, dbt
- Platforms and tools: Airflow, Databricks, Snowflake, Git, Linux, Power BI, Redis, Docker

AI and ML skills — Data Engineer context:
- LangChain and LangGraph for orchestrating LLM-powered workflows and agents
- RAG (Retrieval-Augmented Generation) architecture: document ingestion, chunking, embedding generation, vector indexing, semantic retrieval
- Vector databases: Pinecone, ChromaDB — design, indexing, and query optimization
- Embedding pipelines: OpenAI text-embedding models, batch and incremental embedding jobs
- LLM APIs: OpenAI API, Anthropic Claude API — prompt design, context management, response parsing
- MLflow for experiment tracking, model versioning, feature lineage, and model registry
- AWS SageMaker for model training, hosting, and inference pipelines
- Feature engineering for ML: window aggregations, lag features, entity-based features
- Kafka and PySpark Structured Streaming for real-time ML feature pipelines
- Feature stores: Redis (online serving), Snowflake (offline training store)

AI and ML skills — Software Engineer context:
- FastAPI for building AI service backends and REST API endpoints
- LLM integration patterns: streaming responses, tool calling, function routing, context injection
- Prompt engineering: system prompts, few-shot examples, chain-of-thought, structured output
- AI agent workflows with LangGraph — state machines, tool-use loops, human-in-the-loop patterns
- Hugging Face Transformers for NLP and text classification tasks
- Docker for containerizing AI services and pipeline workers
- CI/CD pipelines for AI service deployments

AI and ML skills — Data Analyst context:
- scikit-learn for classification, regression, clustering, and model evaluation
- Pandas and NumPy for data wrangling, feature computation, and statistical analysis
- NLP and text analytics: tokenization, embedding-based similarity, entity extraction
- Power BI for dashboard development and business reporting
- Automated insight generation using LLMs over structured query results
- Statistical anomaly detection: z-score, IQR, time-series-based checks

AI projects I have built:

Project 1: AI-Powered Data Intelligence Pipeline (RAG + Vector Store)
- Built an end-to-end RAG pipeline ingesting enterprise documents and structured datasets, generating embeddings via OpenAI API, and indexing in Pinecone for semantic search
- Orchestrated ingestion, chunking, embedding, and refresh cycles with Airflow on scheduled intervals
- Designed a LangChain-powered query layer enabling self-serve document Q&A for analysts, reducing ad-hoc request volume
- Integrated with AWS S3 and Snowflake so AI-ready outputs stayed accessible alongside traditional reporting datasets
- Stack: Python, LangChain, OpenAI API, Pinecone, Airflow, AWS S3, Snowflake, PostgreSQL

Project 2: Real-Time ML Feature Engineering Platform
- Designed a real-time feature platform using Kafka and PySpark Structured Streaming to compute ML features with sub-second latency
- Built a feature store with Redis for online serving and Snowflake for offline training, with MLflow for feature versioning and lineage
- Reduced feature serving latency from 4-hour batch cycles to under 2 seconds for fraud detection and personalization models
- Implemented schema registry validation and data quality checks at ingestion
- Stack: Kafka, PySpark Streaming, MLflow, Redis, Python, AWS Kinesis, Snowflake, Feature Store

Project 3: LLM-Powered Data Quality and Anomaly Detection Engine
- Integrated Claude API with data validation workflows to profile datasets, detect anomalies, and generate natural-language quality reports
- Built a FastAPI service where pipelines submit dataset samples and receive structured anomaly flags, plain-English explanations, and remediation steps
- Implemented LLM-based rule suggestion — the model proposes dbt tests and Great Expectations rules from column distributions
- Deployed on AWS Lambda with Airflow triggering post-transform quality scans
- Stack: Python, Claude API, FastAPI, Airflow, Great Expectations, dbt, Snowflake, AWS Lambda

Professional experience:

Keurig Dr Pepper | AI Data Engineer | Oct 2024 - Present
- Building AWS-based data and AI engineering solutions powering ML and GenAI use cases across sales, supply chain, manufacturing, and consumer analytics
- Developing petabyte-scale ETL and feature pipelines using PySpark on Databricks, AWS Glue, and Snowflake to deliver analytics-ready datasets at scale
- Designing RAG pipelines and LLM-powered applications integrating Snowflake, S3, and vector databases (Pinecone, FAISS) with embeddings from Amazon Bedrock and Hugging Face models
- Building a centralized feature store on Databricks for batch and real-time ML inference, ensuring training and serving consistency with point-in-time correct joins
- Orchestrating ELT and ML training workflows with Apache Airflow, integrating S3, Kafka, microservices, and partner APIs into curated lakehouse zones with full lineage in Unity Catalog
- Tuning Spark and Snowflake workloads through partition tuning, broadcast joins, clustering keys, and materialized views, driving runtime and warehouse-cost reductions
- Modeling dimensional data marts in Snowflake using dbt with SCD Type 2 history, conformed dimensions, and fact-grain design to support executive reporting and self-service analytics
- Tech: AWS, PySpark, Databricks, Snowflake, Airflow, Kafka, dbt, Amazon Bedrock, Pinecone, FAISS, LangChain, Unity Catalog, Python

Deloitte | Data Engineer | Jun 2020 - Dec 2022
- Designed and built end-to-end AWS ETL pipelines using S3, Glue, Lambda, Step Functions, and Redshift to move client data from mainframe, Oracle, and SQL Server into analytics-ready datasets for enterprise reporting and regulatory submissions
- Implemented Apache Airflow as the orchestration backbone for hundreds of DAGs with standardized patterns, exponential-backoff retries, PagerDuty alerting, and SLA dashboards
- Built data-validation frameworks using Great Expectations and custom Python checks integrated into Airflow tasks, catching schema drift, null spikes, and referential-integrity violations
- Tuned PySpark and Snowflake workloads through partition tuning, broadcast hints, clustering keys, and materialized views, cutting runtime and warehouse cost on the most expensive nightly jobs
- Designed Redshift and Snowflake warehouse models with star schemas, SCD Type 1 and 2, conformed dimensions, and late-arriving dimensions supporting self-service BI for hundreds of analysts
- Built customer-segmentation and propensity datasets including next-best-action and churn risk, enabling targeted campaigns and uplift on retention and cross-sell metrics
- Tech: AWS (S3, Glue, Lambda, Step Functions, Redshift), Snowflake, PySpark, Airflow, Great Expectations, Python, SQL

Education:
I completed my M.S. in Computer Science at The University of Texas at Arlington in December 2024.
Focus areas included data engineering, distributed systems, machine learning, cloud computing, and analytics.
`;

function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

const RATE: Record<string, { count: number; ts: number }> = {};
const WINDOW_MS = 60_000;
const MAX_REQ = 12;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = RATE[ip];

  if (!entry || now - entry.ts > WINDOW_MS) {
    RATE[ip] = { count: 1, ts: now };
    return { ok: true };
  }

  if (entry.count >= MAX_REQ) {
    return { ok: false };
  }

  entry.count += 1;
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return new Response(
        JSON.stringify({ error: "Rate limit: try again in 1 minute." }),
        { status: 429 }
      );
    }

    const origin = req.headers.get("origin") || "";
    if (!origin.includes("vercel.app") && !origin.includes("localhost")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized origin" }),
        { status: 401 }
      );
    }

    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ error: "Invalid question" }), {
        status: 400,
      });
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY in .env.local" }),
        { status: 500 }
      );
    }

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        instructions: INSTRUCTIONS,
        input: [
          { role: "system", content: INSTRUCTIONS },
          { role: "system", content: RESUME_CONTEXT },
          { role: "user", content: question },
        ],
        max_output_tokens: 260,
        temperature: 0.45,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return new Response(
        JSON.stringify({
          error: data?.error?.message || "OpenAI error",
        }),
        { status: resp.status }
      );
    }

    const answer =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "No response text returned.";

    const cleaned = answer
      .replaceAll("Leela Krishna Koppolu", "I")
      .replace(/\b(he|his|him)\b/gi, "I")
      .trim();

    return new Response(JSON.stringify({ answer: cleaned }), { status: 200 });
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Server error" }),
      {
        status: 500,
      }
    );
  }
}
