"use client";

interface BundleSizeIndicatorProps {
  componentId: string;
  bundleSize: string;
}

export function BundleSizeIndicator({
  componentId,
  bundleSize,
}: BundleSizeIndicatorProps) {
  const barWidth =
    componentId === "server" ? "2%" : componentId === "client" ? "60%" : "2%";
  const barColor = componentId === "client" ? "#ff2d8a" : "#00e676";

  return (
    <div className="flex items-center gap-3 bg-bg-deep rounded-lg p-3">
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
        Bundle:
      </span>
      <div className="flex-1 h-2 bg-bg-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: barWidth, background: barColor }}
        />
      </div>
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
        {bundleSize}
      </span>
    </div>
  );
}
