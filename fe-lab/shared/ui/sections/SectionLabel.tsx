interface SectionLabelProps {
  number: string;
  label: string;
  variant: "concept" | "demo" | "code" | "interview";
}

const variantColors = {
  concept: "text-accent-cyan",
  demo: "text-accent-amber",
  code: "text-accent-green",
  interview: "text-accent-magenta",
};

export default function SectionLabel({
  number,
  label,
  variant,
}: SectionLabelProps) {
  return (
    <div
      className={`font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[3px] mb-4 flex items-center gap-2 ${variantColors[variant]}`}
    >
      {number} · {label}
      <span className="flex-1 h-px bg-border-subtle" />
    </div>
  );
}
