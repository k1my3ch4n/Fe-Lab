"use client";

import { useState } from "react";
import { BREAKPOINTS, VIEWPORT_PRESETS, TABS } from "../model/constants";
import { TabBar, DemoLayout, RightPanel, LogPanel } from "@shared/ui";
import {
  ViewportControls,
  MediaQueryPreview,
  ClampPreview,
  ContainerQueryPreview,
} from "./components";

export default function ResponsiveDesignDemo() {
  const [activeMode, setActiveMode] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [logs, setLogs] = useState<string[]>([]);

  const activeBreakpoint = BREAKPOINTS.find(
    (bp) => viewportWidth >= bp.minWidth && viewportWidth <= bp.maxWidth,
  );

  const handleModeChange = (index: number) => {
    setActiveMode(index);
    setLogs([]);
  };

  const handlePresetClick = (width: number, label: string) => {
    setViewportWidth(width);
    const bp = BREAKPOINTS.find(
      (b) => width >= b.minWidth && width <= b.maxWidth,
    );
    setLogs((prev) => [...prev, `${label} (${width}px) → ${bp?.name ?? "?"}`]);
  };

  const handleReset = () => {
    setViewportWidth(1024);
    setLogs([]);
  };

  // Compute clamp demo values
  const clampFontSize = Math.min(
    Math.max(16, 16 + (viewportWidth - 375) * 0.02),
    32,
  );
  const clampPadding = Math.min(
    Math.max(8, 8 + (viewportWidth - 375) * 0.03),
    48,
  );

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeMode}
        onTabChange={handleModeChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            label="프리셋"
            onReset={handleReset}
            actions={
              <>
                {VIEWPORT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetClick(preset.width, preset.label)}
                    className="w-full font-mono text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33] flex items-center justify-between"
                  >
                    <span>{preset.label}</span>
                    <span className="text-text-muted text-caption">
                      {preset.width}px
                    </span>
                  </button>
                ))}
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"프리셋을 선택하거나\n슬라이더를 조절하세요"}
            />
          </RightPanel>
        }
      >
        <ViewportControls
          viewportWidth={viewportWidth}
          activeBreakpoint={activeBreakpoint}
          onWidthChange={setViewportWidth}
        />

        {/* Layout preview */}
        <div
          className="bg-bg-deep rounded-lg border border-border-subtle overflow-hidden mx-auto transition-all duration-300"
          style={{
            width: `${Math.min(viewportWidth, 600)}px`,
            maxWidth: "100%",
          }}
        >
          {activeMode === 0 && (
            <MediaQueryPreview viewportWidth={viewportWidth} />
          )}
          {activeMode === 1 && (
            <ClampPreview
              clampFontSize={clampFontSize}
              clampPadding={clampPadding}
            />
          )}
          {activeMode === 2 && (
            <ContainerQueryPreview viewportWidth={viewportWidth} />
          )}
        </div>
      </DemoLayout>
    </>
  );
}
