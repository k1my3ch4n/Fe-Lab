"use client";

import { useState } from "react";

interface InterviewCardProps {
  index: number;
  question: string;
  children: React.ReactNode;
}

export default function InterviewCard({
  index,
  question,
  children,
}: InterviewCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-bg-surface border border-border-subtle rounded-[var(--radius)] overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-bg-hover bg-transparent border-none text-left"
      >
        <div className="text-sm font-medium text-text-primary flex items-center gap-2.5">
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold w-6 h-6 rounded-md flex items-center justify-center bg-accent-magenta-dim text-accent-magenta shrink-0">
            Q{index}
          </span>
          {question}
        </div>
        <span
          className={`text-lg text-text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${open ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="px-5 pb-5 pl-[54px] text-[13px] text-text-secondary leading-[1.8]">
          {children}
        </div>
      </div>
    </article>
  );
}
