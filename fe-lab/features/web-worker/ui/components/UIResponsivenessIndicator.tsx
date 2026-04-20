interface UIResponsivenessIndicatorProps {
  counter: number;
  uiBlocked: boolean;
  isRunning: boolean;
}

export function UIResponsivenessIndicator({
  counter,
  uiBlocked,
  isRunning,
}: UIResponsivenessIndicatorProps) {
  return (
    <div className="bg-bg-deep rounded-lg p-4 flex items-center justify-center gap-6">
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-lg font-bold transition-all duration-100"
          style={{
            borderColor: uiBlocked ? "#ff2d8a" : "#00e676",
            color: uiBlocked ? "#ff2d8a" : "#00e676",
          }}
        >
          {counter}
        </div>
        <div className="font-mono text-[9px] text-text-muted mt-1">
          카운터 (50ms)
        </div>
      </div>
      <div className="font-mono text-[10px] text-text-muted">
        {uiBlocked
          ? "⚠ UI 멈춤 — 메인 스레드 블로킹"
          : isRunning
            ? "✓ UI 정상 — 워커에서 연산 중"
            : "대기 중"}
      </div>
    </div>
  );
}
