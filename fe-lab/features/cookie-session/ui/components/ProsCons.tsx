interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-3">
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-2">
          장점
        </div>
        {pros.map((p, i) => (
          <div
            key={i}
            className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mb-1"
          >
            + {p}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-3">
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-2">
          단점
        </div>
        {cons.map((c, i) => (
          <div
            key={i}
            className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mb-1"
          >
            - {c}
          </div>
        ))}
      </div>
    </div>
  );
}
