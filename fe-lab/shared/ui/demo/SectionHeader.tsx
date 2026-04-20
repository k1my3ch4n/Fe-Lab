interface SectionHeaderProps {
  children: React.ReactNode;
}

export default function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <div className="font-mono text-caption text-text-muted uppercase tracking-wider mb-3">
      {children}
    </div>
  );
}
