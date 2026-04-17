import { SectionHeader } from "@shared/ui";

interface TimelineEvent {
  time: number;
  type: "raw" | "debounce" | "throttle";
}

interface TimelineVisualizationProps {
  timeline: TimelineEvent[];
  maxTime: number;
}

export function TimelineVisualization({
  timeline,
  maxTime,
}: TimelineVisualizationProps) {
  return (
    <div>
      <SectionHeader>Timeline</SectionHeader>
      <div className="bg-bg-deep rounded-lg p-4 min-h-[120px]">
        {/* Raw events */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-cyan w-16">
            Raw
          </span>
          <div className="flex-1 relative h-4 bg-bg-surface rounded">
            {timeline
              .filter((e) => e.type === "raw")
              .map((e, i) => (
                <div
                  key={i}
                  className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-cyan"
                  style={{ left: `${(e.time / maxTime) * 100}%` }}
                />
              ))}
          </div>
        </div>

        {/* Debounce events */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-green w-16">
            Debounce
          </span>
          <div className="flex-1 relative h-4 bg-bg-surface rounded">
            {timeline
              .filter((e) => e.type === "debounce")
              .map((e, i) => (
                <div
                  key={i}
                  className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-green"
                  style={{ left: `${(e.time / maxTime) * 100}%` }}
                />
              ))}
          </div>
        </div>

        {/* Throttle events */}
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-amber w-16">
            Throttle
          </span>
          <div className="flex-1 relative h-4 bg-bg-surface rounded">
            {timeline
              .filter((e) => e.type === "throttle")
              .map((e, i) => (
                <div
                  key={i}
                  className="absolute top-0.5 w-1.5 h-3 rounded-sm bg-accent-amber"
                  style={{ left: `${(e.time / maxTime) * 100}%` }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
