"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import { COMPONENT_TYPES } from "./constants";

export default function ServerComponentsDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activePhase, setActivePhase] = useState(-1);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const compType = COMPONENT_TYPES[activeTab];

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    timersRef.current.push(setTimeout(fn, delay));
  };

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    clearTimers();
    setActiveTab(index);
    setLogs([]);
    setActivePhase(-1);
  };

  const handleReset = () => {
    clearTimers();
    setLogs([]);
    setActivePhase(-1);
  };

  const handleSimulate = () => {
    setLogs([]);
    setActivePhase(0);
    const phases = compType.phases;
    let step = 0;

    const runStep = () => {
      if (step < phases.length) {
        setActivePhase(step);
        addLog(
          `${step + 1}. [${phases[step].label}] ${phases[step].description}`,
        );
        step++;
        addTimer(runStep, 600);
      } else {
        addLog(`--- 번들 사이즈: ${compType.bundleSize}`);
        addLog(`--- 렌더 위치: ${compType.renderLocation}`);
      }
    };
    runStep();
  };

  const handleCompare = () => {
    setLogs([]);
    addLog("=== Server vs Client 비교 ===");
    addTimer(() => {
      addLog("Server: DB 직접 접근 ✓ | useState ✗");
      addTimer(() => {
        addLog("Client: useState ✓ | DB 직접 접근 ✗");
        addTimer(() => {
          addLog("Server: 번들 0KB | Client: 2-10KB+");
          addTimer(() => {
            addLog("→ 인터랙션 없으면 Server Component 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const tabs = COMPONENT_TYPES.map((ct) => ({ id: ct.id, label: ct.label }));

  const rightPanel = (
    <>
      <PanelHeader label="실행" onReset={handleReset} />

      <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
        <ActionButton variant="cyan" onClick={handleSimulate}>
          렌더 흐름 시뮬레이션
        </ActionButton>
        <ActionButton variant="amber" onClick={handleCompare}>
          Server vs Client 비교
        </ActionButton>
      </div>

      {/* Log */}
      <LogPanel
        logs={logs}
        emptyMessage={"버튼을 클릭하여\nRSC 렌더링 흐름을\n확인하세요"}
      />
    </>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout rightPanel={rightPanel}>
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {compType.code}
        </pre>

        {/* Phase Visualization */}
        <div>
          <SectionHeader>Render Flow</SectionHeader>
          <div className="flex flex-col gap-2">
            {compType.phases.map((phase, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 transition-all duration-300"
                style={{
                  borderColor:
                    activePhase >= i ? `${phase.color}88` : `${phase.color}22`,
                  background:
                    activePhase >= i ? `${phase.color}15` : `${phase.color}05`,
                  marginLeft: `${i * 16}px`,
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                  style={{ color: phase.color }}
                >
                  {i + 1}. {phase.label}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
                  {phase.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundle Size Indicator */}
        <div className="flex items-center gap-3 bg-bg-deep rounded-lg p-3">
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
            Bundle:
          </span>
          <div className="flex-1 h-2 bg-bg-surface rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width:
                  compType.id === "server"
                    ? "2%"
                    : compType.id === "client"
                      ? "60%"
                      : "2%",
                background: compType.id === "client" ? "#ff2d8a" : "#00e676",
              }}
            />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
            {compType.bundleSize}
          </span>
        </div>
      </DemoLayout>
    </>
  );
}
