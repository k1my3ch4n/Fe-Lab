"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import { AUTH_METHODS, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
  CodeBlock,
} from "@shared/ui";
import { AuthProsCons } from "./components/AuthProsCons";
import { AuthFlowVisualization } from "./components/AuthFlowVisualization";

export default function AuthStrategyDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const method = AUTH_METHODS[activeTab];

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
    const steps = method.steps;
    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setActiveStep(step);
        addLog(`${step + 1}. [${steps[step].label}] ${steps[step].description}`);
        step++;
        addTimer(runStep, 500);
      } else {
        addLog("--- 인증 완료! ✓");
      }
    };
    runStep();
  };

  const handleCompare = () => {
    clearLogs();
    addLog("=== Session vs JWT vs OAuth ===");
    addTimer(() => {
      addLog("Session: 서버 상태 ✓ | 확장성 ✗ | 즉시 무효화 ✓");
      addTimer(() => {
        addLog("JWT: Stateless ✓ | 확장성 ✓ | 즉시 무효화 ✗");
        addTimer(() => {
          addLog("OAuth: 소셜 로그인 ✓ | 구현 복잡도 ✗ | 표준 ✓");
          addTimer(() => {
            addLog("→ 실무: JWT(Access) + 리프레시 토큰 조합 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const handleRefreshFlow = () => {
    clearLogs();
    addLog("=== 리프레시 토큰 흐름 ===");
    addTimer(() => {
      addLog("1. Access Token 만료 (15분)");
      addTimer(() => {
        addLog("2. API 응답: 401 Unauthorized");
        addTimer(() => {
          addLog("3. Refresh Token으로 새 Access Token 발급");
          addTimer(() => {
            addLog("4. 원래 요청 재시도 → 성공");
            addTimer(() => {
              addLog("5. Refresh Token도 만료 시 → 재로그인");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    }, 400);
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
                  인증 흐름 시뮬레이션
                </ActionButton>
                <ActionButton variant="amber" onClick={handleCompare}>
                  3가지 방식 비교
                </ActionButton>
                <ActionButton variant="green" onClick={handleRefreshFlow}>
                  리프레시 토큰 흐름
                </ActionButton>
                <AuthProsCons pros={method.pros} cons={method.cons} />
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n인증 흐름을 확인하세요"}
            />
          </RightPanel>
        }
      >
        <CodeBlock>{method.code}</CodeBlock>

        <AuthFlowVisualization steps={method.steps} activeStep={activeStep} />
      </DemoLayout>
    </>
  );
}
