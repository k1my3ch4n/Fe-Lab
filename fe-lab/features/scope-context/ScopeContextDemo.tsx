"use client";

import { useState } from "react";
import { BINDING_EXAMPLES, SCOPE_CHAIN_LEVELS } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import { useLog } from "@shared/hooks";

export default function ScopeContextDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const { logs, addLog, clearLogs } = useLog();
  const [highlightedScope, setHighlightedScope] = useState<number | null>(null);

  const example = BINDING_EXAMPLES[activeTab];

  const handleReset = () => {
    clearLogs();
    setHighlightedScope(null);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    clearLogs();
    setHighlightedScope(null);
  };

  const tabs = BINDING_EXAMPLES.map((ex) => ({ id: ex.id, label: ex.label }));

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
            <PanelHeader onReset={handleReset} />

            {/* Action buttons */}
            <div className="p-4 border-b border-border-subtle">
              {activeTab === 0 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="cyan"
                    onClick={() =>
                      addLog("obj.greet() → 'Kim'  // this === obj")
                    }
                  >
                    obj.greet() 호출
                  </ActionButton>
                  <ActionButton
                    variant="magenta"
                    onClick={() =>
                      addLog("fn() → undefined  // this === window/undefined")
                    }
                  >
                    fn() 단독 호출
                  </ActionButton>
                </div>
              )}
              {activeTab === 1 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="magenta"
                    onClick={() =>
                      addLog(
                        "obj.greet() → undefined  // 화살표 함수: 상위 this",
                      )
                    }
                  >
                    obj.greet() (화살표)
                  </ActionButton>
                  <ActionButton
                    variant="green"
                    onClick={() =>
                      addLog("obj.delayGreet() → 'Kim'  // 콜백이 this 상속")
                    }
                  >
                    obj.delayGreet() (화살표 콜백)
                  </ActionButton>
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="cyan"
                    onClick={() =>
                      addLog(
                        "introduce.call(user, 'Hello', '!') → 'Hello, Kim!'",
                      )
                    }
                  >
                    call() 실행
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() =>
                      addLog("introduce.apply(user, ['Hi', '.']) → 'Hi, Kim.'")
                    }
                  >
                    apply() 실행
                  </ActionButton>
                  <ActionButton
                    variant="green"
                    onClick={() =>
                      addLog("boundFn('~') → 'Hey, Kim~'  // bind로 this 고정")
                    }
                  >
                    bind() 후 호출
                  </ActionButton>
                </div>
              )}
              {activeTab === 3 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="violet"
                    onClick={() => {
                      clearLogs();
                      addLog("// IIFE 실행");
                      addLog("secret = 'hidden'");
                      addLog("// 외부에서 접근 불가 → ReferenceError");
                    }}
                  >
                    IIFE 실행
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      clearLogs();
                      addLog("module.increment() → 1");
                      addLog("module.increment() → 2");
                      addLog("module.getCount() → 2");
                    }}
                  >
                    모듈 패턴 실행
                  </ActionButton>
                </div>
              )}
            </div>

            {/* Explanation */}
            <div className="p-4 border-b border-border-subtle">
              <div className="text-[11px] text-text-secondary leading-[1.8]">
                {example.explanation}
              </div>
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nthis 바인딩을 확인하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* this Value Indicator */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-bg-surface">
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
            this →
          </span>
          <span
            className="font-[family-name:var(--font-mono)] text-[12px] font-semibold"
            style={{ color: example.color }}
          >
            {example.thisValue}
          </span>
        </div>

        {/* Scope Chain Animation */}
        {activeTab === 3 ? null : (
          <div>
            <SectionHeader>Scope Chain</SectionHeader>
            <div className="flex flex-col gap-2">
              {SCOPE_CHAIN_LEVELS.map((scope, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHighlightedScope(i)}
                  onMouseLeave={() => setHighlightedScope(null)}
                  className="rounded-lg border p-3 transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor:
                      highlightedScope === i
                        ? `${scope.color}88`
                        : `${scope.color}44`,
                    background:
                      highlightedScope === i
                        ? `${scope.color}18`
                        : `${scope.color}08`,
                    marginLeft: `${i * 20}px`,
                    transform:
                      highlightedScope === i ? "scale(1.02)" : "scale(1)",
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
                        <span className="text-text-primary">{v.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DemoLayout>
    </>
  );
}
