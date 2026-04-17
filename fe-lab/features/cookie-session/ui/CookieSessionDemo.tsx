"use client";

import { useState } from "react";
import { AUTH_FLOWS } from "../model/constants";
import { useLog } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
} from "@shared/ui";
import { AuthFlowDiagram } from "./components/AuthFlowDiagram";
import { ProsCons } from "./components/ProsCons";
import { CookieAttributesList } from "./components/CookieAttributesList";

export default function CookieSessionDemo() {
  const [activeTab, setActiveTab] = useState<"auth" | "cookie">("auth");
  const [activeFlow, setActiveFlow] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();

  const flow = AUTH_FLOWS[activeFlow];

  const handleReset = () => {
    setActiveStep(-1);
    clearLogs();
  };

  const handleFlowChange = (index: number) => {
    setActiveFlow(index);
    handleReset();
  };

  const handleStepForward = () => {
    const next = activeStep + 1;

    if (next < flow.steps.length) {
      setActiveStep(next);

      const step = flow.steps[next];
      const dir = step.from === "client" ? "→" : "←";

      addLog(`${dir} ${step.label}: ${step.detail}`);
    }
  };

  const tabs = [
    { id: "auth", label: "인증 흐름 비교" },
    { id: "cookie", label: "쿠키 속성" },
  ];
  const activeIndex = activeTab === "auth" ? 0 : 1;

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={(i) => {
          setActiveTab(i === 0 ? "auth" : "cookie");
          handleReset();
        }}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              activeTab === "auth" ? (
                <>
                  <ActionButton
                    variant="cyan"
                    onClick={handleStepForward}
                    disabled={activeStep >= flow.steps.length - 1}
                  >
                    다음 단계 →
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      handleReset();
                      for (let i = 0; i < flow.steps.length; i++) {
                        const step = flow.steps[i];
                        const dir = step.from === "client" ? "→" : "←";
                        addLog(`${dir} ${step.label}: ${step.detail}`);
                      }
                      setActiveStep(flow.steps.length - 1);
                    }}
                  >
                    전체 흐름 실행
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton
                    variant="green"
                    onClick={() => {
                      addLog("Set-Cookie: sid=abc123;");
                      addLog("  HttpOnly; Secure;");
                      addLog("  SameSite=Strict;");
                      addLog("  Max-Age=3600");
                      addLog("→ XSS 방지 + CSRF 방지 + HTTPS 전용");
                    }}
                  >
                    보안 쿠키 설정
                  </ActionButton>
                  <ActionButton
                    variant="magenta"
                    onClick={() => {
                      addLog("⚠️ document.cookie 접근 시도");
                      addLog("→ HttpOnly 쿠키: 접근 불가 ✓");
                      addLog("→ 일반 쿠키: 'theme=dark' (노출)");
                    }}
                  >
                    XSS 공격 시뮬레이션
                  </ActionButton>
                </>
              )
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n쿠키/세션 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {activeTab === "auth" ? (
          <>
            <AuthFlowDiagram
              flows={AUTH_FLOWS}
              activeFlow={activeFlow}
              onFlowChange={handleFlowChange}
              activeStep={activeStep}
            />
            <ProsCons pros={flow.pros} cons={flow.cons} />
          </>
        ) : (
          <CookieAttributesList />
        )}
      </DemoLayout>
    </>
  );
}
