interface PanelHeaderProps {
  label?: string;
  onReset: () => void;
}

export default function PanelHeader({
  label = "실행",
  onReset,
}: PanelHeaderProps) {
  return (
    <header className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
      <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
        {label}
      </span>
      <button
        onClick={onReset}
        aria-label="초기화"
        className="font-mono text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
      >
        Reset
      </button>
    </header>
  );
}
