interface ContainerQueryPreviewProps {
  viewportWidth: number;
}

export function ContainerQueryPreview({
  viewportWidth,
}: ContainerQueryPreviewProps) {
  return (
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
  );
}
