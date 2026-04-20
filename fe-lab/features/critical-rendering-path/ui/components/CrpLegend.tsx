"use client";

import { RESOURCE_COLORS, RESOURCE_LABELS } from "../../model/constants";
import type { TimelineResource } from "../../model/types";

export function CrpLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {(Object.keys(RESOURCE_COLORS) as TimelineResource["type"][]).map(
        (type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: RESOURCE_COLORS[type] }}
            />
            <span className="font-mono text-caption text-text-muted">
              {RESOURCE_LABELS[type]}
            </span>
          </div>
        ),
      )}
    </div>
  );
}
