"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

interface CodeExample {
  title: string;
  code: string;
  language?: string;
}

interface CodeSectionProps {
  examples: CodeExample[];
}

export default function CodeSection({ examples }: CodeSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mb-14">
      <SectionLabel number="03" label="Code Example" variant="code" />
      <h2 className="font-display text-[28px] font-bold tracking-tight mb-3">
        코드 예시
      </h2>
      <p className="text-sm text-text-secondary leading-[1.7] max-w-full lg:max-w-[700px]">
        실제 코드로 동작 원리를 확인하세요.
      </p>
      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius)] mt-6 overflow-hidden">
        {/* Tabs */}
        <div
          role="tablist"
          className="flex gap-0 border-b border-border-subtle bg-bg-elevated"
        >
          {examples.map((ex, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeTab}
              onClick={() => setActiveTab(i)}
              className={`
                font-mono text-[11px] px-4 py-3
                border-b-2 transition-all duration-200 cursor-pointer
                ${
                  i === activeTab
                    ? "border-accent-green text-accent-green bg-bg-surface"
                    : "border-transparent text-text-muted hover:text-text-secondary"
                }
              `}
            >
              {ex.title}
            </button>
          ))}
        </div>
        {/* Code block */}
        <pre className="p-5 overflow-x-auto">
          <code className="font-mono text-[12px] leading-[1.8] text-accent-cyan">
            {examples[activeTab].code}
          </code>
        </pre>
      </div>
    </section>
  );
}
