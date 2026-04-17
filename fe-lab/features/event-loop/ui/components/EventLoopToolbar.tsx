import type { Scenario } from "../../model/types";

interface EventLoopToolbarProps {
  scenarios: Scenario[];
  activeScenario: number;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onScenarioChange: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onAutoplay: () => void;
  onReset: () => void;
}

export function EventLoopToolbar({
  scenarios,
  activeScenario,
  currentStep,
  totalSteps,
  isPlaying,
  onScenarioChange,
  onPrev,
  onNext,
  onAutoplay,
  onReset,
}: EventLoopToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border-subtle bg-bg-elevated">
      <div className="flex items-center gap-0">
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => onScenarioChange(i)}
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
      <div className="flex items-center gap-1 pr-3">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded cursor-pointer bg-transparent border-none text-text-muted transition-all duration-200 hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ◀ 이전
        </button>
        <button
          onClick={onAutoplay}
          className={`font-[family-name:var(--font-mono)] text-[10px] px-3 py-1.5 rounded cursor-pointer border transition-all duration-200 ${
            isPlaying
              ? "border-accent-magenta text-accent-magenta bg-accent-magenta-dim"
              : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
          }`}
        >
          {isPlaying ? "⏸ 정지" : "▶ 자동재생"}
        </button>
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded cursor-pointer bg-transparent border-none text-text-muted transition-all duration-200 hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed"
        >
          다음 ▶
        </button>
        <button
          onClick={onReset}
          className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1.5 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
        >
          리셋
        </button>
      </div>
    </div>
  );
}
