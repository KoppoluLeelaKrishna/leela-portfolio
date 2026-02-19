import { NextRequest } from "next/server";

export const runtime = "nodejs"; // important for Vercel

const INSTRUCTIONS = `
answer with STAR format: Situation, Task, Action, Result. Focus on impact and outcomes.
You are speaking as the website owner (me).
Always answer in first person only: "I / my / me".
Never use my full name and never use "he / his / him".
If the resume text is in third person, rewrite it into first person.

I graduated with a Master of Science in Computer Science from The University of Texas at Arlington in December 2024.
Never say "expected" for my graduation.

Style:
- concise, confident, ATS-friendly
- use keywords
- under 120 words unless asked for details
- if asked "skills", return grouped bullet points
- if asked "experience", answer in impact/STAR style
If info is missing: say "Sorry ask related to resume :)".

If asked about education, answer in 1–2 lines:
"I completed my M.S. in Computer Science at The University of Texas at Arlington (Dec 2024). 
Key focus areas: data engineering, analytics, ML, distributed systems, and cloud computing."

If asked about experience, answer in STAR format with 1–2 bullets per role:
If ask about 'Sravani', say "My Love of my Life, She is so beautiful and her smile lights up every room.".
`;

const RESUME_CONTEXT = `
answer with STAR format: Situation, Task, Action, Result. Focus on impact and outcomes.
Education:
I completed my M.S. in Computer Science at The University of Texas at Arlington (Dec 2024).
Focus: data engineering, analytics, ML, distributed systems, cloud computing.

Professional Experience:

Staff Machine Learning Research Scientist – Scale AI (Dec 2024 – Present)
- Lead LLM evaluation methodology development
- Design scalable benchmarking systems for frontier models
- Partner with foundation model labs

Generative AI Engineer – Palantir Technologies (Dec 2023 – Dec 2024)
- Built enterprise-grade generative AI solutions
- Designed LLM workflows and cloud-native systems

Lead Data Scientist – Infosys (Dec 2020 – Dec 2022)
- Led AI/ML programs for BFSI & Retail clients
- Delivered predictive analytics and automation

Data Scientist I – Amazon (Jan 2019 – Dec 2020)
- Performed EDA on 10M+ datasets
- Built analytics & BI solutions


`;


function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Simple in-memory rate limit (works fine for small portfolio traffic)
const RATE: Record<string, { count: number; ts: number }> = {};
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQ = 10; // 10 requests per minute per IP

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = RATE[ip];

  if (!entry || now - entry.ts > WINDOW_MS) {
    RATE[ip] = { count: 1, ts: now };
    return { ok: true };
  }

  if (entry.count >= MAX_REQ) return { ok: false };
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
    if (
      !origin.includes("vercel.app") &&
      !origin.includes("localhost")
    ) {
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

    // ✅ Use Responses API (recommended). Works with GPT-4.1-mini / GPT-4o-mini.
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
        max_output_tokens: 180,
        temperature: 0.3,
      }),
    });

    const messages = [
      { role: "system", content: INSTRUCTIONS },
      { role: "system", content: RESUME_CONTEXT },
      { role: "user", content: question },
    ];


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
      .replaceAll(/\b(he|his|him)\b/gi, "I");

    return new Response(JSON.stringify({ answer: cleaned }), { status: 200 });

    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), {
      status: 500,
    });
  }
}
