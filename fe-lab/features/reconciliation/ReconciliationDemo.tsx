"use client";

import { useState } from "react";
import {
  RECONCILIATION_SCENARIOS,
  type TreeNode,
  type DomOperation,
} from "./constants";

function TreeNodeView({
  node,
  depth = 0,
  highlightMap,
  side,
}: {
  node: TreeNode;
  depth?: number;
  highlightMap: Map<string, { color: string; action: string }>;
  side: "old" | "new";
}) {
  const nodeKey =
    node.key != null ? `${node.tag}[key="${node.key}"]` : node.tag;
  const highlight = highlightMap.get(nodeKey);

  const borderColor = highlight ? `${highlight.color}88` : "#ffffff10";
  const bgColor = highlight ? `${highlight.color}15` : "transparent";

  const actionLabels: Record<string, string> = {
    compared: "비교",
    updated: "업데이트",
    replaced: "교체",
    reused: "재사용",
    removed: "삭제",
    inserted: "삽입",
  };

  const showBadge =
    highlight &&
    ((side === "old" &&
      ["updated", "removed", "reused"].includes(highlight.action)) ||
      (side === "new" &&
        ["updated", "inserted", "reused"].includes(highlight.action)));

  return (
    <div
      className="rounded-lg border p-2.5 transition-all duration-500"
      style={{
        borderColor,
        background: bgColor,
        marginLeft: `${depth * 12}px`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
          style={{ color: highlight?.color ?? "#ffffff88" }}
        >
          {"<"}
          {node.tag}
          {node.key != null && (
            <span className="text-accent-amber">
              {" "}
              key=&quot;{node.key}&quot;
            </span>
          )}
          {">"}
        </span>
        {showBadge && (
          <span
            className="font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-0.5 rounded-full"
            style={{
              background: `${highlight.color}25`,
              color: highlight.color,
            }}
          >
            {actionLabels[highlight.action] ?? highlight.action}
          </span>
        )}
      </div>

      {node.props && (
        <div className="mt-1 flex flex-wrap gap-1">
          {Object.entries(node.props).map(([k, v]) => (
            <span
              key={k}
              className="font-[family-name:var(--font-mono)] text-[9px] bg-bg-deep px-1.5 py-0.5 rounded text-text-muted"
            >
              {k}=&quot;{v}&quot;
            </span>
          ))}
        </div>
      )}

      {node.text && (
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mt-1 pl-2">
          &quot;{node.text}&quot;
        </div>
      )}

      {node.children && (
        <div className="flex flex-col gap-1.5 mt-2">
          {node.children.map((child, i) => (
            <TreeNodeView
              key={child.key ?? i}
              node={child}
              depth={depth + 1}
              highlightMap={highlightMap}
              side={side}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {RECONCILIATION_SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeScenario
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Tree Comparison */}
        <div className="p-6 flex flex-col gap-5">
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
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              DOM Operations
            </div>
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
        </div>

        {/* Right: Controls */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              제어
            </span>
            <button
              onClick={reset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Controls */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPlaying ? "재생 중..." : "자동 재생"}
            </button>
            <button
              onClick={handleStep}
              disabled={isPlaying || currentStep >= operations.length - 1}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              다음 단계 ({currentStep + 1}/{operations.length})
            </button>
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
        </div>
      </div>
    </>
  );
}
