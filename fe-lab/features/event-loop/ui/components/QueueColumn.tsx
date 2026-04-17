import type { QueueItem } from "../../model/types";

interface QueueColumnProps {
  title: string;
  items: QueueItem[];
  borderColor: string;
  stepKey: string;
  hint?: string;
  justify?: "start" | "end";
}

export function QueueColumn({
  title,
  items,
  borderColor,
  stepKey,
  hint,
  justify = "start",
}: QueueColumnProps) {
  return (
    <div className="flex flex-col">
      <div
        className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-wider mb-3 text-center"
        style={{ color: borderColor }}
      >
        {title}
      </div>
      <div
        className={`flex-1 bg-bg-deep rounded-lg border p-3 flex flex-col gap-1.5 min-h-[240px] ${
          justify === "end" ? "justify-end" : ""
        }`}
        style={{ borderColor: `${borderColor}22` }}
      >
        {items.length === 0 ? (
          <div className="text-center text-text-muted font-[family-name:var(--font-mono)] text-[10px] py-4 opacity-50">
            (비어있음)
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={`${stepKey}-${i}`}
              className="font-[family-name:var(--font-mono)] text-[10px] px-3 py-2 rounded border text-center animate-[logSlide_0.3s_ease]"
              style={{
                color: item.color,
                borderColor: `${item.color}44`,
                background: `${item.color}12`,
              }}
            >
              {item.label}
            </div>
          ))
        )}
      </div>
      {hint && (
        <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted text-center mt-1.5">
          {hint}
        </div>
      )}
    </div>
  );
}
