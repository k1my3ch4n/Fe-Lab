import { BREAKPOINTS } from "../../model/constants";
import type { Breakpoint } from "../../model/types";

interface ViewportControlsProps {
  viewportWidth: number;
  activeBreakpoint: Breakpoint | undefined;
  onWidthChange: (width: number) => void;
}

export function ViewportControls({
  viewportWidth,
  activeBreakpoint,
  onWidthChange,
}: ViewportControlsProps) {
  return (
    <>
      {/* Viewport width indicator */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-caption text-text-muted">
          Viewport:
        </span>
        <span
          className="font-mono text-[14px] font-bold"
          style={{ color: activeBreakpoint?.color }}
        >
          {viewportWidth}px
        </span>
        <span
          className="font-mono text-caption px-2 py-0.5 rounded"
          style={{
            color: activeBreakpoint?.color,
            background: `${activeBreakpoint?.color}22`,
          }}
        >
          {activeBreakpoint?.name} — {activeBreakpoint?.label}
        </span>
      </div>

      {/* Width slider */}
      <div>
        <input
          type="range"
          min={320}
          max={1440}
          value={viewportWidth}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Breakpoint bar */}
      <div className="relative h-8 bg-bg-deep rounded overflow-hidden">
        {BREAKPOINTS.map((bp) => {
          const left = (bp.minWidth / 1440) * 100;
          const width =
            ((Math.min(bp.maxWidth, 1440) - bp.minWidth) / 1440) * 100;
          return (
            <div
              key={bp.name}
              className="absolute top-0 h-full flex items-center justify-center font-mono text-[9px] font-semibold border-r border-bg-surface"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                background: `${bp.color}22`,
                color: bp.color,
              }}
            >
              {bp.name}
            </div>
          );
        })}
        {/* Current position indicator */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white z-10 transition-all duration-200"
          style={{ left: `${(viewportWidth / 1440) * 100}%` }}
        />
      </div>
    </>
  );
}
