"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { STATE_APPROACHES, PROP_DRILLING_LEVELS } from "../model/constants";

export default function StateManagementDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [showDrilling, setShowDrilling] = useState(false);
  const [highlightLevel, setHighlightLevel] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const approach = STATE_APPROACHES[activeTab];

  const handleTabChange = (index: number) => {
    clearTimers();
    setActiveTab(index);
    clearLogs();
    setShowDrilling(false);
    setHighlightLevel(-1);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    setHighlightLevel(-1);
    setShowDrilling(false);
  };

  const handleShowDrilling = () => {
    setShowDrilling(true);
    clearLogs();
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
        addTimer(runStep, 500);
      } else {
        addLog("⚠ 5단계 prop drilling — 유지보수 어려움!");
      }
    };
    runStep();
  };

  const handleSimulate = () => {
    clearLogs();
    if (approach.id === "context") {
      addLog("1. Provider에서 값 변경");
      addTimer(() => {
        addLog("2. 모든 Consumer 리렌더 발생");
        addTimer(() => {
          addLog("3. 불필요한 리렌더 포함 ⚠");
        }, 400);
      }, 400);
    } else if (approach.id === "redux") {
      addLog("1. dispatch(increment()) 호출");
      addTimer(() => {
        addLog("2. Reducer가 새 state 반환");
        addTimer(() => {
          addLog("3. useSelector 구독 컴포넌트만 리렌더 ✓");
        }, 400);
      }, 400);
    } else {
      addLog("1. set({ count: count + 1 }) 호출");
      addTimer(() => {
        addLog("2. selector 비교 후 변경된 구독자만 리렌더 ✓");
        addTimer(() => {
          addLog("3. Provider 없이 어디서든 접근 가능 ✓");
        }, 400);
      }, 400);
    }
  };

  const rightPanel = (
    <RightPanel
      onReset={handleReset}
      actions={
        activeTab === -1 ? (
          <ActionButton variant="magenta" onClick={handleShowDrilling}>
            Prop Drilling 시뮬레이션
          </ActionButton>
        ) : (
          <>
            <ActionButton variant="cyan" onClick={handleSimulate}>
              상태 업데이트 시뮬레이션
            </ActionButton>
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
        )
      }
    >
      <LogPanel
        logs={logs}
        emptyMessage={"버튼을 클릭하여\n상태 관리 흐름을 확인하세요"}
      />
    </RightPanel>
  );

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

      <DemoLayout rightPanel={rightPanel}>
        {activeTab === -1 ? (
          /* Prop Drilling Visualization */
          <div>
            <SectionHeader>Prop Drilling</SectionHeader>
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
            <CodeBlock>
              {approach.code}
            </CodeBlock>

            {/* Architecture Layers */}
            <div>
              <SectionHeader>Architecture</SectionHeader>
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
      </DemoLayout>
    </>
  );
}
