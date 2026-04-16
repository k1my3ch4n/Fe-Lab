"use client";

import { useState, useRef } from "react";
import { useLog } from "@shared/hooks";
import { REF_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
  InfoCard,
} from "@shared/ui";

export default function UseRefDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const { logs, addLog, clearLogs } = useLog();
  const [refDisplay, setRefDisplay] = useState(0);
  const [prevDisplay, setPrevDisplay] = useState<number | undefined>(undefined);
  const refCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(0);

  const example = REF_EXAMPLES[activeExample];

  // stateCount가 변경될 때마다 렌더링이 발생하므로 stateCount 자체가 렌더 카운트
  const renderCount = stateCount;

  const handleReset = () => {
    setStateCount(0);
    refCount.current = 0;
    setRefDisplay(0);
    setInputValue(0);
    setPrevDisplay(undefined);
    clearLogs();
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    handleReset();
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
          <>
            <PanelHeader onReset={handleReset} />

            <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
              {activeExample === 0 && (
                <>
                  <ActionButton
                    variant="cyan"
                    onClick={() => {
                      setStateCount((c) => c + 1);
                      addLog(`setState → ${stateCount + 1} (리렌더링 O)`);
                    }}
                  >
                    setState +1
                  </ActionButton>
                  <ActionButton
                    variant="violet"
                    onClick={() => {
                      refCount.current += 1;
                      addLog(`ref.current → ${refCount.current} (리렌더링 X)`);
                    }}
                  >
                    ref.current +1
                  </ActionButton>
                </>
              )}
              {activeExample === 1 && (
                <>
                  <ActionButton
                    variant="green"
                    onClick={() => {
                      inputRef.current?.focus();
                      addLog("inputRef.current.focus()");
                    }}
                  >
                    focus()
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      inputRef.current?.blur();
                      addLog("inputRef.current.blur()");
                    }}
                  >
                    blur()
                  </ActionButton>
                </>
              )}
              {activeExample === 2 && (
                <>
                  <ActionButton
                    variant="cyan"
                    onClick={() => {
                      const next = inputValue + 1;
                      addLog(
                        `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
                      );
                      setPrevDisplay(inputValue);
                      setInputValue(next);
                    }}
                  >
                    값 +1
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      const next = inputValue + 10;
                      addLog(
                        `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
                      );
                      setPrevDisplay(inputValue);
                      setInputValue(next);
                    }}
                  >
                    값 +10
                  </ActionButton>
                </>
              )}
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nuseRef 동작을 확인하세요"}
            />
          </>
        }
      >
        {/* Description */}
        <div className="text-sm text-text-secondary leading-[1.8]">
          {example.description}
        </div>

        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* Visualization */}
        {activeExample === 0 && (
          <div>
            <SectionHeader>Value Comparison</SectionHeader>
            <div className="flex gap-4">
              <InfoCard label="useState" value={stateCount} color="#00e5ff" />
              <InfoCard label="useRef" value={refDisplay} color="#b388ff" />
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex-1 font-[family-name:var(--font-mono)] text-[9px] text-text-muted pl-3">
                렌더링 횟수: {renderCount}
              </div>
              <div className="flex-1 font-[family-name:var(--font-mono)] text-[9px] text-text-muted pl-3">
                리렌더링 없음
              </div>
            </div>
          </div>
        )}

        {activeExample === 1 && (
          <div>
            <SectionHeader>DOM Reference</SectionHeader>
            <div
              className="rounded-lg border p-4"
              style={{
                borderColor: "var(--accent-green-dim)",
                background: "var(--accent-green-dim)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="useRef로 포커스 대상"
                className="w-full bg-bg-deep text-text-primary font-[family-name:var(--font-mono)] text-[12px] px-3 py-2 rounded border border-border-subtle outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
          </div>
        )}

        {activeExample === 2 && (
          <div>
            <SectionHeader>Previous Value Tracking</SectionHeader>
            <div className="flex gap-4">
              <InfoCard label="현재 값" value={inputValue} color="#00e5ff" />
              <InfoCard
                label="이전 값 (ref)"
                value={prevDisplay ?? "—"}
                color="#ffb800"
              />
            </div>
          </div>
        )}
      </DemoLayout>
    </>
  );
}
