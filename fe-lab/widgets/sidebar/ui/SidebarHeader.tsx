import ThemeToggle from "@shared/ui/ThemeToggle";
import SidebarToggle from "./SidebarToggle";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Logo = () => (
  <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-magenta rounded-lg flex items-center justify-center text-base font-bold text-black shrink-0">
    F
  </div>
);

export default function SidebarHeader({
  isCollapsed,
  onToggle,
}: SidebarHeaderProps) {
  if (isCollapsed) {
    return (
      <header className="px-3 pt-6 pb-5 border-b border-border-subtle flex flex-col items-center gap-3">
        <Logo />
        <SidebarToggle collapsed={isCollapsed} onToggle={onToggle} />
      </header>
    );
  }

  return (
    <header className="px-5 pt-6 pb-5 border-b border-border-subtle flex items-center justify-between">
      <div className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-tight flex items-center gap-2">
        <Logo />
        <div>
          FE Lab
          <div className="text-[11px] text-text-muted font-normal mt-1 tracking-[2px] uppercase">
            Interview Prep
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <SidebarToggle collapsed={isCollapsed} onToggle={onToggle} />
      </div>
    </header>
  );
}
