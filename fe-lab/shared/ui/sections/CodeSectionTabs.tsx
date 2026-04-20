"use client";

import { useState } from "react";

interface HighlightedExample {
  title: string;
  html: string;
}

interface CodeSectionTabsProps {
  examples: HighlightedExample[];
}

export default function CodeSectionTabs({ examples }: CodeSectionTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius)] mt-6 overflow-hidden">
      <div
        role="tablist"
        className="flex gap-0 border-b border-border-subtle bg-bg-elevated"
      >
        {examples.map((example, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeTab}
            onClick={() => setActiveTab(i)}
            className={`
              font-mono text-label px-4 py-3
              border-b-2 transition-all duration-200 cursor-pointer
              ${
                i === activeTab
                  ? "border-accent-green text-accent-green bg-bg-surface"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              }
            `}
          >
            {example.title}
          </button>
        ))}
      </div>
      <div
        className="p-5 overflow-x-auto text-[12px] leading-[1.8] [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: examples[activeTab].html }}
      />
    </div>
  );
}
