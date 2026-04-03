"use client";

import { useState, useCallback } from "react";
import { LEAK_PATTERNS, SEVERITY_COLORS, GC_PHASES } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  ActionButton,
} from "@shared/ui";

export default function MemoryManagementDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [gcPhase, setGcPhase] = useState<number | null>(null);

  const pattern = LEAK_PATTERNS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setLogs([]);
    setGcPhase(null);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setGcPhase(null);
  };

  const simulateLeak = () => {
    setLogs([]);
    if (activeTab === 0) {
      addLog("// 이벤트 리스너 등록 (해제 없음)");
      addLog("addEventListener('click', handler)");
      addLog("→ handler 클로저가 data(10000) 참조 유지");
      addLog("→ 컴포넌트 언마운트 후에도 메모리 유지 ✗");
      addLog("");
      addLog("// 메모리: 10KB → 20KB → 30KB... (누적)");
    } else if (activeTab === 1) {
      addLog("// replaceThing() 반복 호출");
      addLog("호출 1: longStr(1MB) + originalThing 참조 유지");
      addLog("호출 2: longStr(1MB) + 이전 theThing 참조 유지");
      addLog("호출 3: longStr(1MB) + 체인 계속 증가...");
      addLog("");
      addLog("// 메모리: 1MB → 2MB → 3MB... (누적)");
    } else {
      addLog("// DOM 노드 생성 및 JS 참조 저장");
      addLog("elements.myDiv = div");
      addLog("document.body.removeChild(div)");
      addLog("→ DOM에서 제거했지만 elements.myDiv가 참조 유지");
      addLog("→ Detached DOM Tree: GC 불가 ✗");
    }
  };

  const simulateFix = () => {
    setLogs([]);
    if (activeTab === 0) {
      addLog("// cleanup 함수로 리스너 해제");
      addLog("removeEventListener('click', handler)");
      addLog("→ handler 참조 해제 → data도 GC 대상");
      addLog("→ 메모리 정상 해제 ✓");
    } else if (activeTab === 1) {
      addLog("// 불필요한 클로저 제거");
      addLog("→ unused 클로저 삭제");
      addLog("→ originalThing이 함수 종료 시 GC 대상");
      addLog("→ 메모리 안정적 유지 ✓");
    } else {
      addLog("// JS 참조도 함께 제거");
      addLog("delete elements.myDiv");
      addLog("→ DOM 노드 + JS 참조 모두 해제");
      addLog("→ GC가 메모리 회수 가능 ✓");
      addLog("");
      addLog("// 또는 WeakRef 사용");
      addLog("new WeakRef(div) → GC가 자동으로 수거");
    }
  };

  const simulateGC = () => {
    setLogs([]);
    addLog("// Garbage Collection 시작");
    setGcPhase(0);

    setTimeout(() => {
      addLog("1. Mark: 루트에서 도달 가능한 객체 탐색");
      setGcPhase(1);
    }, 800);

    setTimeout(() => {
      addLog("2. Sweep: 마킹되지 않은 객체 메모리 해제");
      setGcPhase(2);
    }, 1600);

    setTimeout(() => {
      addLog("3. Compact: 메모리 압축 (V8 선택적)");
      addLog("");
      addLog("// GC 완료 — 도달 불가 객체 수거됨");
      setGcPhase(null);
    }, 2400);
  };

  const tabs = LEAK_PATTERNS.map((p) => ({ id: p.id, label: p.label }));

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader onReset={handleReset} />

            {/* Action buttons */}
            <div className="p-4 border-b border-border-subtle">
              <div className="flex flex-col gap-2">
                <ActionButton variant="magenta" onClick={simulateLeak}>
                  릭 시뮬레이션 (문제)
                </ActionButton>
                <ActionButton variant="green" onClick={simulateFix}>
                  해결 패턴 실행
                </ActionButton>
                <ActionButton variant="cyan" onClick={simulateGC}>
                  GC 사이클 시각화
                </ActionButton>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-border-subtle">
              <div className="text-[11px] text-text-secondary leading-[1.8]">
                {pattern.description}
              </div>
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n메모리 릭 패턴을 확인하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {pattern.code}
        </pre>

        {/* Severity + GC Phases */}
        <div className="flex gap-4">
          {/* Severity */}
          <div className="flex items-center gap-2 p-3 rounded-lg border border-border-subtle bg-bg-surface">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase">
              위험도:
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
              style={{ color: SEVERITY_COLORS[pattern.severity] }}
            >
              {pattern.severity.toUpperCase()}
            </span>
          </div>

          {/* GC Phase Indicator */}
          <div className="flex-1 flex items-center gap-2">
            {GC_PHASES.map((phase, i) => (
              <div
                key={phase.name}
                className="flex-1 rounded-lg border p-2 text-center transition-all duration-500"
                style={{
                  borderColor:
                    gcPhase === i ? `${phase.color}88` : `${phase.color}22`,
                  background:
                    gcPhase === i ? `${phase.color}18` : "transparent",
                  transform: gcPhase === i ? "scale(1.05)" : "scale(1)",
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                  style={{
                    color: gcPhase === i ? phase.color : `${phase.color}66`,
                  }}
                >
                  {phase.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
