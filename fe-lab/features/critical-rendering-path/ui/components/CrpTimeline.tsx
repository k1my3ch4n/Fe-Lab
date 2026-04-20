"use client";

import { RESOURCE_COLORS, TIMELINE_MAX } from "../../model/constants";
import type { CRPScenario } from "../../model/types";

interface CrpTimelineProps {
  scenario: CRPScenario;
}

const TIME_TICKS = [0, 25, 50, 75, 100];

export function CrpTimeline({ scenario }: CrpTimelineProps) {
  const fcpPercent = (scenario.fcp / TIMELINE_MAX) * 100;

  return (
    <div className="relative bg-bg-deep rounded-lg p-5 overflow-hidden">
      {/* Time axis markers */}
      <div className="flex justify-between mb-4 px-0">
        {TIME_TICKS.map((tick) => (
          <span
            key={tick}
            className="font-mono text-[9px] text-text-muted"
          >
            {tick}ms
          </span>
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-x-5 top-12 bottom-5 pointer-events-none">
        {TIME_TICKS.map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-border-subtle opacity-40"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>

      {/* Resource bars */}
      <div className="flex flex-col gap-2 relative">
        {scenario.resources.map((resource, index) => {
          const leftPercent = (resource.start / TIMELINE_MAX) * 100;
          const widthPercent =
            ((resource.end - resource.start) / TIMELINE_MAX) * 100;

          return (
            <div key={index} className="flex items-center gap-3 h-7">
              <div className="w-[180px] shrink-0 font-mono text-caption text-text-muted text-right truncate">
                {resource.label}
              </div>
              <div className="flex-1 relative h-full">
                <div
                  className="absolute top-0 h-full rounded transition-all duration-500 ease-out flex items-center px-2"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    backgroundColor: `${RESOURCE_COLORS[resource.type]}cc`,
                    boxShadow: `0 0 8px ${RESOURCE_COLORS[resource.type]}33`,
                  }}
                >
                  <span className="font-mono text-[8px] text-white/80 whitespace-nowrap overflow-hidden">
                    {resource.end - resource.start}ms
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FCP Marker */}
      <div className="relative mt-4 h-8">
        <div className="w-[180px] shrink-0" />
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center transition-all duration-500 ease-out"
          style={{
            left: `calc(180px + 12px + (100% - 180px - 12px) * ${fcpPercent / 100})`,
          }}
        >
          <div className="w-0.5 h-4 bg-accent-green" />
          <div className="font-mono text-caption font-bold text-accent-green whitespace-nowrap mt-0.5">
            FCP {scenario.fcp}ms
          </div>
        </div>
      </div>
    </div>
  );
}
