import type { TreeNode } from "../../model/types";

const ACTION_LABELS: Record<string, string> = {
  compared: "비교",
  updated: "업데이트",
  replaced: "교체",
  reused: "재사용",
  removed: "삭제",
  inserted: "삽입",
};

interface TreeNodeViewProps {
  node: TreeNode;
  depth?: number;
  highlightMap: Map<string, { color: string; action: string }>;
  side: "old" | "new";
}

export default function TreeNodeView({
  node,
  depth = 0,
  highlightMap,
  side,
}: TreeNodeViewProps) {
  const nodeKey =
    node.key != null ? `${node.tag}[key="${node.key}"]` : node.tag;
  const highlight = highlightMap.get(nodeKey);

  const borderColor = highlight ? `${highlight.color}88` : "#ffffff10";
  const bgColor = highlight ? `${highlight.color}15` : "transparent";

  const showBadge =
    highlight &&
    ((side === "old" &&
      ["updated", "removed", "reused"].includes(highlight.action)) ||
      (side === "new" &&
        ["updated", "inserted", "reused"].includes(highlight.action)));

  return (
    <div
      className="rounded-lg border p-2.5 transition-all duration-500"
      style={{
        borderColor,
        background: bgColor,
        marginLeft: `${depth * 12}px`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-label font-semibold"
          style={{ color: highlight?.color ?? "#ffffff88" }}
        >
          {"<"}
          {node.tag}
          {node.key != null && (
            <span className="text-accent-amber">
              {" "}
              key=&quot;{node.key}&quot;
            </span>
          )}
          {">"}
        </span>
        {showBadge && (
          <span
            className="font-mono text-[9px] px-1.5 py-0.5 rounded-full"
            style={{
              background: `${highlight.color}25`,
              color: highlight.color,
            }}
          >
            {ACTION_LABELS[highlight.action] ?? highlight.action}
          </span>
        )}
      </div>

      {node.props && (
        <div className="mt-1 flex flex-wrap gap-1">
          {Object.entries(node.props).map(([k, v]) => (
            <span
              key={k}
              className="font-mono text-[9px] bg-bg-deep px-1.5 py-0.5 rounded text-text-muted"
            >
              {k}=&quot;{v}&quot;
            </span>
          ))}
        </div>
      )}

      {node.text && (
        <div className="font-mono text-caption text-text-secondary mt-1 pl-2">
          &quot;{node.text}&quot;
        </div>
      )}

      {node.children && (
        <div className="flex flex-col gap-1.5 mt-2">
          {node.children.map((child, i) => (
            <TreeNodeView
              key={child.key ?? i}
              node={child}
              depth={depth + 1}
              highlightMap={highlightMap}
              side={side}
            />
          ))}
        </div>
      )}
    </div>
  );
}
