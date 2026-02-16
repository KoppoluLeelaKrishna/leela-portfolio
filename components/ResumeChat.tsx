"use client";

import { useState } from "react";

export default function ResumeChat() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function ask() {
    setErr("");
    setAns("");
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/resume-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Something went wrong");
      } else {
        setAns(data.answer);
      }
    } catch (e: any) {
      setErr(e?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatWrap">
      <input
        className="chatInput"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask: skills, projects, AWS experience, Spark, etc..."
        onKeyDown={(e) => e.key === "Enter" && ask()}
      />

      <button className="chatBtn" onClick={ask} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      {err && <div className="chatError">{err}</div>}
      {ans && <div className="chatAnswer">{ans}</div>}
    </div>
  );
}
