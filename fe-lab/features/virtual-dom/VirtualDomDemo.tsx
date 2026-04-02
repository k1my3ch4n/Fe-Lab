"use client";

import { useState, useCallback } from "react";
import {
  INITIAL_TREE,
  UPDATED_TREE,
  DIFF_RESULT,
  STEP_LABELS,
  DOM_COMPARISON,
} from "./constants";
import type { DomNode, DiffStatus } from "./constants";

const STATUS_COLORS: Record<
  DiffStatus,
  { border: string; bg: string; text: string; label: string }
> = {
  unchanged: {
    border: "border-accent-green/40",
    bg: "bg-accent-green/5",
    text: "text-accent-green",
    label: "유지",
  },
  modified: {
    border: "border-accent-amber/40",
    bg: "bg-accent-amber/5",
    text: "text-accent-amber",
    label: "변경",
  },
  added: {
    border: "border-accent-magenta/40",
    bg: "bg-accent-magenta/5",
    text: "text-accent-magenta",
    label: "추가",
  },
  removed: {
    border: "border-text-muted/40",
    bg: "bg-text-muted/5",
    text: "text-text-muted",
    label: "삭제",
  },
};

function getNodeStatus(nodeId: string, step: number): DiffStatus {
  if (step < 2) {
    return "unchanged";
  }

  const entry = DIFF_RESULT.find((d) => d.id === nodeId);

  return entry?.status ?? "unchanged";
}

function TreeNode({
  node,
  step,
  depth = 0,
}: {
  node: DomNode;
  step: number;
  depth?: number;
}) {
  const status = getNodeStatus(node.id, step);
  const colors = STATUS_COLORS[status];
  const isHighlighted = step >= 2 && status !== "unchanged";

  return (
    <div style={{ marginLeft: `${depth * 16}px` }} className="mb-1.5">
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border transition-all duration-500 ${
          isHighlighted
            ? `${colors.border} ${colors.bg} ${colors.text}`
            : "border-border-subtle bg-bg-deep text-text-secondary"
        } ${status === "removed" ? "opacity-40 line-through" : ""}`}
      >
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold">
          &lt;{node.tag}&gt;
        </span>
        {node.text && (
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
            {step >= 1 && status === "modified"
              ? (DIFF_RESULT.find((d) => d.id === node.id)?.detail ?? node.text)
              : `"${node.text}"`}
          </span>
        )}
        {isHighlighted && (
          <span
            className={`font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text} animate-[logSlide_0.3s_ease]`}
          >
            {colors.label}
          </span>
        )}
      </div>
      {node.children?.map((child) => (
        <TreeNode key={child.id} node={child} step={step} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function VirtualDomDemo() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const activeTree = step >= 1 ? UPDATED_TREE : INITIAL_TREE;
  const removedNodes =
    step >= 2 ? DIFF_RESULT.filter((d) => d.status === "removed") : [];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleStep = () => {
    const next = Math.min(step + 1, 3);
    setStep(next);

    if (next === 1) {
      addLog("setState() 호출 → 새 Virtual DOM 트리 생성");
      addLog('h1: "Hello" → "Hi!"');
      addLog('li#item-2: "Item B" → "Item B*"');
      addLog("li#item-3: 새 노드 추가");
      addLog("p#footer: 노드 삭제");
    } else if (next === 2) {
      addLog("─── Diffing 시작 ───");
      addLog("root(div) → 동일, 자식 비교");
      addLog("h1 → text 변경 감지");
      addLog("ul → 동일, 자식 비교");
      addLog("li#1 → 변경 없음");
      addLog("li#2 → text 변경 감지");
      addLog("li#3 → 새 노드 발견");
      addLog("p#footer → 삭제 감지");
    } else if (next === 3) {
      addLog("─── 최소 DOM 업데이트 ───");
      addLog("patch: h1.textContent = 'Hi!'");
      addLog("patch: li#2.textContent = 'Item B*'");
      addLog("patch: ul.appendChild(li#3)");
      addLog("patch: root.removeChild(p#footer)");
      addLog("✓ 4개 조작만으로 업데이트 완료");
    }
  };

  const handleReset = () => {
    setStep(0);
    setLogs([]);
  };

  return (
    <>
      {/* Step indicator toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {STEP_LABELS.map((label, i) => (
          <div
            key={i}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 ${
              i === step
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : i < step
                  ? "border-transparent text-accent-green"
                  : "border-transparent text-text-muted"
            }`}
          >
            <span className="mr-1.5 opacity-60">{i + 1}.</span>
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Tree Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Comparison Table */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Real DOM vs Virtual DOM
            </div>
            <div className="grid grid-cols-3 gap-px bg-border-subtle rounded-lg overflow-hidden text-[11px]">
              <div className="bg-bg-elevated px-3 py-2 font-semibold text-text-muted font-[family-name:var(--font-mono)]">
                비교 항목
              </div>
              <div className="bg-bg-elevated px-3 py-2 font-semibold text-accent-magenta font-[family-name:var(--font-mono)]">
                Real DOM
              </div>
              <div className="bg-bg-elevated px-3 py-2 font-semibold text-accent-cyan font-[family-name:var(--font-mono)]">
                Virtual DOM
              </div>
              {DOM_COMPARISON.map((row) => (
                <>
                  <div
                    key={`${row.category}-cat`}
                    className="bg-bg-deep px-3 py-2 text-text-secondary"
                  >
                    {row.category}
                  </div>
                  <div
                    key={`${row.category}-real`}
                    className="bg-bg-deep px-3 py-2 text-text-muted"
                  >
                    {row.realDom}
                  </div>
                  <div
                    key={`${row.category}-vdom`}
                    className="bg-bg-deep px-3 py-2 text-accent-cyan/80"
                  >
                    {row.virtualDom}
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* Virtual DOM Tree */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              {step === 0
                ? "Current Virtual DOM"
                : step === 1
                  ? "New Virtual DOM (상태 변경 후)"
                  : step === 2
                    ? "Diff Result"
                    : "Patched DOM"}
            </div>
            <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
              <TreeNode node={activeTree} step={step} />
              {/* Show removed nodes */}
              {removedNodes.map((entry) => (
                <div
                  key={entry.id}
                  style={{ marginLeft: "32px" }}
                  className="mb-1.5"
                >
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-text-muted/40 bg-text-muted/5 text-text-muted opacity-40 line-through">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold">
                      &lt;p&gt;
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px]">
                      &quot;Footer&quot;
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-0.5 rounded-full bg-text-muted/5 text-text-muted no-underline animate-[logSlide_0.3s_ease]">
                      삭제
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            {step >= 2 && (
              <div className="flex items-center gap-4 mt-3">
                {(["unchanged", "modified", "added", "removed"] as const).map(
                  (s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          s === "unchanged"
                            ? "bg-accent-green"
                            : s === "modified"
                              ? "bg-accent-amber"
                              : s === "added"
                                ? "bg-accent-magenta"
                                : "bg-text-muted"
                        }`}
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                        {STATUS_COLORS[s].label}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              실행
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle">
            <button
              onClick={handleStep}
              disabled={step >= 3}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                step >= 3
                  ? "border-border-subtle text-text-muted bg-bg-deep cursor-not-allowed"
                  : step === 0
                    ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim hover:bg-[#00e5ff33]"
                    : step === 1
                      ? "border-accent-amber text-accent-amber bg-accent-amber-dim hover:bg-[#ffb80033]"
                      : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
              }`}
            >
              {step === 0
                ? "상태 변경"
                : step === 1
                  ? "Diffing 시작"
                  : step === 2
                    ? "DOM 업데이트 적용"
                    : "✓ 완료"}
            </button>
            {step < 3 && (
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-2 text-center">
                {step === 0
                  ? "클릭하여 상태를 변경하세요"
                  : step === 1
                    ? "이전 트리와 새 트리를 비교합니다"
                    : "변경된 부분만 Real DOM에 반영합니다"}
              </p>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                Virtual DOM 동작을 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease] ${
                    log.startsWith("───")
                      ? "text-accent-amber"
                      : log.startsWith("patch:")
                        ? "text-accent-green"
                        : log.startsWith("✓")
                          ? "text-accent-magenta"
                          : "text-accent-cyan"
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
