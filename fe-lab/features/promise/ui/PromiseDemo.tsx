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
  CodeBlock,
} from "@shared/ui";
import { StateTransitionDiagram } from "./components/StateTransitionDiagram";

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
              <div className="text-label text-text-secondary leading-[1.8]">
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
        <CodeBlock>
          {method.code}
        </CodeBlock>

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
                    <span className="font-mono text-label text-text-primary">
                      {p.label}
                    </span>
                    <span className="font-mono text-caption text-text-muted">
                      ({p.delay}ms)
                    </span>
                  </div>
                  <span
                    className="font-mono text-caption font-semibold"
                    style={{ color: STATE_COLORS[p.state] }}
                  >
                    {p.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 0 && <StateTransitionDiagram />}
      </DemoLayout>
    </>
  );
}
