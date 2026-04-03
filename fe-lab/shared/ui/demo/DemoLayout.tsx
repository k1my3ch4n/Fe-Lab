interface DemoLayoutProps {
  children: React.ReactNode;
  rightPanel: React.ReactNode;
  rightWidth?: string;
}

export default function DemoLayout({
  children,
  rightPanel,
  rightWidth = "280px",
}: DemoLayoutProps) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[1fr_var(--right-width)] lg:min-h-[420px]"
      style={{ "--right-width": rightWidth } as React.CSSProperties}
    >
      <div className="p-5 lg:p-7 flex flex-col gap-5 lg:gap-6">{children}</div>
      <aside className="border-t lg:border-t-0 lg:border-l border-border-subtle flex flex-col">
        {rightPanel}
      </aside>
    </div>
  );
}
