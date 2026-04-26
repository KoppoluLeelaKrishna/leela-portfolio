"use client";

import { useState } from "react";

const suggestedPrompts = [
  "What are your core data engineering skills?",
  "Which projects best show your AWS and PySpark experience?",
  "What are you currently working on in your role?",
  "Summarize your experience for a recruiter in 5 lines.",
];

export default function ResumeChat() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function ask(questionOverride?: string) {
    const question = questionOverride ?? q;

    setErr("");
    setAns("");
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/resume-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Something went wrong");
      } else {
        setAns(data.answer);
        setQ(question);
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="assistShell">
      <div className="assistIntro">
        <div>
          <p className="eyebrow">ASSIST AI</p>
          <h3 className="assistTitle">Recruiter-ready portfolio assistant</h3>
        </div>
        <p className="assistBody">
          Ask about skills, experience, projects, cloud platforms, or current focus areas. ASSIST AI answers in a
          professional, job-focused format tailored for recruiters and hiring managers.
        </p>
      </div>

      <div className="assistPromptGrid">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="promptChip"
            onClick={() => {
              setQ(prompt);
              void ask(prompt);
            }}
            disabled={loading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="chatWrap">
        <label className="chatLabel" htmlFor="assist-question">
          Ask ASSIST AI
        </label>
        <textarea
          id="assist-question"
          className="chatInput chatTextarea"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Example: What skills do you use most, where have you applied them, and what are you currently working on?"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void ask();
            }
          }}
        />

        <div className="chatActions">
          <button type="button" className="chatBtn" onClick={() => void ask()} disabled={loading}>
            {loading ? "ASSIST AI is responding..." : "Ask ASSIST AI"}
          </button>
          <span className="chatHint">Best for recruiter summaries, skills, projects, and current work.</span>
        </div>

        {err && <div className="chatError">{err}</div>}

        {ans && (
          <div className="chatTranscript">
            <div className="chatBubble chatBubbleUser">
              <span className="bubbleLabel">Question</span>
              <p>{q}</p>
            </div>
            <div className="chatBubble chatBubbleAssistant">
              <span className="bubbleLabel">ASSIST AI</span>
              <div className="chatAnswer">{ans}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
