"use client";

import { useState, useRef, useCallback } from "react";
import { pipelineData } from "./pipeline-steps";

export default function RenderPipelineDemo() {
  const [currentStep, setCurrentStep] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const goToStep = (step: number) => {
    stopAutoPlay();
    setCurrentStep(step);
  };

  const pipelineStep = (dir: number) => {
    stopAutoPlay();
    setCurrentStep((prev) => {
      const next = prev + dir;

      if (next >= 0 && next < pipelineData.length) {
        return next;
      }

      return prev;
    });
  };

  const pipelinePlay = () => {
    if (isPlaying) {
      stopAutoPlay();
      return;
    }

    setIsPlaying(true);
    setCurrentStep((prev) => (prev >= pipelineData.length - 1 ? -1 : prev));

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;

        if (next >= pipelineData.length - 1) {
          stopAutoPlay();
        }

        return next;
      });
    }, 1500);
  };

  const pipelineReset = () => {
    stopAutoPlay();
    setCurrentStep(-1);
  };

  const progress =
    currentStep >= 0 ? ((currentStep + 1) / pipelineData.length) * 100 : 0;
  const activeStep = currentStep >= 0 ? pipelineData[currentStep] : null;

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle bg-bg-elevated flex-wrap">
        <button
          onClick={pipelinePlay}
          className={`pipe-btn ${isPlaying ? "playing" : ""}`}
        >
          {isPlaying ? "⏸ 일시 정지" : "▶ 자동 재생"}
        </button>
        <button onClick={() => pipelineStep(-1)} className="pipe-btn">
          ← 이전
        </button>
        <button onClick={() => pipelineStep(1)} className="pipe-btn">
          다음 →
        </button>
        <div className="flex-1 h-[3px] bg-bg-deep rounded-sm overflow-hidden mx-2">
          <div
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-magenta rounded-sm transition-[width] duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted whitespace-nowrap">
          {currentStep + 1} / {pipelineData.length}
        </span>
        <button onClick={pipelineReset} className="pipe-btn">
          ↺ 리셋
        </button>
      </div>

      {/* Pipeline body */}
      <div className="p-8">
        {/* Steps */}
        <div className="flex items-start overflow-x-auto pb-4">
          {pipelineData.map((step, i) => (
            <div key={i} className="flex items-start shrink-0">
              <StepCard
                step={step}
                index={i}
                currentStep={currentStep}
                onClick={() => goToStep(i)}
              />
              {i < pipelineData.length - 1 && (
                <div
                  className={`text-base pt-5 px-1 shrink-0 transition-opacity duration-500 ${
                    i < currentStep
                      ? "opacity-100 text-accent-cyan"
                      : "opacity-30 text-text-muted"
                  }`}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail */}
        <div
          className="mt-7 bg-bg-elevated border border-border-subtle rounded-[var(--radius)] p-6 min-h-[130px] transition-all duration-300"
          style={{
            borderColor: activeStep ? `${activeStep.color}44` : undefined,
          }}
        >
          {activeStep ? (
            <StepDetail step={activeStep} />
          ) : (
            <>
              <div className="font-[family-name:var(--font-display)] text-base font-semibold mb-2">
                ▶ 재생 버튼을 누르거나 &apos;다음&apos;을 클릭하세요
              </div>
              <div className="text-[13px] text-text-muted">
                브라우저 렌더링의 각 단계를 순서대로 살펴볼 수 있습니다.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function StepCard({
  step,
  index,
  currentStep,
  onClick,
}: {
  step: { icon: string; name: string; time: string; color: string };
  index: number;
  currentStep: number;
  onClick: () => void;
}) {
  const isActive = index === currentStep;
  const isDone = index < currentStep;

  return (
    <div
      onClick={onClick}
      className={`w-[115px] text-center cursor-pointer transition-all duration-500 ${
        isActive
          ? "opacity-100 translate-y-0"
          : isDone
            ? "opacity-60 translate-y-0"
            : "opacity-25 translate-y-2"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl mx-auto mb-2.5 border relative transition-all duration-500 ${
          isActive ? "scale-110" : ""
        }`}
        style={{
          background: `${step.color}15`,
          borderColor: `${step.color}33`,
          boxShadow: isActive ? `0 0 30px ${step.color}` : "none",
        }}
      >
        {step.icon}
        {isActive && (
          <span
            className="absolute inset-0 rounded-[inherit] animate-[pulseRing_1.5s_ease_infinite]"
            style={{ border: `2px solid ${step.color}` }}
          />
        )}
      </div>
      <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-text-primary mb-1">
        {step.name}
      </div>
      <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
        {step.time}
      </div>
    </div>
  );
}

function StepDetail({
  step,
}: {
  step: {
    icon: string;
    title: string;
    desc: string;
    visual: string;
    color: string;
  };
}) {
  return (
    <>
      <div
        className="font-[family-name:var(--font-display)] text-base font-semibold mb-2 flex items-center gap-2"
        style={{ color: step.color }}
      >
        {step.icon} {step.title}
      </div>
      <div className="text-[13px] text-text-secondary leading-[1.8]">
        {step.desc}
      </div>
      <pre className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
        {step.visual}
      </pre>
    </>
  );
}
