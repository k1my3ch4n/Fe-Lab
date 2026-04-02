"use client";

import { useState, useCallback, useRef } from "react";
import { CORS_SCENARIOS } from "./constants";
import type { CorsStep } from "./constants";

export default function CorsDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = CORS_SCENARIOS[activeScenario];

  const resetDemo = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStep(-1);
    setIsPlaying(false);
  }, []);

  const handleScenarioChange = (index: number) => {
    resetDemo();
    setActiveScenario(index);
  };

  const playSteps = useCallback(() => {
    resetDemo();
    setIsPlaying(true);
    const steps = CORS_SCENARIOS[activeScenario].steps;

    steps.forEach((_, i) => {
      const timer = setTimeout(
        () => {
          setCurrentStep(i);
          if (i === steps.length - 1) {
            setIsPlaying(false);
          }
        },
        (i + 1) * 1200,
      );
      if (i === 0) timerRef.current = timer;
    });
  }, [activeScenario, resetDemo]);

  const stepForward = () => {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {CORS_SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => handleScenarioChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeScenario
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Request Flow Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Browser / Server Boxes */}
          <div className="flex items-start justify-between gap-4">
            {/* Browser */}
            <div className="flex-1 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-4 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-accent-cyan mb-1">
                Browser
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                https://app.example.com
              </div>
            </div>

            {/* Arrow area */}
            <div className="flex-1 flex items-center justify-center pt-2">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
                {currentStep === -1
                  ? "대기 중"
                  : `Step ${currentStep + 1} / ${scenario.steps.length}`}
              </div>
            </div>

            {/* Server */}
            <div className="flex-1 rounded-lg border border-accent-amber/30 bg-accent-amber/5 p-4 text-center">
              <div className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-accent-amber mb-1">
                Server
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                https://api.other.com
              </div>
            </div>
          </div>

          {/* Step-by-step flow */}
          <div className="flex flex-col gap-3">
            {scenario.steps.map((step, i) => (
              <StepRow
                key={i}
                step={step}
                index={i}
                active={i <= currentStep}
                current={i === currentStep}
                isError={!scenario.success && i === scenario.steps.length - 1}
              />
            ))}
          </div>

          {/* Result */}
          {currentStep === scenario.steps.length - 1 && (
            <div
              className={`rounded-lg border p-3 text-center font-[family-name:var(--font-mono)] text-[12px] transition-all duration-300 animate-[logSlide_0.3s_ease] ${
                scenario.success
                  ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                  : "border-accent-magenta/40 bg-accent-magenta/10 text-accent-magenta"
              }`}
            >
              {scenario.success
                ? "✓ 요청 성공 — 브라우저가 응답을 수신했습니다"
                : "✕ CORS 에러 — 브라우저가 응답을 차단했습니다"}
            </div>
          )}

          {/* Summary */}
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-muted bg-bg-deep rounded-lg p-3 leading-[1.8]">
            {scenario.summary}
          </div>
        </div>

        {/* Right: Control Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              제어
            </span>
            <button
              onClick={resetDemo}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
              onClick={playSteps}
              disabled={isPlaying}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                isPlaying
                  ? "border-border-subtle text-text-muted bg-bg-surface cursor-not-allowed"
                  : "border-accent-cyan text-accent-cyan bg-accent-cyan-dim hover:bg-[#00e5ff33]"
              }`}
            >
              {isPlaying ? "재생 중..." : "▶ 전체 재생"}
            </button>
            <button
              onClick={stepForward}
              disabled={isPlaying || currentStep >= scenario.steps.length - 1}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                isPlaying || currentStep >= scenario.steps.length - 1
                  ? "border-border-subtle text-text-muted bg-bg-surface cursor-not-allowed"
                  : "border-accent-amber text-accent-amber bg-accent-amber-dim hover:bg-[#ffb80033]"
              }`}
            >
              다음 단계 →
            </button>
          </div>

          {/* Current step detail */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {currentStep === -1 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                CORS 요청 흐름을
                <br />
                단계별로 확인하세요
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-accent-cyan font-semibold text-[12px]">
                  {scenario.steps[currentStep].label}
                </div>
                <div className="text-text-secondary text-[11px] leading-[1.8]">
                  {scenario.steps[currentStep].description}
                </div>
                <div className="flex flex-col gap-1.5">
                  {scenario.steps[currentStep].headers.map((h, j) => (
                    <div
                      key={j}
                      className="bg-bg-deep rounded px-2 py-1.5 animate-[logSlide_0.3s_ease]"
                    >
                      <span style={{ color: h.color }}>{h.name}</span>
                      <span className="text-text-muted">: </span>
                      <span className="text-text-primary text-[10px]">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StepRow({
  step,
  index,
  active,
  current,
  isError,
}: {
  step: CorsStep;
  index: number;
  active: boolean;
  current: boolean;
  isError: boolean;
}) {
  const isRight = step.direction === "right";

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-300 ${
        current
          ? isError
            ? "border-accent-magenta/40 bg-accent-magenta/5"
            : "border-accent-cyan/40 bg-accent-cyan/5"
          : active
            ? "border-border-subtle bg-bg-surface opacity-70"
            : "border-border-subtle bg-bg-deep opacity-40"
      }`}
    >
      {/* Step number */}
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[10px] font-bold ${
          current
            ? isError
              ? "bg-accent-magenta/20 text-accent-magenta"
              : "bg-accent-cyan/20 text-accent-cyan"
            : active
              ? "bg-bg-elevated text-text-muted"
              : "bg-bg-deep text-text-muted"
        }`}
      >
        {index + 1}
      </div>

      {/* Arrow */}
      <div
        className={`font-[family-name:var(--font-mono)] text-[12px] flex-shrink-0 ${
          current
            ? isError
              ? "text-accent-magenta"
              : "text-accent-cyan"
            : "text-text-muted"
        }`}
      >
        {isRight ? "→" : "←"}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <div
          className={`font-[family-name:var(--font-mono)] text-[11px] font-semibold ${
            current
              ? isError
                ? "text-accent-magenta"
                : "text-accent-cyan"
              : "text-text-secondary"
          }`}
        >
          {step.label}
        </div>
        {active && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {step.headers.map((h, j) => (
              <span
                key={j}
                className="font-[family-name:var(--font-mono)] text-[9px] bg-bg-deep px-1.5 py-0.5 rounded"
              >
                <span style={{ color: h.color }}>{h.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Direction indicator */}
      <div
        className={`font-[family-name:var(--font-mono)] text-[9px] flex-shrink-0 uppercase tracking-wider ${
          isRight
            ? "text-accent-cyan"
            : isError
              ? "text-accent-magenta"
              : "text-accent-green"
        }`}
      >
        {isRight ? "REQ" : "RES"}
      </div>
    </div>
  );
}
