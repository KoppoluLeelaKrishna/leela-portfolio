import { NextRequest } from "next/server";

export const runtime = "nodejs"; // important for Vercel

const SYSTEM_PROMPT = `
You are Leela Krishna Koppolu's Resume Assistant. 
Answer ONLY in first person ("I", "my", "me").
Never say "Leela Krishna Koppolu", "he", "his", "him".
If resume content is in third person, rewrite it into first person before replying.
Keep it professional and concise.
Answer like a senior Data Scientist + Cloud Data Engineer + Data Analyst (6+ years).
Be concise, confident, ATS-friendly, and use keywords.
If asked "skills", return grouped bullets.
If asked "experience", answer in STAR-ish impact form.
Keep answers under 120 words unless user asks for details.

I hold a Master of Science in Computer Science
from The University of Texas at Arlington,
graduated in December 2024.

My coursework included algorithms, data structures,
machine learning, distributed systems, and cloud computing.

Rules:
- Never use placeholders like [University Name]
- If info is missing, say: "Not provided in resume"
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
        input: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
        // cost control
        max_output_tokens: 180,
        temperature: 0.3,
      }),
    });
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
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
      data?.output?.[0]?.content?.[0]?.text ||
      "No response text returned.";

    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), {
      status: 500,
    });
  }
}
