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
      className="min-h-[420px]"
      style={{ display: "grid", gridTemplateColumns: `1fr ${rightWidth}` }}
    >
      <div className="p-6 flex flex-col gap-5">{children}</div>
      <div className="border-l border-border-subtle flex flex-col">
        {rightPanel}
      </div>
    </div>
  );
}
