"use client";

import { useState } from "react";
import { SectionHeader } from "@shared/ui";
import {
  CSS_PROPERTIES,
  PIPELINE_STAGES,
  CATEGORY_META,
  COST_META,
} from "../model/constants";
import type { CSSPropertyInfo } from "../model/types";
import { useTimers } from "@shared/hooks";
import {
  PipelineVisualization,
  SampleElementBox,
  PropertySelectorPanel,
} from "./components";

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
            className={`font-mono text-label px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] lg:min-h-[420px]">
        {/* Left: Pipeline + Box */}
        <div className="p-6 flex flex-col gap-5">
          {/* Pipeline visualization */}
          <div>
            <SectionHeader>Rendering Pipeline</SectionHeader>
            <PipelineVisualization
              stages={PIPELINE_STAGES}
              triggeredStages={activeProperty.triggeredStages}
            />
          </div>

          {/* Sample box */}
          <div>
            <SectionHeader>Sample Element</SectionHeader>
            <SampleElementBox style={boxStyle()} />
          </div>

          {/* Performance indicator */}
          <div className="flex items-center gap-3 bg-bg-deep rounded-lg px-4 py-3">
            <div className="font-mono text-caption text-text-muted uppercase tracking-wider">
              성능 영향
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: costMeta.color }}
              />
              <span
                className="font-mono text-label font-semibold"
                style={{ color: costMeta.color }}
              >
                {costMeta.label}
              </span>
            </div>
            <div className="font-mono text-caption text-text-muted ml-2">
              — {activeProperty.label} 변경 시{" "}
              {activeProperty.triggeredStages.length}단계 실행
            </div>
          </div>
        </div>

        {/* Right: Property selector */}
        <PropertySelectorPanel
          properties={CSS_PROPERTIES}
          activeProperty={activeProperty}
          onPropertyClick={handlePropertyClick}
        />
      </div>
    </>
  );
}
