interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarToggle({
  collapsed,
  onToggle,
}: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
      className="w-8 h-8 rounded-md border border-border-subtle bg-transparent
        flex items-center justify-center cursor-pointer
        transition-all duration-200
        hover:border-accent-cyan hover:text-accent-cyan text-text-muted"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
