"use client";

import { useState, useRef, useCallback } from "react";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  SectionHeader,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { ThreadDiagram, UIResponsivenessIndicator } from "./components";

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function WebWorkerDemo() {
  const [activeTab, setActiveTab] = useState<"main" | "worker">("main");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  const [uiBlocked, setUiBlocked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCounter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCounter(0);
    intervalRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, 50);
  }, []);

  const stopCounter = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const runOnMainThread = () => {
    setIsRunning(true);
    setResult(null);
    setElapsed(null);
    setUiBlocked(false);
    startCounter();

    // Allow UI to render before blocking
    requestAnimationFrame(() => {
      setUiBlocked(true);
      const start = performance.now();
      const res = fibonacci(38);
      const end = performance.now();
      setUiBlocked(false);
      setResult(String(res));
      setElapsed(Math.round(end - start));
      setIsRunning(false);
      stopCounter();
    });
  };

  const runOnWorker = () => {
    setIsRunning(true);
    setResult(null);
    setElapsed(null);
    setUiBlocked(false);
    startCounter();

    const start = performance.now();
    const blob = new Blob(
      [
        `
        function fibonacci(n) {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
        self.onmessage = function(e) {
          const result = fibonacci(e.data);
          self.postMessage(result);
        };
      `,
      ],
      { type: "application/javascript" },
    );
    const worker = new Worker(URL.createObjectURL(blob));
    worker.postMessage(38);
    worker.onmessage = (e) => {
      const end = performance.now();
      setResult(String(e.data));
      setElapsed(Math.round(end - start));
      setIsRunning(false);
      setUiBlocked(false);
      stopCounter();
      worker.terminate();
    };
  };

  const handleReset = () => {
    setResult(null);
    setElapsed(null);
    setCounter(0);
    setIsRunning(false);
    setUiBlocked(false);
    stopCounter();
  };

  const tabs = [
    { id: "main", label: "메인 스레드" },
    { id: "worker", label: "웹 워커" },
  ];

  const activeIndex = activeTab === "main" ? 0 : 1;

  const handleTabChange = (index: number) => {
    setActiveTab(index === 0 ? "main" : "worker");
    handleReset();
  };

  const rightPanel = (
    <RightPanel
      onReset={handleReset}
      actions={
        <ActionButton
          variant={activeTab === "main" ? "magenta" : "green"}
          onClick={activeTab === "main" ? runOnMainThread : runOnWorker}
          disabled={isRunning}
        >
          {isRunning
            ? "계산 중..."
            : `fibonacci(38) ${activeTab === "main" ? "— 메인 스레드" : "— 워커"}`}
        </ActionButton>
      }
    >
      {/* Result */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-label leading-relaxed">
        {result === null ? (
          <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8] whitespace-pre-line">
            {"실행 버튼을 클릭하여\n스레드 차이를 확인하세요"}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="px-2 py-1 rounded bg-bg-deep text-accent-cyan">
              결과: {result}
            </div>
            <div className="px-2 py-1 rounded bg-bg-deep text-accent-amber">
              소요 시간: {elapsed}ms
            </div>
            <div
              className="px-2 py-1 rounded bg-bg-deep"
              style={{
                color: activeTab === "main" ? "#ff2d8a" : "#00e676",
              }}
            >
              {activeTab === "main"
                ? `UI 블로킹 발생 (카운터 ${counter}에서 멈춤)`
                : `UI 정상 동작 (카운터 ${counter}까지 진행)`}
            </div>
          </div>
        )}
      </div>
    </RightPanel>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />

      <DemoLayout rightPanel={rightPanel}>
        <div>
          <SectionHeader>Thread Diagram</SectionHeader>
          <ThreadDiagram
            uiBlocked={uiBlocked}
            isRunning={isRunning}
            activeTab={activeTab}
          />
        </div>

        <div>
          <SectionHeader>UI Responsiveness</SectionHeader>
          <UIResponsivenessIndicator
            counter={counter}
            uiBlocked={uiBlocked}
            isRunning={isRunning}
          />
        </div>

        {/* Code Preview */}
        <CodeBlock>
          {activeTab === "main"
            ? `// 메인 스레드에서 피보나치 계산
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(38); // UI가 멈춤!`
            : `// 웹 워커에서 피보나치 계산
const worker = new Worker('fib-worker.js');
worker.postMessage(38);
worker.onmessage = (e) => {
  console.log(e.data); // UI는 정상 동작
};`}
        </CodeBlock>
      </DemoLayout>
    </>
  );
}
