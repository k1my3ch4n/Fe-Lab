"use client";

import { useState } from "react";
import { DEMO_ITEMS } from "../model/constants";
import { TabBar, RightPanel, SectionHeader, CodeBlock } from "@shared/ui";
import { FlexboxPreview } from "./components/FlexboxPreview";
import { GridPreview } from "./components/GridPreview";
import { FlexboxControls } from "./components/FlexboxControls";

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
              <FlexboxPreview
                flexDirection={flexDirection}
                justifyContent={justifyContent}
                alignItems={alignItems}
                flexWrap={flexWrap}
                gap={gap}
                items={DEMO_ITEMS}
              />
            ) : (
              <GridPreview
                gridTemplate={gridTemplate}
                gridAlignItems={gridAlignItems}
                gridGap={gridGap}
                items={DEMO_ITEMS}
              />
            )}
          </div>

          {/* Generated CSS */}
          <CodeBlock>
            {mode === "flexbox" ? flexCode : gridCode}
          </CodeBlock>
        </div>

        {/* Right: Controls */}
        <div className="border-l border-border-subtle flex flex-col">
          <RightPanel label="속성 조절" onReset={handleReset}>
            <FlexboxControls
              mode={mode}
              justifyContent={justifyContent}
              alignItems={alignItems}
              flexDirection={flexDirection}
              flexWrap={flexWrap}
              gap={gap}
              onJustifyChange={setJustifyContent}
              onAlignChange={setAlignItems}
              onDirectionChange={setFlexDirection}
              onWrapChange={setFlexWrap}
              onGapChange={setGap}
              gridTemplate={gridTemplate}
              gridGap={gridGap}
              gridAlignItems={gridAlignItems}
              onGridTemplateChange={setGridTemplate}
              onGridGapChange={setGridGap}
              onGridAlignChange={setGridAlignItems}
            />
          </RightPanel>
        </div>
      </div>
    </>
  );
}
