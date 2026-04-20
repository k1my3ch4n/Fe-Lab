import React from "react";

interface DemoItem {
  color: string;
  label: string;
}

interface FlexboxPreviewProps {
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  flexWrap: string;
  gap: number;
  items: DemoItem[];
}

export function FlexboxPreview({
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  gap,
  items,
}: FlexboxPreviewProps) {
  return (
    <div
      className="min-h-[160px] rounded border border-border-subtle p-2"
      style={{
        display: "flex",
        flexDirection: flexDirection as React.CSSProperties["flexDirection"],
        justifyContent,
        alignItems,
        flexWrap: flexWrap as React.CSSProperties["flexWrap"],
        gap: `${gap}px`,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-md px-4 py-3 font-mono text-[12px] font-bold text-bg-deep min-w-[48px] text-center"
          style={{ background: item.color }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
