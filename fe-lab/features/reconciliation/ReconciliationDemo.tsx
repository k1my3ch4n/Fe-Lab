"use client";

import { useState } from "react";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import { RECONCILIATION_SCENARIOS } from "./constants";
import type { DomOperation } from "./types";
import TreeNodeView from "./components/TreeNodeView";

export default function ReconciliationDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = RECONCILIATION_SCENARIOS[activeScenario];
  const operations = scenario.operations;

  const reset = () => {
    stopPlay();
    setCurrentStep(-1);
  };

  const handleScenarioChange = (index: number) => {
    setActiveScenario(index);
    reset();
  };

  const handleStep = () => {
    if (currentStep < operations.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const [playTimerId, setPlayTimerId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const stopPlay = () => {
    if (playTimerId) {
      clearTimeout(playTimerId);
      setPlayTimerId(null);
    }
    setIsPlaying(false);
  };

  const handlePlay = () => {
    stopPlay();
    setIsPlaying(true);
    const totalSteps = operations.length;
    let step = 0;
    setCurrentStep(0);

    const tick = () => {
      step += 1;
      if (step >= totalSteps) {
        setIsPlaying(false);
        setPlayTimerId(null);
        return;
      }
      setCurrentStep(step);
      setPlayTimerId(setTimeout(tick, 800));
    };

    setPlayTimerId(setTimeout(tick, 800));
  };

  // Build highlight maps based on current step
  const oldHighlightMap = new Map<string, { color: string; action: string }>();
  const newHighlightMap = new Map<string, { color: string; action: string }>();

  for (let i = 0; i <= currentStep; i++) {
    const h = scenario.highlights[i];
    if (h) {
      if (["updated", "removed", "reused"].includes(h.action)) {
        oldHighlightMap.set(h.nodeTag, { color: h.color, action: h.action });
      }
      if (["updated", "inserted", "reused"].includes(h.action)) {
        newHighlightMap.set(h.nodeTag, { color: h.color, action: h.action });
      }
    }
  }

  const visibleOps: DomOperation[] = operations.slice(0, currentStep + 1);

  const tabs = RECONCILIATION_SCENARIOS.map((s) => ({
    id: s.id,
    label: s.label,
  }));

  const rightPanel = (
    <>
      <PanelHeader label="제어" onReset={reset} />

      {/* Controls */}
      <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
        <ActionButton variant="cyan" onClick={handlePlay} disabled={isPlaying}>
          {isPlaying ? "재생 중..." : "자동 재생"}
        </ActionButton>
        <ActionButton
          variant="green"
          onClick={handleStep}
          disabled={isPlaying || currentStep >= operations.length - 1}
        >
          다음 단계 ({currentStep + 1}/{operations.length})
        </ActionButton>
      </div>

      {/* Step info */}
      <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
        {visibleOps.length === 0 ? (
          <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
            버튼을 클릭하여
            <br />
            재조정 과정을 확인하세요
          </div>
        ) : (
          visibleOps.map((op, i) => (
            <div
              key={i}
              className="px-2 py-1.5 rounded mb-1 animate-[logSlide_0.3s_ease]"
              style={{ color: op.color }}
            >
              <span className="font-bold">{op.type}</span>{" "}
              <span className="text-text-muted">{op.target}</span>
              <br />
              <span className="text-text-secondary text-[10px]">
                {op.detail}
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={tabs}
        activeIndex={activeScenario}
        onTabChange={handleScenarioChange}
      />

      <DemoLayout rightPanel={rightPanel}>
        {/* Description */}
        <div className="text-[12px] text-text-secondary bg-bg-deep rounded-lg px-4 py-3 leading-[1.8]">
          {scenario.description}
        </div>

        {/* Side by side trees */}
        <div className="grid grid-cols-2 gap-4">
          {/* Old Tree */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#ff2d8a" }}
              />
              Old Tree
            </div>
            <TreeNodeView
              node={scenario.oldTree}
              highlightMap={oldHighlightMap}
              side="old"
            />
          </div>

          {/* New Tree */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#00e676" }}
              />
              New Tree
            </div>
            <TreeNodeView
              node={scenario.newTree}
              highlightMap={newHighlightMap}
              side="new"
            />
          </div>
        </div>

        {/* DOM Operations Log */}
        <div>
          <SectionHeader>DOM Operations</SectionHeader>
          <div className="flex flex-col gap-1.5">
            {operations.map((op, i) => (
              <div
                key={i}
                className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] rounded-lg px-3 py-2 transition-all duration-500"
                style={{
                  opacity: i <= currentStep ? 1 : 0.2,
                  background:
                    i <= currentStep ? `${op.color}10` : "transparent",
                  borderLeft: `2px solid ${
                    i <= currentStep ? op.color : "transparent"
                  }`,
                }}
              >
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: op.color,
                    background: `${op.color}20`,
                  }}
                >
                  {op.type}
                </span>
                <span className="text-text-muted">{op.target}</span>
                <span className="text-text-secondary">{op.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
