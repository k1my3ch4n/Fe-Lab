"use client";

import { useState, useCallback } from "react";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import {
  PHASES,
  HOOK_TIMINGS,
  CLASS_TO_HOOKS_MAP,
  type Phase,
} from "./constants";

type Tab = "timeline" | "comparison";

interface LogEntry {
  hook: string;
  color: string;
  phase: Phase;
  order: number;
}

export default function HooksLifecycleDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("timeline");
  const [activePhase, setActivePhase] = useState<Phase>("mount");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [animatingIndex, setAnimatingIndex] = useState<number>(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const phaseTimings = HOOK_TIMINGS.filter((h) => h.phase === activePhase);

  const animatePhase = useCallback(
    (phase: Phase) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActivePhase(phase);
      setLogs([]);
      setAnimatingIndex(-1);

      const timings = HOOK_TIMINGS.filter((h) => h.phase === phase);

      timings.forEach((timing, i) => {
        setTimeout(
          () => {
            setAnimatingIndex(i);
            setLogs((prev) => [
              ...prev,
              {
                hook: timing.hook,
                color: timing.color,
                phase: timing.phase,
                order: timing.order,
              },
            ]);
            if (i === timings.length - 1) {
              setTimeout(() => setIsAnimating(false), 300);
            }
          },
          (i + 1) * 400,
        );
      });
    },
    [isAnimating],
  );

  const handleReset = () => {
    setLogs([]);
    setAnimatingIndex(-1);
    setIsAnimating(false);
  };

  const tabs = [
    { id: "timeline" as Tab, label: "실행 타임라인" },
    { id: "comparison" as Tab, label: "Class vs Hooks" },
  ];

  const tabIndex = activeTab === "timeline" ? 0 : 1;

  const handleTabChange = (index: number) => {
    setActiveTab(index === 0 ? "timeline" : "comparison");
    handleReset();
  };

  return (
    <>
      {/* Tab bar */}
      <TabBar
        tabs={tabs}
        activeIndex={tabIndex}
        onTabChange={handleTabChange}
      />

      {activeTab === "timeline" ? (
        <DemoLayout
          rightPanel={
            <>
              <PanelHeader label="실행" onReset={handleReset} />

              {/* Action buttons */}
              <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
                <ActionButton
                  variant="green"
                  onClick={() => animatePhase("mount")}
                  disabled={isAnimating}
                >
                  Mount 실행
                </ActionButton>
                <ActionButton
                  variant="amber"
                  onClick={() => animatePhase("update")}
                  disabled={isAnimating}
                >
                  State Update 실행
                </ActionButton>
                <ActionButton
                  variant="magenta"
                  onClick={() => animatePhase("unmount")}
                  disabled={isAnimating}
                >
                  Unmount 실행
                </ActionButton>
              </div>

              {/* Log */}
              <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
                {logs.length === 0 ? (
                  <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                    버튼을 클릭하여
                    <br />훅 실행 순서를 확인하세요
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease]"
                      style={{ color: log.color }}
                    >
                      <span className="text-text-muted mr-1.5">
                        {log.order}.
                      </span>
                      {log.hook}
                    </div>
                  ))
                )}
              </div>
            </>
          }
        >
          {/* Phase selector */}
          <div className="flex gap-2">
            {PHASES.map((phase) => (
              <button
                key={phase.id}
                onClick={() => {
                  setActivePhase(phase.id);
                  handleReset();
                }}
                className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer ${
                  activePhase === phase.id
                    ? "bg-bg-surface"
                    : "border-border-subtle text-text-muted hover:text-text-secondary"
                }`}
                style={
                  activePhase === phase.id
                    ? {
                        borderColor: `${phase.color}66`,
                        color: phase.color,
                        background: `${phase.color}15`,
                      }
                    : undefined
                }
              >
                {phase.label}
              </button>
            ))}
          </div>

          {/* Phase description */}
          <div className="text-[12px] text-text-muted font-[family-name:var(--font-mono)]">
            {PHASES.find((p) => p.id === activePhase)?.description}
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-1">
            {phaseTimings.map((timing, i) => {
              const isActive = logs.some(
                (l) => l.hook === timing.hook && l.phase === timing.phase,
              );
              const isCurrent = animatingIndex === i;
              return (
                <div
                  key={`${timing.phase}-${timing.order}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300"
                  style={{
                    background: isCurrent
                      ? `${timing.color}18`
                      : isActive
                        ? `${timing.color}08`
                        : "transparent",
                    borderLeft: `3px solid ${isActive ? timing.color : "#333"}`,
                  }}
                >
                  {/* Order number */}
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${timing.color}30` : "#1a1a2e",
                      color: isActive ? timing.color : "#555",
                      boxShadow: isCurrent
                        ? `0 0 8px ${timing.color}40`
                        : "none",
                    }}
                  >
                    {timing.order}
                  </span>

                  {/* Hook name */}
                  <span
                    className="font-[family-name:var(--font-mono)] text-[12px] font-semibold min-w-[180px] transition-all duration-300"
                    style={{ color: isActive ? timing.color : "#555" }}
                  >
                    {timing.hook}
                  </span>

                  {/* Description */}
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] transition-all duration-300"
                    style={{
                      color: isActive
                        ? "var(--text-secondary)"
                        : "var(--text-muted)",
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    {timing.description}
                  </span>
                </div>
              );
            })}
          </div>
        </DemoLayout>
      ) : (
        /* Comparison tab: Class Lifecycle vs Hooks */
        <div className="p-6">
          <SectionHeader>Class Lifecycle vs Hooks 매핑</SectionHeader>

          <div className="rounded-lg border border-border-subtle overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1.2fr] bg-bg-elevated border-b border-border-subtle">
              <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta font-semibold uppercase tracking-wider">
                Class Method
              </div>
              <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan font-semibold uppercase tracking-wider">
                Hook Equivalent
              </div>
              <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-text-muted font-semibold uppercase tracking-wider">
                설명
              </div>
            </div>

            {/* Rows */}
            {CLASS_TO_HOOKS_MAP.map((mapping, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr_1.2fr] transition-all duration-200 hover:bg-bg-surface ${
                  i < CLASS_TO_HOOKS_MAP.length - 1
                    ? "border-b border-border-subtle"
                    : ""
                }`}
              >
                <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
                  {mapping.classMethod}
                </div>
                <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan">
                  {mapping.hookEquivalent}
                </div>
                <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
                  {mapping.description}
                </div>
              </div>
            ))}
          </div>

          {/* Visual flow diagram */}
          <div className="mt-8">
            <SectionHeader>Hooks 실행 흐름</SectionHeader>
            <div className="flex items-center gap-2 flex-wrap">
              {(
                [
                  { label: "useState init", color: "#00e5ff" },
                  { label: "useMemo", color: "#b388ff" },
                  { label: "Render", color: "#ffffff" },
                  { label: "DOM Update", color: "#888" },
                  { label: "useLayoutEffect", color: "#ff2d8a" },
                  { label: "Paint", color: "#888" },
                  { label: "useEffect", color: "#00e676" },
                ] as const
              ).map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded-md border"
                    style={{
                      color: step.color,
                      borderColor: `${step.color}44`,
                      background: `${step.color}10`,
                    }}
                  >
                    {step.label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-text-muted text-[10px]">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
