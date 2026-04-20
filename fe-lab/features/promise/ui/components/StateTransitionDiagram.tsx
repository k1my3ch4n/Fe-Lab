import { SectionHeader } from "@shared/ui";

export function StateTransitionDiagram() {
  return (
    <div>
      <SectionHeader>State Transition</SectionHeader>
      <div className="flex items-center gap-4 p-4 bg-bg-deep rounded-lg">
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-10 rounded-lg border border-[#ffb80044] bg-[#ffb80008] flex items-center justify-center">
            <span className="font-mono text-[11px] text-accent-amber">
              pending
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">→ resolve()</span>
            <div className="w-24 h-10 rounded-lg border border-[#00e67644] bg-[#00e67608] flex items-center justify-center">
              <span className="font-mono text-[11px] text-accent-green">
                fulfilled
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">
              → reject() &nbsp;
            </span>
            <div className="w-24 h-10 rounded-lg border border-[#ff2d8a44] bg-[#ff2d8a08] flex items-center justify-center">
              <span className="font-mono text-[11px] text-accent-magenta">
                rejected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
