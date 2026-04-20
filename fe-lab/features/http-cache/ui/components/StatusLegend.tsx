import { STATUS_COLORS } from "../../model/constants";
import type { CacheStatus } from "../../model/types";

export function StatusLegend() {
  return (
    <div className="px-4 py-3 border-b border-border-subtle flex items-center gap-3">
      {(
        Object.entries(STATUS_COLORS) as [
          CacheStatus,
          (typeof STATUS_COLORS)[CacheStatus],
        ][]
      ).map(([key, config]) => (
        <span
          key={key}
          className={`${config.bg} ${config.text} font-mono text-[9px] px-2 py-0.5 rounded-full font-semibold`}
        >
          {config.label}
        </span>
      ))}
    </div>
  );
}
