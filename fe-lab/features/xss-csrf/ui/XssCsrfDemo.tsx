"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import { SECURITY_SCENARIOS, XSS_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
  SectionHeader,
  CodeBlock,
  StepFlowBox,
} from "@shared/ui";

export default function XssCsrfDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [xssInput, setXssInput] = useState("");
  const [showEscaped, setShowEscaped] = useState(false);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const scenario = SECURITY_SCENARIOS[activeTab];

  const handleTabChange = (index: number) => {
    clearTimers();
    setActiveTab(index);
    clearLogs();
    setActiveStep(-1);
    setXssInput("");
    setShowEscaped(false);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    setActiveStep(-1);
    setXssInput("");
    setShowEscaped(false);
  };

  const handleAttackSimulate = () => {
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
        if (scenario.id === "xss") {
          addLog("--- 공격 성공: 쿠키 탈취됨!");
        } else if (scenario.id === "csrf") {
          addLog("--- 공격 성공: 무단 송금 실행!");
        } else {
          addLog("--- CSP가 악성 스크립트를 차단했습니다 ✓");
        }
      }
    };
    runStep();
  };

  const handleXssDemo = () => {
    const malicious = XSS_EXAMPLES.input;
    setXssInput(malicious);
    setShowEscaped(false);
    clearLogs();
    addLog(`입력: ${malicious}`);
    addTimer(() => {
      addLog("innerHTML 사용 시 → 스크립트 실행됨! ❌");
      addTimer(() => {
        setShowEscaped(true);
        addLog("textContent 사용 시 → 문자열로 표시 ✓");
        addTimer(() => {
          addLog(`이스케이프 결과: ${XSS_EXAMPLES.escaped}`);
        }, 400);
      }, 600);
    }, 400);
  };

  const handleDefense = () => {
    clearLogs();
    if (scenario.id === "xss") {
      addLog("=== XSS 방어 전략 ===");
      addTimer(() => {
        addLog("1. 입력 검증 + 이스케이프 (서버/클라이언트)");
        addTimer(() => {
          addLog("2. CSP 헤더로 인라인 스크립트 차단");
          addTimer(() => {
            addLog("3. HttpOnly 쿠키로 JS 접근 차단");
            addTimer(() => {
              addLog("4. React는 JSX에서 자동 이스케이프 ✓");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    } else if (scenario.id === "csrf") {
      addLog("=== CSRF 방어 전략 ===");
      addTimer(() => {
        addLog("1. CSRF 토큰 — 폼마다 고유 토큰 발급/검증");
        addTimer(() => {
          addLog("2. SameSite 쿠키 — cross-origin 요청에 쿠키 미전송");
          addTimer(() => {
            addLog("3. Origin/Referer 헤더 검증");
            addTimer(() => {
              addLog("4. Custom 헤더 (X-Requested-With)");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    } else {
      addLog("=== CSP 설정 가이드 ===");
      addTimer(() => {
        addLog("1. default-src 'self' — 기본 차단");
        addTimer(() => {
          addLog("2. script-src 'nonce-xxx' — nonce 기반 허용");
          addTimer(() => {
            addLog("3. report-uri — 위반 리포팅");
            addTimer(() => {
              addLog("4. 점진적 적용: Report-Only → Enforce");
            }, 400);
          }, 400);
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
                <ActionButton variant="magenta" onClick={handleAttackSimulate}>
                  공격 시뮬레이션
                </ActionButton>
                {activeTab === 0 && (
                  <ActionButton variant="amber" onClick={handleXssDemo}>
                    XSS 이스케이프 비교
                  </ActionButton>
                )}
                <ActionButton variant="green" onClick={handleDefense}>
                  방어 전략
                </ActionButton>
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n보안 공격과 방어를\n확인하세요"}
            />
          </RightPanel>
        }
      >
        {/* Code */}
        <CodeBlock>
          {scenario.code}
        </CodeBlock>

        {/* XSS Input Demo (only for XSS tab) */}
        {activeTab === 0 && xssInput && (
          <div className="bg-bg-deep rounded-lg p-4">
            <SectionHeader>XSS 시뮬레이션</SectionHeader>
            <div className="flex flex-col gap-2">
              <div className="rounded border border-accent-magenta/30 p-2 bg-accent-magenta-dim">
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta">
                  innerHTML:
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary ml-2">
                  {xssInput}
                </span>
              </div>
              {showEscaped && (
                <div className="rounded border border-accent-green/30 p-2 bg-accent-green-dim">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green">
                    textContent:
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary ml-2">
                    {XSS_EXAMPLES.escaped}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Attack Flow Visualization */}
        <div>
          <SectionHeader>Attack Flow</SectionHeader>
          <StepFlowBox
            steps={scenario.steps}
            activeStep={activeStep}
            indentMultiplier={16}
          />
        </div>
      </DemoLayout>
    </>
  );
}
