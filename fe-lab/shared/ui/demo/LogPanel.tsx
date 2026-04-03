interface LogEntry {
  text: string;
  color?: string;
}

interface LogPanelProps {
  logs: (string | LogEntry)[];
  emptyMessage?: string;
}

export default function LogPanel({
  logs,
  emptyMessage = "버튼을 클릭하여\n동작을 확인하세요",
}: LogPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
      {logs.length === 0 ? (
        <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8] whitespace-pre-line">
          {emptyMessage}
        </div>
      ) : (
        logs.map((log, i) => {
          const text = typeof log === "string" ? log : log.text;
          const color = typeof log === "string" ? undefined : log.color;
          return (
            <div
              key={i}
              className="px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease]"
              style={{ color: color ?? "#00e5ff" }}
            >
              {text}
            </div>
          );
        })
      )}
    </div>
  );
}
