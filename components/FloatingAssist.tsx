"use client";
import { useState, useEffect, useRef } from "react";

const quickPrompts = [
  "What AI and ML skills do you have?",
  "Summarize your background in 5 lines.",
  "Describe your RAG pipeline project.",
  "What roles are you targeting?",
];

export default function FloatingAssist() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // Scroll answer into view
  useEffect(() => {
    if (ans || err) answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [ans, err]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  async function ask(questionOverride?: string) {
    const question = questionOverride ?? q;
    if (!question.trim()) return;
    setErr("");
    setAns("");
    setLoading(true);
    try {
      const res = await fetch("/api/resume-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data?.error || "Something went wrong");
      else { setAns(data.answer); if (!questionOverride) setQ(question); }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop — click outside to close */}
      {open && <div className="floatBackdrop" onClick={() => setOpen(false)} aria-hidden="true" />}

      {/* Chat panel */}
      <div className={`floatPanel${open ? " floatPanelOpen" : ""}`} role="dialog" aria-label="ASSIST AI chat">
        {/* Header */}
        <div className="floatHeader">
          <div className="floatBrand">
            <span className="floatEyebrow">ASSIST AI</span>
            <p className="floatHeading">Ask me anything</p>
          </div>
          <button className="floatClose" onClick={() => setOpen(false)} aria-label="Close ASSIST AI">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Quick prompts */}
        <div className="floatChips">
          {quickPrompts.map((p) => (
            <button
              key={p}
              className="floatChip"
              onClick={() => { setQ(p); void ask(p); }}
              disabled={loading}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="floatInputRow">
          <input
            ref={inputRef}
            className="floatInput"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask about skills, AI projects, experience…"
            onKeyDown={(e) => { if (e.key === "Enter") void ask(); }}
            disabled={loading}
          />
          <button className="floatSend" onClick={() => void ask()} disabled={loading || !q.trim()} aria-label="Send">
            {loading ? (
              <span className="floatSpinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9.5 3.5L14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Error */}
        {err && <div className="floatError">{err}</div>}

        {/* Answer */}
        {ans && (
          <div className="floatAnswer" ref={answerRef}>
            <span className="floatAnswerLabel">ASSIST AI</span>
            <p className="floatAnswerText">{ans}</p>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        className={`floatBtn${open ? " floatBtnOpen" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close ASSIST AI" : "Open ASSIST AI"}
        title="ASSIST AI"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1.5L14.09 8.26H21L15.45 12.24L17.55 19L12 15.02L6.45 19L8.55 12.24L3 8.26H9.91L12 1.5Z"/>
            <circle cx="19" cy="4" r="2" opacity="0.6"/>
            <circle cx="5" cy="19" r="1.5" opacity="0.4"/>
          </svg>
        )}
      </button>
    </>
  );
}
