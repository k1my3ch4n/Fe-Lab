"use client";

import { useState } from "react";
import { CLOSURE_EXAMPLES, TABS } from "../model/constants";
import { useLog } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";

export default function ClosureDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [counterValue, setCounterValue] = useState(0);
  const { logs, addLog, clearLogs } = useLog();

  const example = CLOSURE_EXAMPLES[activeExample];

  const handleCounterClick = () => {
    const next = counterValue + 1;
    setCounterValue(next);
    addLog(`counter() → ${next}  // count가 ${next}로 증가`);
  };

  const handleReset = () => {
    setCounterValue(0);
    clearLogs();
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCounterValue(0);
    clearLogs();
  };

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <>
                {activeExample === 0 && (
                  <ActionButton variant="cyan" onClick={handleCounterClick}>
                    counter() 호출
                  </ActionButton>
                )}
                {activeExample === 1 && (
                  <>
                    <ActionButton
                      variant="green"
                      onClick={() => addLog("wallet.deposit(500) → 1500")}
                    >
                      wallet.deposit(500)
                    </ActionButton>
                    <ActionButton
                      variant="amber"
                      onClick={() => addLog("wallet.getBalance() → 1500")}
                    >
                      wallet.getBalance()
                    </ActionButton>
                    <ActionButton
                      variant="magenta"
                      onClick={() => addLog("wallet.balance → undefined ❌")}
                    >
                      wallet.balance (직접 접근)
                    </ActionButton>
                  </>
                )}
                {activeExample === 2 && (
                  <>
                    <ActionButton
                      variant="magenta"
                      onClick={() => {
                        clearLogs();
                        addLog("// var 사용 (문제)");
                        addLog("→ 3, 3, 3");
                      }}
                    >
                      var로 실행 (버그)
                    </ActionButton>
                    <ActionButton
                      variant="green"
                      onClick={() => {
                        clearLogs();
                        addLog("// IIFE 클로저 사용");
                        addLog("→ 0, 1, 2 ✓");
                      }}
                    >
                      IIFE로 실행 (해결)
                    </ActionButton>
                    <ActionButton
                      variant="cyan"
                      onClick={() => {
                        clearLogs();
                        addLog("// let 블록 스코프 사용");
                        addLog("→ 0, 1, 2 ✓");
                      }}
                    >
                      let으로 실행 (해결)
                    </ActionButton>
                  </>
                )}
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n클로저 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* Scope Chain Visualization */}
        <div>
          <SectionHeader>Scope Chain</SectionHeader>
          <div className="flex flex-col gap-2">
            {example.scopes.map((scope, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 transition-all duration-300"
                style={{
                  borderColor: `${scope.color}44`,
                  background: `${scope.color}08`,
                  marginLeft: `${i * 20}px`,
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1.5"
                  style={{ color: scope.color }}
                >
                  {scope.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {scope.variables.map((v, j) => (
                    <span
                      key={j}
                      className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-1 rounded"
                    >
                      <span style={{ color: scope.color }}>{v.name}</span>
                      <span className="text-text-muted"> = </span>
                      <span className="text-text-primary">
                        {v.name === "count" && activeExample === 0
                          ? String(counterValue)
                          : v.value}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
