"use client";

import { useState } from "react";
import { SectionHeader } from "@shared/ui";
import {
  CSS_PROPERTIES,
  PIPELINE_STAGES,
  CATEGORY_META,
  COST_META,
} from "./constants";
import type { CSSPropertyInfo, PipelineStage } from "./types";
import { useTimers } from "@shared/hooks";

export default function ReflowRepaintDemo() {
  const [activeProperty, setActiveProperty] = useState<CSSPropertyInfo>(
    CSS_PROPERTIES[0],
  );
  const [animating, setAnimating] = useState(false);
  const { addTimer, clearTimers } = useTimers();

  const handlePropertyClick = (prop: CSSPropertyInfo) => {
    setActiveProperty(prop);
    setAnimating(true);
    clearTimers();
    addTimer(() => setAnimating(false), 600);
  };

  const isStageTriggered = (stage: PipelineStage) =>
    activeProperty.triggeredStages.includes(stage);

  const stageColor = (stage: PipelineStage) => {
    if (!isStageTriggered(stage)) {
      return {
        bg: "var(--accent-green-dim)",
        border: "var(--accent-green-dim)",
        text: "var(--accent-green)",
      };
    }

    return {
      bg: "#ffb80022",
      border: "#ffb80066",
      text: "var(--accent-amber)",
    };
  };

  const costMeta = COST_META[activeProperty.cost];

  const boxStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: 80,
      height: 80,
      borderRadius: 8,
      background: "var(--accent-cyan-dim)",
      border: "2px solid #00e5ff44",
      transition: "all 0.4s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    if (!animating) {
      return base;
    }

    switch (activeProperty.category) {
      case "layout":
        return { ...base, width: 120, height: 100, margin: 8 };
      case "paint":
        return {
          ...base,
          background: "var(--accent-magenta-dim)",
          border: "2px solid #ff2d8a66",
          boxShadow: "0 0 20px var(--accent-magenta-dim)",
        };
      case "composite":
        return {
          ...base,
          transform: "scale(1.2) rotate(5deg)",
          opacity: 0.7,
        };
    }
  };

  return (
    <>
      {/* Category tabs */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["layout", "paint", "composite"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              const first = CSS_PROPERTIES.find((p) => p.category === cat);
              if (first) handlePropertyClick(first);
            }}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeProperty.category === cat
                ? "bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
            style={{
              borderColor:
                activeProperty.category === cat
                  ? CATEGORY_META[cat].color
                  : "transparent",
              color:
                activeProperty.category === cat
                  ? CATEGORY_META[cat].color
                  : undefined,
            }}
          >
            {CATEGORY_META[cat].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Pipeline + Box */}
        <div className="p-6 flex flex-col gap-5">
          {/* Pipeline visualization */}
          <div>
            <SectionHeader>Rendering Pipeline</SectionHeader>
            <div className="flex items-center gap-2">
              {PIPELINE_STAGES.map((stage, i) => {
                const colors = stageColor(stage.id);
                const triggered = isStageTriggered(stage.id);
                return (
                  <div key={stage.id} className="flex items-center gap-2">
                    <div
                      className="rounded-lg border px-4 py-3 transition-all duration-300 text-center min-w-[90px]"
                      style={{
                        background: colors.bg,
                        borderColor: colors.border,
                      }}
                    >
                      <div
                        className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                        style={{ color: colors.text }}
                      >
                        {stage.label}
                      </div>
                      <div
                        className="font-[family-name:var(--font-mono)] text-[9px] mt-1"
                        style={{ color: colors.text, opacity: 0.7 }}
                      >
                        {triggered ? "실행됨" : "건너뜀"}
                      </div>
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <span className="text-text-muted text-xs">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample box */}
          <div>
            <SectionHeader>Sample Element</SectionHeader>
            <div className="bg-bg-deep rounded-lg p-8 flex items-center justify-center min-h-[160px]">
              <div style={boxStyle()}>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan">
                  Box
                </span>
              </div>
            </div>
          </div>

          {/* Performance indicator */}
          <div className="flex items-center gap-3 bg-bg-deep rounded-lg px-4 py-3">
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
              성능 영향
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: costMeta.color }}
              />
              <span
                className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                style={{ color: costMeta.color }}
              >
                {costMeta.label}
              </span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted ml-2">
              — {activeProperty.label} 변경 시{" "}
              {activeProperty.triggeredStages.length}단계 실행
            </div>
          </div>
        </div>

        {/* Right: Property selector */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              CSS 속성 선택
            </span>
          </div>

          <div className="p-3 flex flex-col gap-1.5 overflow-y-auto flex-1">
            {CSS_PROPERTIES.map((prop) => {
              const meta = CATEGORY_META[prop.category];
              const isActive = activeProperty.name === prop.name;
              return (
                <button
                  key={prop.name}
                  onClick={() => handlePropertyClick(prop)}
                  className={`w-full text-left font-[family-name:var(--font-mono)] text-[12px] px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-bg-surface"
                      : "bg-transparent hover:bg-bg-surface"
                  }`}
                  style={{
                    borderColor: isActive ? `${meta.color}66` : "transparent",
                    color: isActive ? meta.color : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={isActive ? "" : "text-text-primary"}>
                      {prop.label}
                    </span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        background: `${meta.color}22`,
                        color: meta.color,
                      }}
                    >
                      {prop.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="p-3 border-t border-border-subtle">
            <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase tracking-wider mb-2">
              파이프라인 상태
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-amber" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                  실행됨 (비용 발생)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                  건너뜀 (최적화)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
