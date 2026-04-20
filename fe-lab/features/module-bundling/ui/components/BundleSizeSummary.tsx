"use client";

interface BundleSizeSummaryProps {
  totalSize: number;
  optimizedSize: number;
  showOptimized: boolean;
}

export function BundleSizeSummary({
  totalSize,
  optimizedSize,
  showOptimized,
}: BundleSizeSummaryProps) {
  return (
    <div className="flex gap-4">
      <div
        className="flex-1 rounded-lg border p-3"
        style={{
          borderColor: "var(--accent-magenta-dim)",
          background: "var(--accent-magenta-dim)",
        }}
      >
        <div className="font-mono text-caption text-text-muted mb-1">
          최적화 전
        </div>
        <div
          className="font-mono text-[20px] font-bold"
          style={{ color: "var(--accent-magenta)" }}
        >
          {totalSize}KB
        </div>
      </div>
      <div
        className="flex-1 rounded-lg border p-3 transition-all duration-300"
        style={{
          borderColor: showOptimized ? "var(--accent-green-dim)" : "#ffffff11",
          background: showOptimized ? "var(--accent-green-dim)" : "#ffffff04",
        }}
      >
        <div className="font-mono text-caption text-text-muted mb-1">
          최적화 후
        </div>
        <div
          className="font-mono text-[20px] font-bold transition-colors duration-300"
          style={{
            color: showOptimized ? "var(--accent-green)" : "#ffffff33",
          }}
        >
          {showOptimized ? `${optimizedSize}KB` : "—"}
        </div>
      </div>
    </div>
  );
}
