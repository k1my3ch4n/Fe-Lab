"use client";

import { useState, useRef, useCallback } from "react";

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

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["main", "worker"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              handleReset();
            }}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              tab === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab === "main" ? "메인 스레드" : "웹 워커"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Thread Diagram */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Thread Diagram
            </div>
            <div className="flex flex-col gap-3">
              {/* Main Thread */}
              <div
                className="rounded-lg border p-3 transition-all duration-300"
                style={{
                  borderColor: uiBlocked ? "#ff2d8a44" : "#00e5ff44",
                  background: uiBlocked ? "#ff2d8a08" : "#00e5ff08",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{
                      color: uiBlocked ? "#ff2d8a" : "#00e5ff",
                    }}
                  >
                    Main Thread
                  </span>
                  <span
                    className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-0.5 rounded"
                    style={{
                      background: uiBlocked ? "#ff2d8a22" : "#00e67622",
                      color: uiBlocked ? "#ff2d8a" : "#00e676",
                    }}
                  >
                    {uiBlocked ? "BLOCKED" : "IDLE"}
                  </span>
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
                  UI 렌더링, 이벤트 처리, DOM 조작
                </div>
              </div>

              {/* Worker Thread (shown when worker tab) */}
              {activeTab === "worker" && (
                <div
                  className="rounded-lg border p-3 transition-all duration-300"
                  style={{
                    borderColor: isRunning ? "#00e67644" : "#b388ff44",
                    background: isRunning ? "#00e67608" : "#b388ff08",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                      style={{
                        color: isRunning ? "#00e676" : "#b388ff",
                      }}
                    >
                      Worker Thread
                    </span>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-0.5 rounded"
                      style={{
                        background: isRunning ? "#ffb80022" : "#b388ff22",
                        color: isRunning ? "#ffb800" : "#b388ff",
                      }}
                    >
                      {isRunning ? "COMPUTING" : "READY"}
                    </span>
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
                    별도 스레드에서 연산 수행, UI 블로킹 없음
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* UI Responsiveness Indicator */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              UI Responsiveness
            </div>
            <div className="bg-bg-deep rounded-lg p-4 flex items-center justify-center gap-6">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-[family-name:var(--font-mono)] text-lg font-bold transition-all duration-100"
                  style={{
                    borderColor: uiBlocked ? "#ff2d8a" : "#00e676",
                    color: uiBlocked ? "#ff2d8a" : "#00e676",
                  }}
                >
                  {counter}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mt-1">
                  카운터 (50ms)
                </div>
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                {uiBlocked
                  ? "⚠ UI 멈춤 — 메인 스레드 블로킹"
                  : isRunning
                    ? "✓ UI 정상 — 워커에서 연산 중"
                    : "대기 중"}
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
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
          </pre>
        </div>

        {/* Right: Action Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              실행
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          <div className="p-4 border-b border-border-subtle">
            <button
              onClick={activeTab === "main" ? runOnMainThread : runOnWorker}
              disabled={isRunning}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                activeTab === "main"
                  ? "border-accent-magenta text-accent-magenta bg-accent-magenta-dim hover:bg-[#ff2d8a33]"
                  : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRunning
                ? "계산 중..."
                : `fibonacci(38) ${activeTab === "main" ? "— 메인 스레드" : "— 워커"}`}
            </button>
          </div>

          {/* Result */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {result === null ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                실행 버튼을 클릭하여
                <br />
                스레드 차이를 확인하세요
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
        </div>
      </div>
    </>
  );
}
