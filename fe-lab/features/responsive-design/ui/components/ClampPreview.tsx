interface ClampPreviewProps {
  clampFontSize: number;
  clampPadding: number;
}

export function ClampPreview({ clampFontSize, clampPadding }: ClampPreviewProps) {
  return (
    <div className="p-3">
      <div
        className="rounded border border-border-subtle transition-all duration-300"
        style={{ padding: `${clampPadding}px` }}
      >
        <div
          className="font-bold text-accent-cyan mb-2 transition-all duration-300"
          style={{ fontSize: `${clampFontSize}px` }}
        >
          Fluid Text
        </div>
        <div className="font-mono text-caption text-text-muted">
          font-size: clamp(1rem, 2vw, 2rem)
        </div>
        <div className="font-mono text-caption text-text-muted">
          padding: clamp(0.5rem, 3vw, 3rem)
        </div>
        <div className="font-mono text-caption text-accent-amber mt-2">
          현재: {clampFontSize.toFixed(1)}px / {clampPadding.toFixed(1)}px
        </div>
      </div>
    </div>
  );
}
