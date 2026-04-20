"use client";

import { useState } from "react";
import { DemoLayout, RightPanel, LogPanel } from "@shared/ui";
import { useLog } from "@shared/hooks";
import {
  INITIAL_TREE,
  UPDATED_TREE,
  DIFF_RESULT,
  STEP_LABELS,
  DOM_COMPARISON,
} from "../model/constants";
import TreeNode from "./components/TreeNode";

export default function VirtualDomDemo() {
  const [step, setStep] = useState(0);
  const { logs, addLog, clearLogs } = useLog();

  const activeTree = step >= 1 ? UPDATED_TREE : INITIAL_TREE;
  const removedNodes =
    step >= 2 ? DIFF_RESULT.filter((d) => d.status === "removed") : [];

  const handleStep = () => {
    const next = Math.min(step + 1, 3);
    setStep(next);

    if (next === 1) {
      addLog("setState() 호출 → 새 Virtual DOM 트리 생성", "#00e5ff");
      addLog('h1: "Hello" → "Hi!"', "#00e5ff");
      addLog('li#item-2: "Item B" → "Item B*"', "#00e5ff");
      addLog("li#item-3: 새 노드 추가", "#00e5ff");
      addLog("p#footer: 노드 삭제", "#00e5ff");
    } else if (next === 2) {
      addLog("─── Diffing 시작 ───", "#ffb800");
      addLog("root(div) → 동일, 자식 비교", "#00e5ff");
      addLog("h1 → text 변경 감지", "#00e5ff");
      addLog("ul → 동일, 자식 비교", "#00e5ff");
      addLog("li#1 → 변경 없음", "#00e5ff");
      addLog("li#2 → text 변경 감지", "#00e5ff");
      addLog("li#3 → 새 노드 발견", "#00e5ff");
      addLog("p#footer → 삭제 감지", "#00e5ff");
    } else if (next === 3) {
      addLog("─── 최소 DOM 업데이트 ───", "#ffb800");
      addLog("patch: h1.textContent = 'Hi!'", "#00e676");
      addLog("patch: li#2.textContent = 'Item B*'", "#00e676");
      addLog("patch: ul.appendChild(li#3)", "#00e676");
      addLog("patch: root.removeChild(p#footer)", "#00e676");
      addLog("✓ 4개 조작만으로 업데이트 완료", "#ff2d8a");
    }
  };

  const handleReset = () => {
    setStep(0);
    clearLogs();
  };

  const rightPanel = (
    <RightPanel
      label="실행"
      onReset={handleReset}
      actions={
        <>
          <button
            onClick={handleStep}
            disabled={step >= 3}
            className={`w-full font-mono text-[12px] px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
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
            <p className="font-mono text-[10px] text-text-muted text-center">
              {step === 0
                ? "클릭하여 상태를 변경하세요"
                : step === 1
                  ? "이전 트리와 새 트리를 비교합니다"
                  : "변경된 부분만 Real DOM에 반영합니다"}
            </p>
          )}
        </>
      }
    >
      <LogPanel
        logs={logs}
        emptyMessage={"버튼을 클릭하여\nVirtual DOM 동작을 확인하세요"}
      />
    </RightPanel>
  );

  return (
    <>
      {/* Step indicator toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {STEP_LABELS.map((label, i) => (
          <div
            key={i}
            className={`font-mono text-[11px] px-4 py-3 border-b-2 transition-all duration-200 ${
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

      <DemoLayout rightPanel={rightPanel}>
        {/* Comparison Table */}
        <div>
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3">
            Real DOM vs Virtual DOM
          </div>
          <div className="grid grid-cols-3 gap-px bg-border-subtle rounded-lg overflow-hidden text-[11px]">
            <div className="bg-bg-elevated px-3 py-2 font-semibold text-text-muted font-mono">
              비교 항목
            </div>
            <div className="bg-bg-elevated px-3 py-2 font-semibold text-accent-magenta font-mono">
              Real DOM
            </div>
            <div className="bg-bg-elevated px-3 py-2 font-semibold text-accent-cyan font-mono">
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
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3">
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
                  <span className="font-mono text-[11px] font-semibold">
                    &lt;p&gt;
                  </span>
                  <span className="font-mono text-[10px]">
                    &quot;Footer&quot;
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-text-muted/5 text-text-muted no-underline animate-[logSlide_0.3s_ease]">
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
                    <span className="font-mono text-[10px] text-text-muted">
                      {
                        {
                          unchanged: "유지",
                          modified: "변경",
                          added: "추가",
                          removed: "삭제",
                        }[s]
                      }
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </DemoLayout>
    </>
  );
}
