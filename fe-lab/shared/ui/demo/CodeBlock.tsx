interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({
  children,
  className = "",
}: CodeBlockProps) {
  return (
    <pre
      className={`font-mono text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto ${className}`}
    >
      {children}
    </pre>
  );
}
