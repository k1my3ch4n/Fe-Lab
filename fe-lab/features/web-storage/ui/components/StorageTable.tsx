import { COMPARISON_ROWS } from "../../model/constants";
import { SectionHeader } from "@shared/ui";

export function StorageTable() {
  return (
    <div>
      <SectionHeader>Storage 비교</SectionHeader>
      <div className="overflow-x-auto rounded-lg border border-border-subtle">
        <table className="w-full font-mono text-caption">
          <thead>
            <tr className="bg-bg-elevated">
              <th className="text-left px-3 py-2 text-text-muted font-normal">
                특성
              </th>
              <th className="text-left px-3 py-2 text-accent-cyan font-normal">
                localStorage
              </th>
              <th className="text-left px-3 py-2 text-accent-amber font-normal">
                sessionStorage
              </th>
              <th className="text-left px-3 py-2 text-accent-violet font-normal">
                IndexedDB
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="border-t border-border-subtle">
                <td className="px-3 py-2 text-text-secondary">{row.feature}</td>
                <td className="px-3 py-2 text-text-primary">{row.localStorage}</td>
                <td className="px-3 py-2 text-text-primary">{row.sessionStorage}</td>
                <td className="px-3 py-2 text-text-primary">{row.indexedDB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
