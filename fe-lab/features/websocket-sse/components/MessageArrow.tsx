import type { SimMessage } from "../types";

export function MessageArrow({ message }: { message: SimMessage }) {
  const isClient = message.from === "client";
  const color = isClient ? "#00e5ff" : "#00e676";

  return (
    <div
      className="flex items-center gap-2 animate-[logSlide_0.3s_ease]"
      style={{ flexDirection: isClient ? "row" : "row-reverse" }}
    >
      <div
        className="shrink-0 w-2 h-2 rounded-full"
        style={{ background: color }}
      />
      <div
        className="flex-1 font-[family-name:var(--font-mono)] text-[10px] px-2 py-1 rounded"
        style={{
          background: `${color}11`,
          borderLeft: isClient ? `2px solid ${color}66` : "none",
          borderRight: !isClient ? `2px solid ${color}66` : "none",
          color: `${color}`,
          textAlign: isClient ? "left" : "right",
        }}
      >
        <span className="text-text-muted">{isClient ? "C →" : "← S"}</span>{" "}
        {message.text}
      </div>
      <div
        className="shrink-0 w-2 h-2 rounded-full"
        style={{ background: color, opacity: 0.3 }}
      />
    </div>
  );
}
