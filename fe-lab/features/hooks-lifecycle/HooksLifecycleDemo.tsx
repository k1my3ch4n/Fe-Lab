"use client";

import { useState } from "react";
import { TabBar, DemoLayout, PanelHeader, ActionButton } from "@shared/ui";
import { PHASES } from "./constants";
import { usePhaseAnimation } from "./hooks/usePhaseAnimation";
import ComparisonView from "./components/ComparisonView";

type Tab = "timeline" | "comparison";

export default function HooksLifecycleDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("timeline");

  const {
    activePhase,
    logs,
    animatingIndex,
    isAnimating,
    phaseTimings,
    animatePhase,
    reset,
    selectPhase,
  } = usePhaseAnimation();

  const tabs = [
    { id: "timeline" as Tab, label: "실행 타임라인" },
    { id: "comparison" as Tab, label: "Class vs Hooks" },
  ];

  const tabIndex = activeTab === "timeline" ? 0 : 1;

  const handleTabChange = (index: number) => {
    setActiveTab(index === 0 ? "timeline" : "comparison");
    reset();
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
              <PanelHeader label="실행" onReset={reset} />

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
                onClick={() => selectPhase(phase.id)}
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
                    borderLeft: `3px solid ${isActive ? timing.color : "var(--color-text-muted)"}`,
                  }}
                >
                  {/* Order number */}
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${timing.color}30` : "#1a1a2e",
                      color: isActive
                        ? timing.color
                        : "var(--color-text-muted)",
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
                    style={{
                      color: isActive
                        ? timing.color
                        : "var(--color-text-muted)",
                    }}
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
        <ComparisonView />
      )}
    </>
  );
}
