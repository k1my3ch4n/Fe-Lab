"use client";

import { useState, useCallback } from "react";
import { AUTH_METHODS } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  ActionButton,
  LogPanel,
  SectionHeader,
} from "@shared/ui";

export default function AuthStrategyDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const method = AUTH_METHODS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setActiveStep(-1);
  };

  const handleReset = () => {
    setLogs([]);
    setActiveStep(-1);
  };

  const handleSimulate = () => {
    setLogs([]);
    setActiveStep(0);
    const steps = method.steps;
    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setActiveStep(step);
        addLog(
          `${step + 1}. [${steps[step].label}] ${steps[step].description}`,
        );
        step++;
        setTimeout(runStep, 500);
      } else {
        addLog("--- 인증 완료! ✓");
      }
    };
    runStep();
  };

  const handleCompare = () => {
    setLogs([]);
    addLog("=== Session vs JWT vs OAuth ===");
    setTimeout(() => {
      addLog("Session: 서버 상태 ✓ | 확장성 ✗ | 즉시 무효화 ✓");
      setTimeout(() => {
        addLog("JWT: Stateless ✓ | 확장성 ✓ | 즉시 무효화 ✗");
        setTimeout(() => {
          addLog("OAuth: 소셜 로그인 ✓ | 구현 복잡도 ✗ | 표준 ✓");
          setTimeout(() => {
            addLog("→ 실무: JWT(Access) + 리프레시 토큰 조합 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const handleRefreshFlow = () => {
    setLogs([]);
    addLog("=== 리프레시 토큰 흐름 ===");
    setTimeout(() => {
      addLog("1. Access Token 만료 (15분)");
      setTimeout(() => {
        addLog("2. API 응답: 401 Unauthorized");
        setTimeout(() => {
          addLog("3. Refresh Token으로 새 Access Token 발급");
          setTimeout(() => {
            addLog("4. 원래 요청 재시도 → 성공");
            setTimeout(() => {
              addLog("5. Refresh Token도 만료 시 → 재로그인");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const tabs = AUTH_METHODS.map((m) => ({ id: m.id, label: m.label }));

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
            <PanelHeader label="실행" onReset={handleReset} />

            <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
              <ActionButton variant="cyan" onClick={handleSimulate}>
                인증 흐름 시뮬레이션
              </ActionButton>
              <ActionButton variant="amber" onClick={handleCompare}>
                3가지 방식 비교
              </ActionButton>
              <ActionButton variant="green" onClick={handleRefreshFlow}>
                리프레시 토큰 흐름
              </ActionButton>

              {/* Pros / Cons */}
              <div className="mt-2">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mb-1">
                  장점
                </div>
                {method.pros.map((p, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                  >
                    + {p}
                  </div>
                ))}
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta mt-2 mb-1">
                  단점
                </div>
                {method.cons.map((c, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                  >
                    - {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Log */}
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n인증 흐름을 확인하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {method.code}
        </pre>

        {/* Auth Flow Visualization */}
        <div>
          <SectionHeader>Auth Flow</SectionHeader>
          <div className="flex flex-col gap-2">
            {method.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 transition-all duration-300"
                style={{
                  borderColor:
                    activeStep >= i ? `${step.color}88` : `${step.color}22`,
                  background:
                    activeStep >= i ? `${step.color}15` : `${step.color}05`,
                  marginLeft: `${i * 14}px`,
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
