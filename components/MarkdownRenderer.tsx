import React from "react";

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function MarkdownRenderer({
  content,
  size = "normal",
}: {
  content: string;
  size?: "normal" | "compact";
}) {
  const cls = size === "compact" ? "md md--compact" : "md";
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let counter = 0;

  const k = () => counter++;

  const flushList = () => {
    if (!listItems.length) return;
    elements.push(
      <ul key={k()} className="mdList">
        {listItems.map((item, i) => (
          <li key={i}>{parseBold(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <p key={k()} className="mdLabel">
          {parseBold(line.slice(4))}
        </p>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <p key={k()} className="mdSubheading">
          {parseBold(line.slice(3))}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      elements.push(
        <p key={k()} className="mdPara">
          {parseBold(line)}
        </p>
      );
    }
  }

  flushList();

  return <div className={cls}>{elements}</div>;
}
