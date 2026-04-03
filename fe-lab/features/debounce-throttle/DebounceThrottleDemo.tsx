"use client";

import { useState, useCallback, useRef } from "react";
import { DEMO_MODES, DELAY_OPTIONS } from "./constants";

interface TimelineEvent {
  time: number;
  type: "raw" | "debounce" | "throttle";
}

export default function DebounceThrottleDemo() {
  const [activeMode, setActiveMode] = useState(0);
  const [delay, setDelay] = useState(500);
  const [rawCount, setRawCount] = useState(0);
  const [debounceCount, setDebounceCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throttleLastRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleModeChange = (index: number) => {
    setActiveMode(index);
    handleReset();
  };

  const handleReset = () => {
    setRawCount(0);
    setDebounceCount(0);
    setThrottleCount(0);
    setTimeline([]);
    setLogs([]);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    throttleLastRef.current = 0;
    startTimeRef.current = Date.now();
  };

  const handleInput = () => {
    const now = Date.now();
    const elapsed = now - startTimeRef.current;

    // Raw event
    setRawCount((prev) => prev + 1);
    setTimeline((prev) => [...prev, { time: elapsed, type: "raw" }]);

    // Debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      const debounceTime = Date.now() - startTimeRef.current;
      setDebounceCount((prev) => prev + 1);
      setTimeline((prev) => [
        ...prev,
        { time: debounceTime, type: "debounce" },
      ]);
      addLog(`디바운스 실행 (${debounceTime}ms)`);
    }, delay);

    // Throttle
    if (now - throttleLastRef.current >= delay) {
      throttleLastRef.current = now;
      setThrottleCount((prev) => prev + 1);
      setTimeline((prev) => [...prev, { time: elapsed, type: "throttle" }]);
      addLog(`쓰로틀 실행 (${elapsed}ms)`);
    }
  };

  const maxTime = Math.max(...timeline.map((e) => e.time), 1000);

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {DEMO_MODES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleModeChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeMode
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Timeline + Counters */}
        <div className="p-6 flex flex-col gap-5">
          {/* Input area */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-2">
              이벤트 발생 영역 (빠르게 클릭하세요)
            </div>
            <button
              onClick={handleInput}
              className="w-full h-16 rounded-lg border-2 border-dashed border-accent-cyan text-accent-cyan font-[family-name:var(--font-mono)] text-[14px] bg-accent-cyan-dim cursor-pointer transition-all duration-100 hover:bg-[#00e5ff22] active:scale-[0.98]"
            >
              Click / Tap 이벤트 발생
            </button>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border-subtle p-3 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                Raw
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-cyan">
                {rawCount}
              </div>
            </div>
            <div className="rounded-lg border border-border-subtle p-3 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                Debounce
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-green">
                {debounceCount}
              </div>
            </div>
            <div className="rounded-lg border border-border-subtle p-3 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                Throttle
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-amber">
                {throttleCount}
              </div>
            </div>
          </div>

          {/* Timeline visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Timeline
            </div>
            <div className="bg-bg-deep rounded-lg p-4 min-h-[120px]">
              {/* Raw events */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-cyan w-16">
                  Raw
                </span>
                <div className="flex-1 relative h-4 bg-bg-surface rounded">
                  {timeline
                    .filter((e) => e.type === "raw")
                    .map((e, i) => (
                      <div
                        key={i}
                        className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-cyan"
                        style={{ left: `${(e.time / maxTime) * 100}%` }}
                      />
                    ))}
                </div>
              </div>
              {/* Debounce events */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-green w-16">
                  Debounce
                </span>
                <div className="flex-1 relative h-4 bg-bg-surface rounded">
                  {timeline
                    .filter((e) => e.type === "debounce")
                    .map((e, i) => (
                      <div
                        key={i}
                        className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-green"
                        style={{ left: `${(e.time / maxTime) * 100}%` }}
                      />
                    ))}
                </div>
              </div>
              {/* Throttle events */}
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-amber w-16">
                  Throttle
                </span>
                <div className="flex-1 relative h-4 bg-bg-surface rounded">
                  {timeline
                    .filter((e) => e.type === "throttle")
                    .map((e, i) => (
                      <div
                        key={i}
                        className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-amber"
                        style={{ left: `${(e.time / maxTime) * 100}%` }}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls + Log */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              설정
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Delay selector */}
          <div className="p-4 border-b border-border-subtle">
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-2">
              Delay
            </div>
            <div className="flex flex-col gap-2">
              {DELAY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setDelay(opt.value);
                    handleReset();
                  }}
                  className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                    delay === opt.value
                      ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                      : "border-border-subtle text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                이벤트 영역을 빠르게
                <br />
                클릭하여 차이를 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
