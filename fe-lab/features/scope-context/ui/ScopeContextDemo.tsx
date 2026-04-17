"use client";

import { useState } from "react";
import { BINDING_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { useLog } from "@shared/hooks";
import { ScopeChainVisualization } from "./components/ScopeChainVisualization";

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
                  </>
                )}
                {activeTab === 1 && (
                  <>
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
                  </>
                )}
                {activeTab === 2 && (
                  <>
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
                        addLog(
                          "introduce.apply(user, ['Hi', '.']) → 'Hi, Kim.'",
                        )
                      }
                    >
                      apply() 실행
                    </ActionButton>
                    <ActionButton
                      variant="green"
                      onClick={() =>
                        addLog(
                          "boundFn('~') → 'Hey, Kim~'  // bind로 this 고정",
                        )
                      }
                    >
                      bind() 후 호출
                    </ActionButton>
                  </>
                )}
                {activeTab === 3 && (
                  <>
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
                  </>
                )}
              </>
            }
          >
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
          </RightPanel>
        }
      >
        {/* Code */}
        <CodeBlock>
          {example.code}
        </CodeBlock>

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

        {activeTab !== 3 && (
          <ScopeChainVisualization
            highlightedScope={highlightedScope}
            onHighlight={setHighlightedScope}
          />
        )}
      </DemoLayout>
    </>
  );
}
