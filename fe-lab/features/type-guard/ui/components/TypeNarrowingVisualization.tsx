interface TypeNarrowingVisualizationProps {
  beforeType: string;
  afterType: string;
  color: string;
  narrowedType: string | null;
}

export function TypeNarrowingVisualization({
  beforeType,
  afterType,
  color,
  narrowedType,
}: TypeNarrowingVisualizationProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Before Guard */}
      <div
        className="flex-1 rounded-lg border p-3"
        style={{
          borderColor: "#666",
          background: "#ffffff08",
        }}
      >
        <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1 text-text-muted">
          Before Guard
        </div>
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
          {beforeType}
        </div>
      </div>

      {/* Guard */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-1 rounded"
          style={{
            color: color,
            background: `${color}22`,
          }}
        >
          guard
        </div>
        <div className="text-text-muted text-lg">→</div>
      </div>

      {/* After Guard */}
      <div
        className="flex-1 rounded-lg border p-3"
        style={{
          borderColor: `${color}44`,
          background: `${color}08`,
        }}
      >
        <div
          className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
          style={{ color: color }}
        >
          After Guard
        </div>
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary whitespace-pre-line">
          {narrowedType ?? afterType}
        </div>
      </div>
    </div>
  );
}
