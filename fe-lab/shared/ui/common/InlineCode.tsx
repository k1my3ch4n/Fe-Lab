interface InlineCodeProps {
  children: React.ReactNode;
  size?: "sm" | "md";
}

export default function InlineCode({ children, size = "sm" }: InlineCodeProps) {
  const sizeClass = size === "sm" ? "text-[11px]" : "text-[12px]";

  return (
    <code
      className={`font-mono ${sizeClass} bg-bg-elevated px-1.5 py-0.5 rounded text-accent-cyan`}
    >
      {children}
    </code>
  );
}
