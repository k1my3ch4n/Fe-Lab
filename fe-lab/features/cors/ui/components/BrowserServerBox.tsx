interface BrowserServerBoxProps {
  currentStep: number;
  totalSteps: number;
}

export function BrowserServerBox({
  currentStep,
  totalSteps,
}: BrowserServerBoxProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-4 text-center">
        <div className="font-mono text-label font-semibold text-accent-cyan mb-1">
          Browser
        </div>
        <div className="font-mono text-caption text-text-muted">
          https://app.example.com
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pt-2">
        <div className="font-mono text-caption text-text-muted uppercase tracking-wider">
          {currentStep === -1
            ? "대기 중"
            : `Step ${currentStep + 1} / ${totalSteps}`}
        </div>
      </div>

      <div className="flex-1 rounded-lg border border-accent-amber/30 bg-accent-amber/5 p-4 text-center">
        <div className="font-mono text-label font-semibold text-accent-amber mb-1">
          Server
        </div>
        <div className="font-mono text-caption text-text-muted">
          https://api.other.com
        </div>
      </div>
    </div>
  );
}
