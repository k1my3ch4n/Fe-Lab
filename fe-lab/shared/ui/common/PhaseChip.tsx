type PhaseVariant = "capture" | "target" | "bubble";

interface PhaseChipProps {
  label: string;
  variant: PhaseVariant;
}

const styles: Record<PhaseVariant, string> = {
  capture: "bg-accent-violet-dim text-accent-violet border-accent-violet/20",
  target: "bg-accent-amber-dim text-accent-amber border-accent-amber/20",
  bubble: "bg-accent-green-dim text-accent-green border-accent-green/20",
};

const dotColors: Record<PhaseVariant, string> = {
  capture: "bg-accent-violet",
  target: "bg-accent-amber",
  bubble: "bg-accent-green",
};

export default function PhaseChip({ label, variant }: PhaseChipProps) {
  return (
    <div
      className={`font-mono text-label px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border ${styles[variant]}`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}
      />
      {label}
    </div>
  );
}
