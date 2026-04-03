"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export default function TabBar({
  tabs,
  activeIndex,
  onTabChange,
}: TabBarProps) {
  return (
    <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(i)}
          className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
            i === activeIndex
              ? "border-accent-cyan text-accent-cyan bg-bg-surface"
              : "border-transparent text-text-muted hover:text-text-secondary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
