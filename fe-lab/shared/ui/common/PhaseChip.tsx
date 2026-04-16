type PhaseVariant = "capture" | "target" | "bubble";

interface PhaseChipProps {
  label: string;
  variant: PhaseVariant;
}

const styles: Record<PhaseVariant, string> = {
  capture: "bg-accent-violet-dim text-accent-violet border-[#b388ff33]",
  target: "bg-accent-amber-dim text-accent-amber border-[#ffb80033]",
  bubble: "bg-accent-green-dim text-accent-green border-[#00e67633]",
};

const dotColors: Record<PhaseVariant, string> = {
  capture: "bg-accent-violet",
  target: "bg-accent-amber",
  bubble: "bg-accent-green",
};

export default function PhaseChip({ label, variant }: PhaseChipProps) {
  return (
    <div
      className={`font-[family-name:var(--font-mono)] text-[11px] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border ${styles[variant]}`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}
      />
      {label}
    </div>
  );
}
