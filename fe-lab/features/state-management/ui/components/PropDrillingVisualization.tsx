interface PropDrillingLevel {
  name: string;
  color: string;
  hasState: boolean;
}

interface PropDrillingVisualizationProps {
  levels: PropDrillingLevel[];
  showDrilling: boolean;
  highlightLevel: number;
}

export function PropDrillingVisualization({
  levels,
  showDrilling,
  highlightLevel,
}: PropDrillingVisualizationProps) {
  return (
    <div className="flex flex-col gap-2">
      {levels.map((level, i) => (
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
  );
}
