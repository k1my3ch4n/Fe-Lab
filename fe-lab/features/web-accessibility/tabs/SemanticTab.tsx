"use client";

import { useState } from "react";
import { SEMANTIC_COMPARISON } from "../constants";
import { SectionHeader } from "@shared/ui";

interface UseSemanticTabOptions {
  addLog: (text: string) => void;
}

export function useSemanticTab({ addLog }: UseSemanticTabOptions) {
  const [showGoodVersion, setShowGoodVersion] = useState(false);

  const reset = () => {
    setShowGoodVersion(false);
  };

  const handleToggle = () => {
    const next = !showGoodVersion;
    setShowGoodVersion(next);
    addLog(
      next
        ? "✅ 시맨틱 HTML 적용 — 스크린 리더가 구조를 인식"
        : "⬜ div만 사용 — 스크린 리더가 구조를 인식 못함",
    );
  };

  const content = (
    <>
      <button
        onClick={handleToggle}
        className={`self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
          showGoodVersion
            ? "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
            : "border-accent-magenta text-accent-magenta bg-accent-magenta-dim hover:bg-[#ff2d8a33]"
        }`}
      >
        {showGoodVersion ? "✅ 시맨틱 HTML" : "❌ div 남용"} 보기
      </button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-2">
            {SEMANTIC_COMPARISON.bad.label}
          </div>
          <pre
            className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto transition-opacity duration-300 ${
              showGoodVersion ? "opacity-40" : "opacity-100"
            }`}
          >
            <code className="text-accent-magenta">
              {SEMANTIC_COMPARISON.bad.code}
            </code>
          </pre>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-2">
            {SEMANTIC_COMPARISON.good.label}
          </div>
          <pre
            className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto transition-opacity duration-300 ${
              showGoodVersion ? "opacity-100" : "opacity-40"
            }`}
          >
            <code className="text-accent-green">
              {SEMANTIC_COMPARISON.good.code}
            </code>
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div>
        <SectionHeader>스크린 리더 인식 결과</SectionHeader>
        <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
          {showGoodVersion ? (
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green leading-[2]">
              <div>📢 banner: &quot;사이트명&quot; (heading level 1)</div>
              <div>📢 navigation: 2개 링크 발견</div>
              <div>📢 main: article &quot;제목&quot; (heading level 2)</div>
              <div>📢 contentinfo: &quot;© 2024&quot;</div>
            </div>
          ) : (
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta leading-[2]">
              <div>📢 group: &quot;사이트명&quot; (구조 불명)</div>
              <div>📢 group: &quot;홈&quot; &quot;소개&quot; (역할 불명)</div>
              <div>
                📢 group: &quot;제목&quot; &quot;본문...&quot; (역할 불명)
              </div>
              <div>📢 group: &quot;© 2024&quot; (역할 불명)</div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return { content, reset };
}
