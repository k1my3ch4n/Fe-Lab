"use client";

import { useState } from "react";
import { BREAKPOINTS, VIEWPORT_PRESETS, LAYOUT_MODES } from "./constants";

export default function ResponsiveDesignDemo() {
  const [activeMode, setActiveMode] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [logs, setLogs] = useState<string[]>([]);

  const mode = LAYOUT_MODES[activeMode];
  const activeBreakpoint = BREAKPOINTS.find(
    (bp) => viewportWidth >= bp.minWidth && viewportWidth <= bp.maxWidth
  );

  const handleModeChange = (index: number) => {
    setActiveMode(index);
    setLogs([]);
  };

  const handlePresetClick = (width: number, label: string) => {
    setViewportWidth(width);
    const bp = BREAKPOINTS.find(
      (b) => width >= b.minWidth && width <= b.maxWidth
    );
    setLogs((prev) => [
      ...prev,
      `${label} (${width}px) → ${bp?.name ?? "?"}`,
    ]);
  };

  const handleReset = () => {
    setViewportWidth(1024);
    setLogs([]);
  };

  // Compute clamp demo values
  const clampFontSize = Math.min(
    Math.max(16, 16 + (viewportWidth - 375) * 0.02),
    32
  );
  const clampPadding = Math.min(
    Math.max(8, 8 + (viewportWidth - 375) * 0.03),
    48
  );

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {LAYOUT_MODES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleModeChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeMode
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Viewport Preview */}
        <div className="p-6 flex flex-col gap-5">
          {/* Viewport width indicator */}
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
              Viewport:
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-[14px] font-bold"
              style={{ color: activeBreakpoint?.color }}
            >
              {viewportWidth}px
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] px-2 py-0.5 rounded"
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
              onChange={(e) => setViewportWidth(Number(e.target.value))}
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
                  className="absolute top-0 h-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[9px] font-semibold border-r border-bg-surface"
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

          {/* Layout preview */}
          <div
            className="bg-bg-deep rounded-lg border border-border-subtle overflow-hidden mx-auto transition-all duration-300"
            style={{ width: `${Math.min(viewportWidth, 600)}px`, maxWidth: "100%" }}
          >
            {activeMode === 0 && (
              /* Media query demo */
              <div className="p-3">
                <div
                  className="rounded border border-border-subtle p-2 transition-all duration-300"
                  style={{
                    display: viewportWidth >= 768 ? "grid" : "flex",
                    gridTemplateColumns:
                      viewportWidth >= 768 ? "1fr 1fr 1fr" : undefined,
                    flexDirection: viewportWidth >= 768 ? undefined : "column",
                    gap: "8px",
                  }}
                >
                  {["Header", "Sidebar", "Main", "Footer"].map((area, i) => (
                    <div
                      key={area}
                      className="rounded px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] text-center"
                      style={{
                        background: `${BREAKPOINTS[i % BREAKPOINTS.length].color}33`,
                        color: BREAKPOINTS[i % BREAKPOINTS.length].color,
                        gridColumn:
                          viewportWidth >= 768 && (area === "Header" || area === "Footer")
                            ? "1 / -1"
                            : undefined,
                      }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMode === 1 && (
              /* Clamp demo */
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
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                    font-size: clamp(1rem, 2vw, 2rem)
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                    padding: clamp(0.5rem, 3vw, 3rem)
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-amber mt-2">
                    현재: {clampFontSize.toFixed(1)}px / {clampPadding.toFixed(1)}px
                  </div>
                </div>
              </div>
            )}

            {activeMode === 2 && (
              /* Container query demo */
              <div className="p-3">
                <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mb-2">
                  @container (min-width: 400px)
                </div>
                <div
                  className="rounded border border-border-subtle p-3 transition-all duration-300"
                  style={{
                    display: viewportWidth >= 500 ? "flex" : "block",
                    gap: "8px",
                  }}
                >
                  <div
                    className="rounded bg-accent-cyan-dim px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan mb-2"
                    style={{
                      width: viewportWidth >= 500 ? "80px" : "100%",
                      flexShrink: 0,
                    }}
                  >
                    Thumb
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary mb-1">
                      카드 제목
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                      {viewportWidth >= 500
                        ? "가로 레이아웃 (컨테이너 넓음)"
                        : "세로 레이아웃 (컨테이너 좁음)"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Presets + Log */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              프리셋
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Preset buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            {VIEWPORT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset.width, preset.label)}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33] flex items-center justify-between"
              >
                <span>{preset.label}</span>
                <span className="text-text-muted text-[10px]">
                  {preset.width}px
                </span>
              </button>
            ))}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                프리셋을 선택하거나
                <br />
                슬라이더를 조절하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
