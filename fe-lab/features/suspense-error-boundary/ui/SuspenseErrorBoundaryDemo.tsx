"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import { SUSPENSE_SCENARIOS, TABS } from "../model/constants";

export default function SuspenseErrorBoundaryDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const scenario = SUSPENSE_SCENARIOS[activeTab];

  const handleTabChange = (index: number) => {
    clearTimers();
    setActiveTab(index);
    clearLogs();
    setActiveStep(-1);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    setActiveStep(-1);
  };

  const handleSimulate = () => {
    clearLogs();
    setActiveStep(0);
    const steps = scenario.steps;
    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setActiveStep(step);
        addLog(
          `${step + 1}. [${steps[step].label}] ${steps[step].description}`,
        );
        step++;
        addTimer(runStep, 600);
      } else {
        if (scenario.id === "suspense") {
          addLog("--- 로딩 완료! 컴포넌트가 정상 렌더됩니다 ✓");
        } else if (scenario.id === "error-boundary") {
          addLog("--- 에러가 안전하게 처리되었습니다 ✓");
        } else {
          addLog("--- 로딩 + 에러 모두 선언적으로 처리 ✓");
        }
      }
    };
    runStep();
  };

  const handleErrorScenario = () => {
    clearLogs();
    if (scenario.id === "suspense") {
      addLog("❌ Suspense 없이 use() 호출 시:");
      addTimer(() => {
        addLog("→ Unhandled Promise — 앱 크래시!");
        addTimer(() => {
          addLog("→ 반드시 <Suspense>로 감싸야 합니다");
        }, 400);
      }, 400);
    } else if (scenario.id === "error-boundary") {
      addLog("❌ Error Boundary 없이 에러 발생 시:");
      addTimer(() => {
        addLog("→ 전체 컴포넌트 트리 언마운트!");
        addTimer(() => {
          addLog("→ 사용자에게 빈 화면 표시됨");
        }, 400);
      }, 400);
    } else {
      addLog("❌ 조합 없이 사용 시:");
      addTimer(() => {
        addLog("→ 로딩 중 에러 발생 → 처리 불가!");
        addTimer(() => {
          addLog("→ 항상 Error Boundary + Suspense 조합 권장");
        }, 400);
      }, 400);
    }
  };

  const rightPanel = (
    <>
      <PanelHeader label="실행" onReset={handleReset} />

      <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
        <ActionButton variant="cyan" onClick={handleSimulate}>
          정상 흐름 시뮬레이션
        </ActionButton>
        <ActionButton variant="magenta" onClick={handleErrorScenario}>
          에러 시나리오
        </ActionButton>
      </div>

      {/* Log */}
      <LogPanel
        logs={logs}
        emptyMessage={
          "버튼을 클릭하여\nSuspense / Error Boundary\n동작을 확인하세요"
        }
      />
    </>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={TABS}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout rightPanel={rightPanel}>
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {scenario.code}
        </pre>

        {/* Flow Visualization */}
        <div>
          <SectionHeader>Flow</SectionHeader>
          <div className="flex flex-col gap-2">
            {scenario.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 transition-all duration-300"
                style={{
                  borderColor:
                    activeStep >= i ? `${step.color}88` : `${step.color}22`,
                  background:
                    activeStep >= i ? `${step.color}15` : `${step.color}05`,
                  marginLeft: `${i * 16}px`,
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                  style={{ color: step.color }}
                >
                  {i + 1}. {step.label}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
