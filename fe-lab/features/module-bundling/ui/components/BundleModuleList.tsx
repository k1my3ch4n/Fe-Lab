"use client";

import { SectionHeader } from "@shared/ui";
import type { BundleModule } from "../../model/types";

interface BundleModuleListProps {
  activeExample: number;
  modules: BundleModule[];
  showOptimized: boolean;
}

export function BundleModuleList({
  activeExample,
  modules,
  showOptimized,
}: BundleModuleListProps) {
  const maxModuleSize = Math.max(...modules.map((module) => module.size));

  return (
    <div>
      <SectionHeader>
        {activeExample === 2 ? "Module Format Comparison" : "Bundle Analysis"}
      </SectionHeader>
      <div className="flex flex-col gap-2">
        {modules.map((module, index) => {
          const isHidden = showOptimized && !module.used;
          return (
            <div
              key={index}
              className="rounded-lg border p-3 transition-all duration-500"
              style={{
                borderColor: `${module.color}44`,
                background: `${module.color}08`,
                opacity: isHidden ? 0.2 : 1,
                transform: isHidden ? "scaleY(0.5)" : "scaleY(1)",
                transformOrigin: "top",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-label font-semibold"
                    style={{ color: module.color }}
                  >
                    {module.name}
                  </span>
                  {isHidden && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#ff2d8a22] text-[#ff2d8a]">
                      REMOVED
                    </span>
                  )}
                </div>
                {module.size > 0 && (
                  <span className="font-mono text-caption text-text-muted">
                    {module.size}KB
                  </span>
                )}
              </div>
              {module.size > 0 && (
                <div className="mt-2 h-2 bg-bg-deep rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${(module.size / maxModuleSize) * 100}%`,
                      background: isHidden ? "#ffffff11" : `${module.color}66`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
