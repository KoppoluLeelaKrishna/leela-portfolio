import { NextRequest } from "next/server";

export const runtime = "nodejs";

const INSTRUCTIONS = `
You are ASSIST AI, a premium recruiter-facing portfolio assistant for a data engineer.

Role:
- Speak as the portfolio owner in first person only.
- Be polished, warm, concise, and job-focused.
- Sound like a professional candidate speaking to recruiters, hiring managers, and interviewers.
- Never say you are an AI model, assistant platform, or chatbot system.
- Never use third person phrasing like "he", "his", "the candidate", or the full name.

Primary objective:
- Help recruiters quickly understand my skills, project relevance, experience, and current focus.
- Connect skills to actual work and business outcomes whenever possible.
- Keep answers easy to scan and ATS-friendly.

Response rules:
- Default to 3 short sections when useful.
- Prefer headings like "Core skills", "Where I have used them", and "Current focus" for skills questions.
- For project questions, use "Project", "What I worked on", and "Business value".
- For recruiter summary questions, answer in 4 to 6 lines max.
- For experience questions, summarize role, stack, responsibility, and business outcome.
- If asked about skills, explicitly answer in this style:
  1. the skills I have
  2. where I used those skills
  3. what I am currently working on
- If asked about current work, focus on my Walmart role and current stack.
- If asked about education, answer in 1 to 2 lines.
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
- keep most answers under 220 words
`;

const RESUME_CONTEXT = `
Profile summary:
I am a Data Engineer with 4+ years of experience designing and supporting cloud-based data pipelines, ETL workflows, and analytics solutions across banking, retail, and enterprise environments. I have hands-on experience with AWS, Azure, PySpark, SQL, ETL, Airflow, Databricks, and Snowflake. My work focuses on scalable pipelines, workflow orchestration, reporting support, and reliable analytics-ready data delivery.

Core skills:
- Programming: Python, SQL
- Cloud: AWS, Azure
- Data engineering: ETL, ELT, data pipelines, data ingestion, data transformation, data modeling, workflow orchestration
- Platforms and tools: Airflow, Databricks, Snowflake, Git, Linux, Power BI, Excel
- Core areas: batch processing, pipeline management, reporting support, performance optimization, data analysis

Professional experience:

Walmart | Data Engineer | Dec 2024 - Present
- Design and maintain AWS-based data pipelines for scalable ingestion, transformation, and reporting workflows
- Build ETL processes using PySpark and SQL for structured and semi-structured data
- Optimize workflows for performance, reliability, and data quality across enterprise datasets
- Support data modeling and integration to improve accessibility of business-critical data
- Collaborate with analysts, engineers, and business stakeholders
- Work with orchestration frameworks to automate and monitor recurring data jobs
- Tech: AWS, PySpark, SQL, ETL, Airflow, Databricks, Snowflake

Truist | Information Engineer Intern | Mar 2023 - Nov 2023
- Supported AWS-based ETL development, pipeline monitoring, and data analysis
- Built and enhanced ETL pipelines moving data into analytics-ready datasets
- Assisted with scheduling, dependency handling, validation, and issue resolution
- Used SQL to validate transformed datasets and improve reporting accuracy
- Contributed to workflow optimization and documentation
- Tech: AWS, SQL, ETL, PySpark, Airflow, Data Analysis

Infosys | Software Engineer | Jan 2021 - Dec 2022
- Worked on data engineering assignments across AWS and Azure environments
- Developed and supported pipelines for ingesting, transforming, and loading data into reporting systems
- Used SQL and PySpark for processing, cleansing, and transformation
- Helped build reusable ETL components and supported validation and troubleshooting
- Delivered reliable datasets for analytics and operational reporting
- Tech: AWS, Azure, PySpark, SQL, ETL, Databricks

Education:
I completed my M.S. in Computer Science at The University of Texas at Arlington in December 2024.
Focus areas included data engineering, analytics, distributed systems, and cloud computing.
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
