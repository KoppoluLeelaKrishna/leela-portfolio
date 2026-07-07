import type { Metadata } from "next";
import AIGame from "@/components/AIGame";

export const metadata: Metadata = {
  title: "AI/ML Gauntlet — Learning Game | Leela Krishna Koppolu",
  description:
    "A fast, arcade-style quiz game covering the full AI/ML engineering stack — ML foundations, deep learning, LLMs & GenAI, MLOps, math, NLP and computer vision. Learn while you play.",
};

const concepts = [
  { icon: "🧠", label: "ML Foundations" },
  { icon: "🕸️", label: "Deep Learning" },
  { icon: "🤖", label: "LLMs & GenAI" },
  { icon: "⚙️", label: "MLOps & Data Eng" },
  { icon: "📐", label: "Math & Stats" },
  { icon: "👁️", label: "NLP & Vision" },
  { icon: "🚀", label: "Projects & Stack" },
  { icon: "🎯", label: "Interview Prep" },
];

export default function GamePage() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">Play &amp; Learn</p>
          <h1 className="pageTitle">The AI/ML Engineer Gauntlet.</h1>
          <p className="sectionBody narrow">
            A quick, arcade-style quiz that covers the concepts an AI/ML engineer works with every day —
            from bias–variance and backprop to attention, RAG, feature stores, and model drift. Build a
            streak, race the timer, and read the explanation after every question. Made for learning, tuned
            for fun.
          </p>
          <div className="gameConceptRow">
            {concepts.map((c) => (
              <span className="gameConceptChip" key={c.label}>
                <span aria-hidden="true">{c.icon}</span> {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AIGame />
    </div>
  );
}
