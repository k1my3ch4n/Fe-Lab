import type { PrototypeNode } from "../../model/types";

export function ChainNode({
  node,
  index,
  isLast,
  isAnimating,
  isFound,
  isTraversed,
  isNotFoundEnd,
  searchProperty,
}: {
  node: PrototypeNode;
  index: number;
  isLast: boolean;
  isAnimating: boolean;
  isFound: boolean;
  isTraversed: boolean;
  isNotFoundEnd: boolean;
  searchProperty: string | null;
}) {
  const isNull = node.name === "null";

  const borderColor = isFound
    ? "#00e676"
    : isNotFoundEnd
      ? "#ff2d8a"
      : isAnimating
        ? "#00e5ff"
        : `${node.color}44`;

  const bgColor = isFound
    ? "#00e67610"
    : isNotFoundEnd
      ? "#ff2d8a10"
      : isAnimating
        ? "#00e5ff15"
        : `${node.color}08`;

  return (
    <div className="flex flex-col items-start">
      <div
        className="rounded-lg border p-3 w-full transition-all duration-300"
        style={{
          borderColor,
          background: bgColor,
          marginLeft: `${index * 16}px`,
          maxWidth: `calc(100% - ${index * 16}px)`,
          boxShadow: isAnimating
            ? "0 0 12px rgba(0, 229, 255, 0.2)"
            : isFound
              ? "0 0 12px rgba(0, 230, 118, 0.2)"
              : "none",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          {isAnimating && (
            <span className="text-[10px] text-accent-cyan animate-pulse">
              {">>"}
            </span>
          )}
          <span
            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
            style={{ color: node.color }}
          >
            {isNull ? "null (체인 끝)" : node.name}
          </span>
          {isFound && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-green bg-accent-green-dim px-1.5 py-0.5 rounded">
              FOUND
            </span>
          )}
          {isNotFoundEnd && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-magenta bg-accent-magenta-dim px-1.5 py-0.5 rounded">
              NOT FOUND
            </span>
          )}
        </div>
        {!isNull && (
          <div className="flex flex-wrap gap-1.5">
            {node.properties.map((p) => {
              const isMatch = isFound && searchProperty === p.name;
              return (
                <span
                  key={p.name}
                  className="font-[family-name:var(--font-mono)] text-[10px] px-2 py-1 rounded transition-all duration-200"
                  style={{
                    background: isMatch ? "#00e67620" : "var(--bg-deep)",
                    border: isMatch
                      ? "1px solid #00e67644"
                      : "1px solid transparent",
                  }}
                >
                  <span
                    style={{
                      color: isMatch ? "#00e676" : node.color,
                    }}
                  >
                    {p.name}
                  </span>
                  <span className="text-text-muted"> : </span>
                  <span className="text-text-primary">{p.value}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div
          className="flex flex-col items-center py-1"
          style={{ marginLeft: `${index * 16 + 24}px` }}
        >
          <div
            className={`w-px h-4 transition-colors duration-300 ${
              isTraversed ? "bg-accent-cyan" : "bg-border-subtle"
            }`}
          />
          <span
            className={`font-[family-name:var(--font-mono)] text-[9px] leading-none transition-colors duration-300 ${
              isTraversed ? "text-accent-cyan" : "text-text-muted"
            }`}
          >
            __proto__
          </span>
          <div
            className={`w-px h-4 transition-colors duration-300 ${
              isTraversed ? "bg-accent-cyan" : "bg-border-subtle"
            }`}
          />
          <span
            className={`text-[10px] leading-none transition-colors duration-300 ${
              isTraversed ? "text-accent-cyan" : "text-text-muted"
            }`}
          >
            {"v"}
          </span>
        </div>
      )}
    </div>
  );
}
