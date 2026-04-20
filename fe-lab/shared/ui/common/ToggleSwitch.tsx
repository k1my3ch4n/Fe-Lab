"use client";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <label className="font-mono text-[11px] text-text-secondary flex items-center gap-1.5 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-all duration-300 border cursor-pointer ${
          checked
            ? "bg-accent-cyan border-accent-cyan"
            : "bg-bg-deep border-border-subtle"
        }`}
      >
        <div
          className={`absolute w-3.5 h-3.5 rounded-full top-[2px] transition-all duration-300 ${
            checked ? "left-[18px] bg-bg-deep" : "left-[2px] bg-text-primary"
          }`}
        />
      </div>
      {label}
    </label>
  );
}
