import { RightPanel } from "@shared/ui";
import { LOG_TYPE_STYLES } from "../../model/constants";
import type { LogEntry } from "../../model/types";

interface EventLogPanelProps {
  logs: LogEntry[];
  logRef: React.RefObject<HTMLDivElement | null>;
  onClear: () => void;
}

export default function EventLogPanel({
  logs,
  logRef,
  onClear,
}: EventLogPanelProps) {
  return (
    <div className="border-l border-border-subtle flex flex-col">
      <RightPanel label="Event Log" onReset={onClear}>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-2 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed"
      >
        {logs.length === 0 ? (
          <div className="text-text-muted text-center px-4 py-10 text-xs leading-[1.8]">
            요소를 클릭하면
            <br />
            이벤트 전파 로그가 표시됩니다
          </div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease] ${LOG_TYPE_STYLES[log.type]}`}
            >
              {log.text}
            </div>
          ))
        )}
      </div>
      </RightPanel>
    </div>
  );
}
