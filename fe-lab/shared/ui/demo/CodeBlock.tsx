"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  language = "typescript",
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`rounded-lg overflow-hidden text-[12px] leading-[1.8] ${className}`}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "var(--color-bg-deep)",
          fontSize: "inherit",
          lineHeight: "inherit",
          borderRadius: "0.5rem",
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono, monospace)" } }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
