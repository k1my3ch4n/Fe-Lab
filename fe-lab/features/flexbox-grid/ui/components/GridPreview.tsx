interface DemoItem {
  color: string;
  label: string;
}

interface GridPreviewProps {
  gridTemplate: string;
  gridAlignItems: string;
  gridGap: number;
  items: DemoItem[];
}

export function GridPreview({
  gridTemplate,
  gridAlignItems,
  gridGap,
  items,
}: GridPreviewProps) {
  return (
    <div
      className="min-h-[160px] rounded border border-border-subtle p-2"
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplate,
        alignItems: gridAlignItems,
        gap: `${gridGap}px`,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-md px-4 py-3 font-mono text-[12px] font-bold text-bg-deep text-center"
          style={{ background: item.color }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
