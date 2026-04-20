import {
  JUSTIFY_OPTIONS,
  ALIGN_OPTIONS,
  DIRECTION_OPTIONS,
  WRAP_OPTIONS,
  GRID_TEMPLATE_OPTIONS,
} from "../../model/constants";

type Mode = "flexbox" | "grid";

interface FlexboxControlsProps {
  mode: Mode;
  // Flexbox
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
  flexWrap: string;
  gap: number;
  onJustifyChange: (value: string) => void;
  onAlignChange: (value: string) => void;
  onDirectionChange: (value: string) => void;
  onWrapChange: (value: string) => void;
  onGapChange: (value: number) => void;
  // Grid
  gridTemplate: string;
  gridGap: number;
  gridAlignItems: string;
  onGridTemplateChange: (value: string) => void;
  onGridGapChange: (value: number) => void;
  onGridAlignChange: (value: string) => void;
}

export function FlexboxControls({
  mode,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  gap,
  onJustifyChange,
  onAlignChange,
  onDirectionChange,
  onWrapChange,
  onGapChange,
  gridTemplate,
  gridGap,
  gridAlignItems,
  onGridTemplateChange,
  onGridGapChange,
  onGridAlignChange,
}: FlexboxControlsProps) {
  const selectClass =
    "w-full font-mono text-label bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5";
  const labelClass =
    "font-mono text-caption text-text-muted block mb-1";

  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
      {mode === "flexbox" ? (
        <>
          <div>
            <label className={labelClass}>justify-content</label>
            <select
              value={justifyContent}
              onChange={(e) => onJustifyChange(e.target.value)}
              className={selectClass}
            >
              {JUSTIFY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>align-items</label>
            <select
              value={alignItems}
              onChange={(e) => onAlignChange(e.target.value)}
              className={selectClass}
            >
              {ALIGN_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>flex-direction</label>
            <select
              value={flexDirection}
              onChange={(e) => onDirectionChange(e.target.value)}
              className={selectClass}
            >
              {DIRECTION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>flex-wrap</label>
            <select
              value={flexWrap}
              onChange={(e) => onWrapChange(e.target.value)}
              className={selectClass}
            >
              {WRAP_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>gap: {gap}px</label>
            <input
              type="range"
              min={0}
              max={32}
              value={gap}
              onChange={(e) => onGapChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className={labelClass}>grid-template-columns</label>
            <select
              value={gridTemplate}
              onChange={(e) => onGridTemplateChange(e.target.value)}
              className={selectClass}
            >
              {GRID_TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>align-items</label>
            <select
              value={gridAlignItems}
              onChange={(e) => onGridAlignChange(e.target.value)}
              className={selectClass}
            >
              {ALIGN_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>gap: {gridGap}px</label>
            <input
              type="range"
              min={0}
              max={32}
              value={gridGap}
              onChange={(e) => onGridGapChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}
