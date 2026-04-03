"use client";

import { useState, useCallback } from "react";
import { STATE_APPROACHES, PROP_DRILLING_LEVELS } from "./constants";

export default function StateManagementDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [showDrilling, setShowDrilling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [highlightLevel, setHighlightLevel] = useState(-1);

  const approach = STATE_APPROACHES[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setShowDrilling(false);
    setHighlightLevel(-1);
  };

  const handleReset = () => {
    setLogs([]);
    setHighlightLevel(-1);
    setShowDrilling(false);
  };

  const handleShowDrilling = () => {
    setShowDrilling(true);
    setLogs([]);
    setHighlightLevel(0);

    let step = 0;
    const runStep = () => {
      if (step < PROP_DRILLING_LEVELS.length) {
        const level = PROP_DRILLING_LEVELS[step];
        setHighlightLevel(step);
        addLog(
          `${level.name} → props로 user 전달 ${
            level.hasState ? "(상태 보유)" : "(단순 전달)"
          }`,
        );
        step++;
        setTimeout(runStep, 500);
      } else {
        addLog("⚠ 5단계 prop drilling — 유지보수 어려움!");
      }
    };
    runStep();
  };

  const handleSimulate = () => {
    setLogs([]);
    if (approach.id === "context") {
      addLog("1. Provider에서 값 변경");
      setTimeout(() => {
        addLog("2. 모든 Consumer 리렌더 발생");
        setTimeout(() => {
          addLog("3. 불필요한 리렌더 포함 ⚠");
        }, 400);
      }, 400);
    } else if (approach.id === "redux") {
      addLog("1. dispatch(increment()) 호출");
      setTimeout(() => {
        addLog("2. Reducer가 새 state 반환");
        setTimeout(() => {
          addLog("3. useSelector 구독 컴포넌트만 리렌더 ✓");
        }, 400);
      }, 400);
    } else {
      addLog("1. set({ count: count + 1 }) 호출");
      setTimeout(() => {
        addLog("2. selector 비교 후 변경된 구독자만 리렌더 ✓");
        setTimeout(() => {
          addLog("3. Provider 없이 어디서든 접근 가능 ✓");
        }, 400);
      }, 400);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {STATE_APPROACHES.map((ap, i) => (
          <button
            key={ap.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {ap.label}
          </button>
        ))}
        <button
          onClick={() => handleTabChange(-1)}
          className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
            activeTab === -1
              ? "border-accent-magenta text-accent-magenta bg-bg-surface"
              : "border-transparent text-text-muted hover:text-text-secondary"
          }`}
        >
          Prop Drilling
        </button>
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {activeTab === -1 ? (
            /* Prop Drilling Visualization */
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Prop Drilling
              </div>
              <div className="flex flex-col gap-2">
                {PROP_DRILLING_LEVELS.map((level, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-3 transition-all duration-300"
                    style={{
                      borderColor:
                        showDrilling && i <= highlightLevel
                          ? `${level.color}88`
                          : `${level.color}22`,
                      background:
                        showDrilling && i <= highlightLevel
                          ? `${level.color}15`
                          : `${level.color}05`,
                      marginLeft: `${i * 24}px`,
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                      style={{ color: level.color }}
                    >
                      {"<"}
                      {level.name}
                      {">"}
                    </span>
                    {level.hasState && (
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted ml-2">
                        state: user
                      </span>
                    )}
                    {!level.hasState && showDrilling && i <= highlightLevel && (
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta ml-2">
                        props.user ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Code */}
              <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
                {approach.code}
              </pre>

              {/* Architecture Layers */}
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                  Architecture
                </div>
                <div className="flex flex-col gap-2">
                  {approach.layers.map((layer, i) => (
                    <div
                      key={i}
                      className="rounded-lg border p-3 transition-all duration-300"
                      style={{
                        borderColor: `${layer.color}44`,
                        background: `${layer.color}08`,
                        marginLeft: `${i * 16}px`,
                      }}
                    >
                      <div
                        className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                        style={{ color: layer.color }}
                      >
                        {layer.name}
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
                        {layer.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Panel */}
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

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            {activeTab === -1 ? (
              <button
                onClick={handleShowDrilling}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
              >
                Prop Drilling 시뮬레이션
              </button>
            ) : (
              <>
                <button
                  onClick={handleSimulate}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  상태 업데이트 시뮬레이션
                </button>
                {/* Pros / Cons inline */}
                <div className="mt-2">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mb-1">
                    장점
                  </div>
                  {approach.pros.map((p, i) => (
                    <div
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                    >
                      + {p}
                    </div>
                  ))}
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta mt-2 mb-1">
                    단점
                  </div>
                  {approach.cons.map((c, i) => (
                    <div
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                    >
                      - {c}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                상태 관리 흐름을 확인하세요
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
