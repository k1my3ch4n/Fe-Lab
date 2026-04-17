"use client";

import { useState } from "react";
import { AUTH_FLOWS, COOKIE_ATTRIBUTES } from "../model/constants";
import { useLog } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
  SectionHeader,
} from "@shared/ui";

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
            {/* Method selector */}
            <div className="flex gap-2">
              {AUTH_FLOWS.map((f, i) => (
                <button
                  key={f.method.id}
                  onClick={() => handleFlowChange(i)}
                  className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    i === activeFlow
                      ? "bg-bg-surface"
                      : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
                  }`}
                  style={
                    i === activeFlow
                      ? {
                          borderColor: `${f.method.color}66`,
                          color: f.method.color,
                        }
                      : {}
                  }
                >
                  {f.method.label}
                </button>
              ))}
            </div>

            {/* Flow diagram */}
            <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                {flow.description}
              </div>

              <div className="flex gap-6 mt-4">
                {/* Client */}
                <div className="w-20 text-center">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan font-semibold px-2 py-1.5 rounded-lg bg-accent-cyan-dim border border-accent-cyan/30">
                    Client
                  </div>
                </div>

                {/* Steps */}
                <div className="flex-1 flex flex-col gap-2">
                  {flow.steps.map((step, i) => {
                    const isActive = i <= activeStep;
                    const isCurrent = i === activeStep;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-300 ${
                          isCurrent
                            ? "bg-bg-surface border border-border-subtle"
                            : ""
                        }`}
                        style={{ opacity: isActive ? 1 : 0.3 }}
                      >
                        <span
                          className="font-[family-name:var(--font-mono)] text-[12px] w-5 text-center"
                          style={{ color: step.color }}
                        >
                          {step.from === "client" ? "→" : "←"}
                        </span>
                        <div>
                          <div
                            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                            style={{ color: step.color }}
                          >
                            {step.label}
                          </div>
                          <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                            {step.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Server */}
                <div className="w-20 text-center">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green font-semibold px-2 py-1.5 rounded-lg bg-accent-green-dim border border-accent-green/30">
                    Server
                  </div>
                </div>
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-3">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-2">
                  장점
                </div>
                {flow.pros.map((p, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mb-1"
                  >
                    + {p}
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-3">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-2">
                  단점
                </div>
                {flow.cons.map((c, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mb-1"
                  >
                    - {c}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Cookie attributes */
          <div className="flex flex-col gap-3">
            <SectionHeader>쿠키 보안 속성</SectionHeader>
            {COOKIE_ATTRIBUTES.map((attr) => (
              <div
                key={attr.name}
                className="rounded-lg border border-border-subtle bg-bg-deep p-3 flex items-center gap-3"
              >
                <span
                  className="font-[family-name:var(--font-mono)] text-[11px] font-semibold shrink-0"
                  style={{ color: attr.color }}
                >
                  {attr.name}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                  {attr.description}
                </span>
              </div>
            ))}

            {/* Cookie in request diagram */}
            <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 mt-2">
              <SectionHeader>요청마다 쿠키 자동 전송</SectionHeader>
              <pre className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan leading-[1.8]">
                {`GET /api/user HTTP/1.1
Host: example.com
Cookie: sid=abc123; theme=dark
       ↑ 브라우저가 자동으로 포함`}
              </pre>
            </div>
          </div>
        )}
      </DemoLayout>
    </>
  );
}
