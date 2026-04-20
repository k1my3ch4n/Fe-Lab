import { PROTOCOLS, COMPARISON_TABLE } from "../../model/constants";

export function ComparisonTable() {
  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full font-mono text-[11px] border-collapse">
        <thead>
          <tr>
            <th className="text-left text-text-muted text-[10px] uppercase tracking-wider py-2 px-3 border-b border-border-subtle">
              항목
            </th>
            {PROTOCOLS.map((p) => (
              <th
                key={p.id}
                className="text-left text-[10px] uppercase tracking-wider py-2 px-3 border-b border-border-subtle"
                style={{ color: p.color }}
              >
                {p.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_TABLE.map((row, i) => (
            <tr key={i} className="hover:bg-bg-elevated transition-colors">
              <td className="py-2.5 px-3 text-text-muted border-b border-border-subtle font-semibold">
                {row.label}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.websocket}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.sse}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.longPolling}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Protocol Cards */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {PROTOCOLS.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border p-4"
            style={{ borderColor: `${p.color}33`, background: `${p.color}08` }}
          >
            <div
              className="font-mono text-[12px] font-bold mb-1"
              style={{ color: p.color }}
            >
              {p.fullName}
            </div>
            <div className="font-mono text-[10px] text-text-muted mb-3">
              {p.direction}
            </div>
            <div className="flex flex-col gap-1">
              {p.useCases.slice(0, 3).map((uc, i) => (
                <div
                  key={i}
                  className="font-mono text-[10px] text-text-secondary"
                >
                  * {uc}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
