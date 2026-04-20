"use client";

type ButtonVariant = "cyan" | "green" | "amber" | "magenta" | "violet";

interface ActionButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  cyan: "border-accent-cyan text-accent-cyan bg-accent-cyan-dim hover:bg-accent-cyan/20",
  green:
    "border-accent-green text-accent-green bg-accent-green-dim hover:bg-accent-green/20",
  amber:
    "border-accent-amber text-accent-amber bg-accent-amber-dim hover:bg-accent-amber/20",
  magenta:
    "border-accent-magenta text-accent-magenta bg-accent-magenta-dim hover:bg-accent-magenta/20",
  violet:
    "border-accent-violet text-accent-violet bg-accent-violet-dim hover:bg-accent-violet/20",
};

export default function ActionButton({
  variant = "cyan",
  children,
  onClick,
  disabled = false,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-mono text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
