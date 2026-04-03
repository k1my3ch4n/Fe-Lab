"use client";

import { useState } from "react";
import { TabBar } from "@shared/ui";
import {
  CRP_SCENARIOS,
  RESOURCE_COLORS,
  RESOURCE_LABELS,
  TIMELINE_MAX,
} from "./constants";
import type { TimelineResource } from "./types";

export default function CriticalRenderingPathDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = CRP_SCENARIOS[activeScenario];

  const fcpPercent = (scenario.fcp / TIMELINE_MAX) * 100;

  const tabs = CRP_SCENARIOS.map((s) => ({ id: s.id, label: s.label }));

  return (
    <>
      {/* Scenario Tabs */}
      <TabBar
        tabs={tabs}
        activeIndex={activeScenario}
        onTabChange={setActiveScenario}
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Description */}
        <p className="text-[13px] text-text-secondary leading-[1.8]">
          {scenario.description}
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {(Object.keys(RESOURCE_COLORS) as TimelineResource["type"][]).map(
            (type) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: RESOURCE_COLORS[type] }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                  {RESOURCE_LABELS[type]}
                </span>
              </div>
            ),
          )}
        </div>

        {/* Timeline */}
        <div className="relative bg-bg-deep rounded-lg p-5 overflow-hidden">
          {/* Time axis markers */}
          <div className="flex justify-between mb-4 px-0">
            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted"
              >
                {tick}ms
              </span>
            ))}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-x-5 top-12 bottom-5 pointer-events-none">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                className="absolute top-0 bottom-0 w-px bg-border-subtle opacity-40"
                style={{ left: `${tick}%` }}
              />
            ))}
          </div>

          {/* Resource bars */}
          <div className="flex flex-col gap-2 relative">
            {scenario.resources.map((resource, i) => {
              const leftPercent = (resource.start / TIMELINE_MAX) * 100;
              const widthPercent =
                ((resource.end - resource.start) / TIMELINE_MAX) * 100;

              return (
                <div key={i} className="flex items-center gap-3 h-7">
                  {/* Label */}
                  <div className="w-[180px] shrink-0 font-[family-name:var(--font-mono)] text-[10px] text-text-muted text-right truncate">
                    {resource.label}
                  </div>
                  {/* Bar track */}
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
                      <span className="font-[family-name:var(--font-mono)] text-[8px] text-white/80 whitespace-nowrap overflow-hidden">
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
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-accent-green whitespace-nowrap mt-0.5">
                FCP {scenario.fcp}ms
              </div>
            </div>
          </div>
        </div>

        {/* Comparison stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CRP_SCENARIOS.map((s, i) => {
            const isActive = i === activeScenario;
            const improvement =
              i === 0
                ? null
                : Math.round(
                    ((CRP_SCENARIOS[0].fcp - s.fcp) / CRP_SCENARIOS[0].fcp) *
                      100,
                  );
            return (
              <div
                key={s.id}
                onClick={() => setActiveScenario(i)}
                className={`rounded-lg border p-3 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "border-accent-cyan bg-accent-cyan-dim"
                    : "border-border-subtle bg-bg-elevated hover:border-text-muted"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-mono)] text-[10px] mb-1 ${
                    isActive ? "text-accent-cyan" : "text-text-muted"
                  }`}
                >
                  {s.label}
                </div>
                <div
                  className={`font-[family-name:var(--font-mono)] text-[18px] font-bold ${
                    isActive ? "text-accent-cyan" : "text-text-primary"
                  }`}
                >
                  {s.fcp}
                  <span className="text-[11px] font-normal text-text-muted ml-0.5">
                    ms
                  </span>
                </div>
                {improvement !== null && (
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mt-0.5">
                    -{improvement}% 개선
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
