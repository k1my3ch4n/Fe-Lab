"use client";

import { useState } from "react";
import { ARIA_EXAMPLES } from "../constants";

interface UseAriaTabOptions {
  addLog: (text: string) => void;
}

export function useAriaTab({ addLog }: UseAriaTabOptions) {
  const [ariaExpanded, setAriaExpanded] = useState(false);

  const reset = () => {
    setAriaExpanded(false);
  };

  const handleAriaToggle = () => {
    const next = !ariaExpanded;
    setAriaExpanded(next);
    addLog(
      next
        ? '✅ aria-expanded="true" → 메뉴 펼침 상태 전달'
        : '⬜ aria-expanded="false" → 메뉴 닫힘 상태 전달',
    );
  };

  const content = (
    <>
      <button
        onClick={handleAriaToggle}
        className="self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-2 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
        aria-expanded={ariaExpanded}
        aria-controls="demo-menu"
      >
        메뉴 {ariaExpanded ? "닫기" : "열기"} (aria-expanded=
        {String(ariaExpanded)})
      </button>

      <div className="grid grid-cols-2 gap-4">
        {ARIA_EXAMPLES.map((example) => (
          <div key={example.id}>
            <div
              className={`font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider mb-2 ${
                example.id === "after"
                  ? "text-accent-green"
                  : "text-accent-magenta"
              }`}
            >
              {example.label}
            </div>
            <pre
              className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto ${
                example.id === "after"
                  ? "text-accent-green"
                  : "text-accent-magenta"
              }`}
            >
              {example.html}
            </pre>
            {example.issues.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {example.issues.map((issue, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta"
                  >
                    ⚠️ {issue}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live ARIA demo */}
      <div
        id="demo-menu"
        role="navigation"
        aria-hidden={!ariaExpanded}
        className={`bg-bg-deep rounded-lg border border-border-subtle p-4 transition-all duration-300 ${
          ariaExpanded
            ? "opacity-100 max-h-[200px]"
            : "opacity-30 max-h-[40px] overflow-hidden"
        }`}
      >
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-2">
          aria-hidden={String(!ariaExpanded)}
        </div>
        <div className="flex gap-2">
          {["홈", "소개", "서비스"].map((item) => (
            <button
              key={item}
              role="menuitem"
              tabIndex={ariaExpanded ? 0 : -1}
              onClick={() => addLog(`✅ "${item}" 클릭 (role="menuitem")`)}
              className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded border border-border-subtle text-text-secondary bg-bg-surface cursor-pointer hover:border-accent-cyan hover:text-accent-cyan transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return { content, reset };
}
