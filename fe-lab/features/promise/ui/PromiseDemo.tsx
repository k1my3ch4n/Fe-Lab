"use client";

import { useState, useRef } from "react";
import { useLog } from "@shared/hooks";
import {
  PROMISE_METHODS,
  STATE_COLORS,
  DEFAULT_PROMISES,
  TABS,
} from "../model/constants";
import type { PromiseState, PromiseItem } from "../model/types";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";

export default function PromiseDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const { logs, addLog, clearLogs } = useLog();
  const [promises, setPromises] = useState<PromiseItem[]>(
    DEFAULT_PROMISES.map((p) => ({ ...p, state: "pending" as PromiseState })),
  );
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const method = PROMISE_METHODS[activeTab];

  const handleReset = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    clearLogs();
    setIsRunning(false);
    setPromises(
      DEFAULT_PROMISES.map((p) => ({ ...p, state: "pending" as PromiseState })),
    );
  };

  const handleTabChange = (index: number) => {
    handleReset();
    setActiveTab(index);
  };

  const runSimulation = () => {
    handleReset();
    setIsRunning(true);

    const newPromises = DEFAULT_PROMISES.map((p) => ({
      ...p,
      state: "pending" as PromiseState,
    }));
    setPromises(newPromises);

    addLog("// 시뮬레이션 시작...");

    DEFAULT_PROMISES.forEach((p, i) => {
      const timer = setTimeout(() => {
        const state: PromiseState = p.shouldReject ? "rejected" : "fulfilled";
        const value = p.shouldReject
          ? `Error: ${p.label} 실패`
          : `${p.label} 완료`;

        setPromises((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, state, value } : item,
          ),
        );

        addLog(
          `${p.label} → ${state === "fulfilled" ? "✓ fulfilled" : "✗ rejected"} (${p.delay}ms)`,
        );

        // Check method result after all settle
        if (i === DEFAULT_PROMISES.length - 1 || (activeTab === 2 && i === 0)) {
          const resultTimer = setTimeout(() => {
            if (activeTab === 1) {
              addLog("→ Promise.all: ✗ rejected (C가 실패)");
            } else if (activeTab === 2) {
              addLog(
                `→ Promise.race: 결과 = '${DEFAULT_PROMISES[0].label} 완료' (가장 빠름)`,
              );
            } else if (activeTab === 3) {
              addLog("→ Promise.allSettled: [fulfilled, fulfilled, rejected]");
            } else if (activeTab === 4) {
              addLog(
                `→ Promise.any: '${DEFAULT_PROMISES[0].label} 완료' (첫 성공)`,
              );
            }
            setIsRunning(false);
          }, 500);
          timersRef.current.push(resultTimer);
        }
      }, p.delay);
      timersRef.current.push(timer);
    });
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
                {activeTab === 0 && (
                  <>
                    <ActionButton
                      variant="green"
                      onClick={() => {
                        clearLogs();
                        addLog("new Promise(resolve => ...)");
                        setTimeout(
                          () => addLog("→ resolve('성공!') → fulfilled"),
                          1000,
                        );
                        setTimeout(() => addLog(".then(v => '성공!')"), 1200);
                      }}
                    >
                      resolve() 실행
                    </ActionButton>
                    <ActionButton
                      variant="magenta"
                      onClick={() => {
                        clearLogs();
                        addLog("new Promise((_, reject) => ...)");
                        setTimeout(
                          () => addLog("→ reject('실패!') → rejected"),
                          1000,
                        );
                        setTimeout(() => addLog(".catch(e => '실패!')"), 1200);
                      }}
                    >
                      reject() 실행
                    </ActionButton>
                  </>
                )}
                {activeTab > 0 && (
                  <ActionButton
                    variant="cyan"
                    onClick={runSimulation}
                    disabled={isRunning}
                  >
                    {isRunning ? "실행 중..." : `${method.label} 시뮬레이션`}
                  </ActionButton>
                )}
              </>
            }
          >
            {/* Description */}
            <div className="p-4 border-b border-border-subtle">
              <div className="text-[11px] text-text-secondary leading-[1.8]">
                {method.description}
              </div>
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nPromise 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {method.code}
        </pre>

        {/* Promise State Visualization */}
        {activeTab > 0 && (
          <div>
            <SectionHeader>Promise States</SectionHeader>
            <div className="flex flex-col gap-2">
              {promises.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border p-3 transition-all duration-500 flex items-center justify-between"
                  style={{
                    borderColor: `${STATE_COLORS[p.state]}44`,
                    background: `${STATE_COLORS[p.state]}08`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: STATE_COLORS[p.state],
                        boxShadow:
                          p.state !== "pending"
                            ? `0 0 8px ${STATE_COLORS[p.state]}66`
                            : "none",
                      }}
                    />
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                      {p.label}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                      ({p.delay}ms)
                    </span>
                  </div>
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{ color: STATE_COLORS[p.state] }}
                  >
                    {p.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State Transition Diagram for basic tab */}
        {activeTab === 0 && (
          <div>
            <SectionHeader>State Transition</SectionHeader>
            <div className="flex items-center gap-4 p-4 bg-bg-deep rounded-lg">
              <div className="flex flex-col items-center gap-1">
                <div className="w-20 h-10 rounded-lg border border-[#ffb80044] bg-[#ffb80008] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-amber">
                    pending
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-xs">→ resolve()</span>
                  <div className="w-24 h-10 rounded-lg border border-[#00e67644] bg-[#00e67608] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green">
                      fulfilled
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-xs">
                    → reject() &nbsp;
                  </span>
                  <div className="w-24 h-10 rounded-lg border border-[#ff2d8a44] bg-[#ff2d8a08] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
                      rejected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DemoLayout>
    </>
  );
}
