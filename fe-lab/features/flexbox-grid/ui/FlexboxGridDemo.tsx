"use client";

import { useState } from "react";
import {
  JUSTIFY_OPTIONS,
  ALIGN_OPTIONS,
  DIRECTION_OPTIONS,
  WRAP_OPTIONS,
  GRID_TEMPLATE_OPTIONS,
  DEMO_ITEMS,
} from "../model/constants";
import { TabBar, RightPanel, SectionHeader } from "@shared/ui";

type Mode = "flexbox" | "grid";

export default function FlexboxGridDemo() {
  const [mode, setMode] = useState<Mode>("flexbox");

  // Flexbox state
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexDirection, setFlexDirection] = useState("row");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState(8);

  // Grid state
  const [gridTemplate, setGridTemplate] = useState("1fr 1fr 1fr");
  const [gridGap, setGridGap] = useState(8);
  const [gridAlignItems, setGridAlignItems] = useState("stretch");

  const handleReset = () => {
    setJustifyContent("flex-start");
    setAlignItems("stretch");
    setFlexDirection("row");
    setFlexWrap("nowrap");
    setGap(8);
    setGridTemplate("1fr 1fr 1fr");
    setGridGap(8);
    setGridAlignItems("stretch");
  };

  const flexCode = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`;

  const gridCode = `display: grid;
grid-template-columns: ${gridTemplate};
align-items: ${gridAlignItems};
gap: ${gridGap}px;`;

  const tabs = [
    { id: "flexbox", label: "FLEXBOX" },
    { id: "grid", label: "GRID" },
  ];

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={mode === "flexbox" ? 0 : 1}
        onTabChange={(i) => setMode(i === 0 ? "flexbox" : "grid")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]">
        {/* Left: Preview + Code */}
        <div className="p-6 flex flex-col gap-5">
          {/* Preview */}
          <div className="bg-bg-deep rounded-lg p-4 min-h-[200px] border border-border-subtle">
            <SectionHeader>Preview</SectionHeader>
            {mode === "flexbox" ? (
              <div
                className="min-h-[160px] rounded border border-border-subtle p-2"
                style={{
                  display: "flex",
                  flexDirection:
                    flexDirection as React.CSSProperties["flexDirection"],
                  justifyContent,
                  alignItems,
                  flexWrap: flexWrap as React.CSSProperties["flexWrap"],
                  gap: `${gap}px`,
                }}
              >
                {DEMO_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-md px-4 py-3 font-[family-name:var(--font-mono)] text-[12px] font-bold text-bg-deep min-w-[48px] text-center"
                    style={{ background: item.color }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="min-h-[160px] rounded border border-border-subtle p-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridTemplate,
                  alignItems: gridAlignItems,
                  gap: `${gridGap}px`,
                }}
              >
                {DEMO_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-md px-4 py-3 font-[family-name:var(--font-mono)] text-[12px] font-bold text-bg-deep text-center"
                    style={{ background: item.color }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generated CSS */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {mode === "flexbox" ? flexCode : gridCode}
          </pre>
        </div>

        {/* Right: Controls */}
        <div className="border-l border-border-subtle flex flex-col">
          <RightPanel label="속성 조절" onReset={handleReset}>
          <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
            {mode === "flexbox" ? (
              <>
                {/* justify-content */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    justify-content
                  </label>
                  <select
                    value={justifyContent}
                    onChange={(e) => setJustifyContent(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {JUSTIFY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* align-items */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    align-items
                  </label>
                  <select
                    value={alignItems}
                    onChange={(e) => setAlignItems(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {ALIGN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* flex-direction */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    flex-direction
                  </label>
                  <select
                    value={flexDirection}
                    onChange={(e) => setFlexDirection(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {DIRECTION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* flex-wrap */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    flex-wrap
                  </label>
                  <select
                    value={flexWrap}
                    onChange={(e) => setFlexWrap(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {WRAP_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* gap */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    gap: {gap}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            ) : (
              <>
                {/* grid-template-columns */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    grid-template-columns
                  </label>
                  <select
                    value={gridTemplate}
                    onChange={(e) => setGridTemplate(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {GRID_TEMPLATE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* align-items */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    align-items
                  </label>
                  <select
                    value={gridAlignItems}
                    onChange={(e) => setGridAlignItems(e.target.value)}
                    className="w-full font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep text-text-primary border border-border-subtle rounded px-2 py-1.5"
                  >
                    {ALIGN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* gap */}
                <div>
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted block mb-1">
                    gap: {gridGap}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={gridGap}
                    onChange={(e) => setGridGap(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
          </RightPanel>
        </div>
      </div>
    </>
  );
}
