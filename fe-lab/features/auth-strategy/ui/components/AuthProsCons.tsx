"use client";

interface AuthProsConsProps {
  pros: string[];
  cons: string[];
}

export function AuthProsCons({ pros, cons }: AuthProsConsProps) {
  return (
    <div className="mt-2">
      <div className="font-mono text-[10px] text-accent-green mb-1">
        장점
      </div>
      {pros.map((item, index) => (
        <div
          key={index}
          className="font-mono text-[10px] text-text-muted leading-[1.8]"
        >
          + {item}
        </div>
      ))}
      <div className="font-mono text-[10px] text-accent-magenta mt-2 mb-1">
        단점
      </div>
      {cons.map((item, index) => (
        <div
          key={index}
          className="font-mono text-[10px] text-text-muted leading-[1.8]"
        >
          - {item}
        </div>
      ))}
    </div>
  );
}
