import type { DomNode, DiffStatus } from "../../model/types";
import { DIFF_RESULT } from "../../model/constants";

const STATUS_COLORS: Record<
  DiffStatus,
  { border: string; bg: string; text: string; label: string }
> = {
  unchanged: {
    border: "border-accent-green/40",
    bg: "bg-accent-green/5",
    text: "text-accent-green",
    label: "유지",
  },
  modified: {
    border: "border-accent-amber/40",
    bg: "bg-accent-amber/5",
    text: "text-accent-amber",
    label: "변경",
  },
  added: {
    border: "border-accent-magenta/40",
    bg: "bg-accent-magenta/5",
    text: "text-accent-magenta",
    label: "추가",
  },
  removed: {
    border: "border-text-muted/40",
    bg: "bg-text-muted/5",
    text: "text-text-muted",
    label: "삭제",
  },
};

function getNodeStatus(nodeId: string, step: number): DiffStatus {
  if (step < 2) {
    return "unchanged";
  }
  const entry = DIFF_RESULT.find((d) => d.id === nodeId);
  return entry?.status ?? "unchanged";
}

interface TreeNodeProps {
  node: DomNode;
  step: number;
  depth?: number;
}

export default function TreeNode({ node, step, depth = 0 }: TreeNodeProps) {
  const status = getNodeStatus(node.id, step);
  const colors = STATUS_COLORS[status];
  const isHighlighted = step >= 2 && status !== "unchanged";

  return (
    <div style={{ marginLeft: `${depth * 16}px` }} className="mb-1.5">
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border transition-all duration-500 ${
          isHighlighted
            ? `${colors.border} ${colors.bg} ${colors.text}`
            : "border-border-subtle bg-bg-deep text-text-secondary"
        } ${status === "removed" ? "opacity-40 line-through" : ""}`}
      >
        <span className="font-mono text-label font-semibold">
          &lt;{node.tag}&gt;
        </span>
        {node.text && (
          <span className="font-mono text-caption text-text-muted">
            {step >= 1 && status === "modified"
              ? (DIFF_RESULT.find((d) => d.id === node.id)?.detail ?? node.text)
              : `"${node.text}"`}
          </span>
        )}
        {isHighlighted && (
          <span
            className={`font-mono text-[9px] px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text} animate-[logSlide_0.3s_ease]`}
          >
            {colors.label}
          </span>
        )}
      </div>
      {node.children?.map((child) => (
        <TreeNode key={child.id} node={child} step={step} depth={depth + 1} />
      ))}
    </div>
  );
}
