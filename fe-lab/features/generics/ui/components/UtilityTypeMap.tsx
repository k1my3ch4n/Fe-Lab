import { UTILITY_TYPE_MAP } from "../../model/constants";

export function UtilityTypeMap() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {UTILITY_TYPE_MAP.map((ut) => (
        <div
          key={ut.name}
          className="rounded border px-3 py-2 flex items-center justify-between"
          style={{
            borderColor: `${ut.color}33`,
            background: `${ut.color}08`,
          }}
        >
          <span
            className="font-mono text-[10px] font-semibold"
            style={{ color: ut.color }}
          >
            {ut.name}
          </span>
          <span className="font-mono text-[9px] text-text-muted">
            {ut.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
