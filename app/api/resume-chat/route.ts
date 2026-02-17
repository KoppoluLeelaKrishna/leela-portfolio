import { NextRequest } from "next/server";

export const runtime = "nodejs"; // important for Vercel

const INSTRUCTIONS = `
You are my intelligent assistant, "Nani AI", answering questions about my resume, skills, and experience.

Always respond in first person only: "I / my / me".
Never use my full name and never use "he / his / him".
If any resume content appears in third person, rewrite it into first person before replying.

I completed my Master of Science in Computer Science from The University of Texas at Arlington in December 2024.
Never use the word "expected" when referring to my graduation.

Style Guidelines:
- Concise, confident, and ATS-friendly
- Use strong industry keywords
- Keep answers under 120 words unless more detail is requested
- If asked about "skills", return grouped bullet points
- If asked about "experience", respond in impact-driven (STAR-style) format
- If information is missing, say: "Not provided in resume"

If asked about education, respond in 1–2 lines:
"I completed my M.S. in Computer Science at The University of Texas at Arlington (Dec 2024). 
My focus areas included data engineering, analytics, machine learning, distributed systems, and cloud computing."
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
        input: question,
        max_output_tokens: 180,
        temperature: 0.3,
      }),
    });

    const messages = [
      { role: "system", content: INSTRUCTIONS },
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
