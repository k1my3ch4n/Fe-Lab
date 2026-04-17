"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { SUSPENSE_SCENARIOS, TABS } from "../model/constants";
import { SuspenseFlowVisualization } from "./components/SuspenseFlowVisualization";

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
        addLog(`${step + 1}. [${steps[step].label}] ${steps[step].description}`);
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

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <>
                <ActionButton variant="cyan" onClick={handleSimulate}>
                  정상 흐름 시뮬레이션
                </ActionButton>
                <ActionButton variant="magenta" onClick={handleErrorScenario}>
                  에러 시나리오
                </ActionButton>
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={
                "버튼을 클릭하여\nSuspense / Error Boundary\n동작을 확인하세요"
              }
            />
          </RightPanel>
        }
      >
        <CodeBlock>{scenario.code}</CodeBlock>

        <SuspenseFlowVisualization
          steps={scenario.steps}
          activeStep={activeStep}
        />
      </DemoLayout>
    </>
  );
}
