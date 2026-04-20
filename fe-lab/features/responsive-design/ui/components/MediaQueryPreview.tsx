import { BREAKPOINTS } from "../../model/constants";

interface MediaQueryPreviewProps {
  viewportWidth: number;
}

export function MediaQueryPreview({ viewportWidth }: MediaQueryPreviewProps) {
  return (
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
            className="rounded px-3 py-2 font-mono text-[10px] text-center"
            style={{
              background: `${BREAKPOINTS[i % BREAKPOINTS.length].color}33`,
              color: BREAKPOINTS[i % BREAKPOINTS.length].color,
              gridColumn:
                viewportWidth >= 768 &&
                (area === "Header" || area === "Footer")
                  ? "1 / -1"
                  : undefined,
            }}
          >
            {area}
          </div>
        ))}
      </div>
    </div>
  );
}
