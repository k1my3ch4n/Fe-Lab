"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@shared/ui/icons";

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
        className="w-full px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-bg-hover bg-transparent border-none text-left"
      >
        <div className="text-sm font-medium text-text-primary flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold w-6 h-6 rounded-md flex items-center justify-center bg-accent-magenta-dim text-accent-magenta shrink-0">
            Q{index}
          </span>
          {question}
        </div>
        <span
          className={`text-text-muted transition-transform duration-300 shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pl-[58px] text-[13px] text-text-secondary leading-[1.8]">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
