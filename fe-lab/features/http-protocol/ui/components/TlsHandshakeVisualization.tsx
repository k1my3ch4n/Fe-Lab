import { TLS_HANDSHAKE_STEPS } from "../../model/constants";

export function TlsHandshakeVisualization() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-0 flex-1">
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan font-semibold mb-3 px-3 py-1.5 rounded-lg bg-accent-cyan-dim border border-accent-cyan/30">
          Client
        </div>
        <div className="w-px bg-border-subtle flex-1 min-h-[250px] relative">
          {TLS_HANDSHAKE_STEPS.map((step, i) => (
            <div
              key={i}
              className="absolute left-4 flex flex-col gap-0.5"
              style={{ top: `${i * 70 + 10}px` }}
            >
              <span
                className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                style={{ color: step.color }}
              >
                {step.label}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                {step.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0 w-20">
        <div className="h-[35px]" />
        {TLS_HANDSHAKE_STEPS.map((step, i) => (
          <div
            key={i}
            className="h-[70px] flex items-center justify-center"
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[14px]"
              style={{ color: step.color }}
            >
              {i % 2 === 0 ? "→" : "←"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-0 flex-1">
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green font-semibold mb-3 px-3 py-1.5 rounded-lg bg-accent-green-dim border border-accent-green/30">
          Server
        </div>
        <div className="w-px bg-border-subtle flex-1 min-h-[250px]" />
      </div>
    </div>
  );
}
