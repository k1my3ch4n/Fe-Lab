import { COMPARISON_TABLE } from "../../model/constants";

export function ComparisonTable() {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-deep overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="font-mono text-caption text-text-muted text-left p-3 uppercase tracking-wider">
              비교 항목
            </th>
            <th className="font-mono text-caption text-accent-amber text-left p-3 uppercase tracking-wider">
              REST
            </th>
            <th className="font-mono text-caption text-accent-cyan text-left p-3 uppercase tracking-wider">
              GraphQL
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_TABLE.map((row, i) => (
            <tr
              key={i}
              className={
                i < COMPARISON_TABLE.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }
            >
              <td className="font-mono text-caption text-text-secondary p-3 font-semibold">
                {row.aspect}
              </td>
              <td className="font-mono text-caption text-text-muted p-3">
                {row.rest}
              </td>
              <td className="font-mono text-caption text-text-muted p-3">
                {row.graphql}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
