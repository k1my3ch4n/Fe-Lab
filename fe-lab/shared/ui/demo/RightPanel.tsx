import PanelHeader from "./PanelHeader";

interface RightPanelProps {
  label?: string;
  onReset: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function RightPanel({
  label = "실행",
  onReset,
  actions,
  children,
}: RightPanelProps) {
  return (
    <>
      <PanelHeader label={label} onReset={onReset} />
      {actions && (
        <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
          {actions}
        </div>
      )}
      {children}
    </>
  );
}
