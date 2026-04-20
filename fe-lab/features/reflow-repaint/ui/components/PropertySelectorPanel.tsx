import { CATEGORY_META } from "../../model/constants";
import type { CSSPropertyInfo } from "../../model/types";

interface PropertySelectorPanelProps {
  properties: CSSPropertyInfo[];
  activeProperty: CSSPropertyInfo;
  onPropertyClick: (prop: CSSPropertyInfo) => void;
}

export function PropertySelectorPanel({
  properties,
  activeProperty,
  onPropertyClick,
}: PropertySelectorPanelProps) {
  return (
    <div className="border-l border-border-subtle flex flex-col">
      <div className="px-4 py-3 border-b border-border-subtle">
        <span className="font-mono text-label font-semibold text-text-secondary uppercase tracking-wider">
          CSS 속성 선택
        </span>
      </div>

      <div className="p-3 flex flex-col gap-1.5 overflow-y-auto flex-1">
        {properties.map((prop) => {
          const meta = CATEGORY_META[prop.category];
          const isActive = activeProperty.name === prop.name;
          return (
            <button
              key={prop.name}
              onClick={() => onPropertyClick(prop)}
              className={`w-full text-left font-mono text-[12px] px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-bg-surface"
                  : "bg-transparent hover:bg-bg-surface"
              }`}
              style={{
                borderColor: isActive ? `${meta.color}66` : "transparent",
                color: isActive ? meta.color : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <span className={isActive ? "" : "text-text-primary"}>
                  {prop.label}
                </span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded"
                  style={{
                    background: `${meta.color}22`,
                    color: meta.color,
                  }}
                >
                  {prop.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="p-3 border-t border-border-subtle">
        <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider mb-2">
          파이프라인 상태
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-amber" />
            <span className="font-mono text-caption text-text-muted">
              실행됨 (비용 발생)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-green" />
            <span className="font-mono text-caption text-text-muted">
              건너뜀 (최적화)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
