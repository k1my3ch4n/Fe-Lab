import { SCOPE_CHAIN_LEVELS } from "../../model/constants";
import { SectionHeader } from "@shared/ui";

interface ScopeChainVisualizationProps {
  highlightedScope: number | null;
  onHighlight: (index: number | null) => void;
}

export function ScopeChainVisualization({
  highlightedScope,
  onHighlight,
}: ScopeChainVisualizationProps) {
  return (
    <div>
      <SectionHeader>Scope Chain</SectionHeader>
      <div className="flex flex-col gap-2">
        {SCOPE_CHAIN_LEVELS.map((scope, i) => (
          <div
            key={i}
            onMouseEnter={() => onHighlight(i)}
            onMouseLeave={() => onHighlight(null)}
            className="rounded-lg border p-3 transition-all duration-300 cursor-pointer"
            style={{
              borderColor:
                highlightedScope === i
                  ? `${scope.color}88`
                  : `${scope.color}44`,
              background:
                highlightedScope === i
                  ? `${scope.color}18`
                  : `${scope.color}08`,
              marginLeft: `${i * 20}px`,
              transform: highlightedScope === i ? "scale(1.02)" : "scale(1)",
            }}
          >
            <div
              className="font-mono text-caption font-semibold mb-1.5"
              style={{ color: scope.color }}
            >
              {scope.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {scope.variables.map((v, j) => (
                <span
                  key={j}
                  className="font-mono text-caption bg-bg-deep px-2 py-1 rounded"
                >
                  <span style={{ color: scope.color }}>{v.name}</span>
                  <span className="text-text-muted"> = </span>
                  <span className="text-text-primary">{v.value}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
