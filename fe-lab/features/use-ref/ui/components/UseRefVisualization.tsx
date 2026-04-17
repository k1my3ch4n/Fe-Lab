"use client";

import { SectionHeader, InfoCard } from "@shared/ui";

interface UseRefVisualizationProps {
  activeExample: number;
  stateCount: number;
  renderCount: number;
  refDisplay: number;
  inputRef: { current: HTMLInputElement | null };
  inputValue: number;
  prevDisplay: number | undefined;
}

export function UseRefVisualization({
  activeExample,
  stateCount,
  renderCount,
  refDisplay,
  inputRef,
  inputValue,
  prevDisplay,
}: UseRefVisualizationProps) {
  if (activeExample === 0) {
    return (
      <div>
        <SectionHeader>Value Comparison</SectionHeader>
        <div className="flex gap-4">
          <InfoCard label="useState" value={stateCount} color="#00e5ff" />
          <InfoCard label="useRef" value={refDisplay} color="#b388ff" />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex-1 font-[family-name:var(--font-mono)] text-[9px] text-text-muted pl-3">
            렌더링 횟수: {renderCount}
          </div>
          <div className="flex-1 font-[family-name:var(--font-mono)] text-[9px] text-text-muted pl-3">
            리렌더링 없음
          </div>
        </div>
      </div>
    );
  }

  if (activeExample === 1) {
    return (
      <div>
        <SectionHeader>DOM Reference</SectionHeader>
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: "var(--accent-green-dim)",
            background: "var(--accent-green-dim)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="useRef로 포커스 대상"
            className="w-full bg-bg-deep text-text-primary font-[family-name:var(--font-mono)] text-[12px] px-3 py-2 rounded border border-border-subtle outline-none focus:border-accent-cyan transition-colors"
          />
        </div>
      </div>
    );
  }

  if (activeExample === 2) {
    return (
      <div>
        <SectionHeader>Previous Value Tracking</SectionHeader>
        <div className="flex gap-4">
          <InfoCard label="현재 값" value={inputValue} color="#00e5ff" />
          <InfoCard
            label="이전 값 (ref)"
            value={prevDisplay ?? "—"}
            color="#ffb800"
          />
        </div>
      </div>
    );
  }

  return null;
}
