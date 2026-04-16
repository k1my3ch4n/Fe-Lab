"use client";

import { useState, useCallback } from "react";
import { HOOK_TIMINGS } from "../../model/constants";
import type { Phase } from "../../model/types";

export interface LogEntry {
  hook: string;
  color: string;
  phase: Phase;
  order: number;
}

export function usePhaseAnimation() {
  const [activePhase, setActivePhase] = useState<Phase>("mount");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [animatingIndex, setAnimatingIndex] = useState<number>(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const phaseTimings = HOOK_TIMINGS.filter((h) => h.phase === activePhase);

  const animatePhase = useCallback(
    (phase: Phase) => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);
      setActivePhase(phase);
      setLogs([]);
      setAnimatingIndex(-1);

      const timings = HOOK_TIMINGS.filter((h) => h.phase === phase);

      timings.forEach((timing, i) => {
        setTimeout(
          () => {
            setAnimatingIndex(i);
            setLogs((prev) => [
              ...prev,
              {
                hook: timing.hook,
                color: timing.color,
                phase: timing.phase,
                order: timing.order,
              },
            ]);

            if (i === timings.length - 1) {
              setTimeout(() => setIsAnimating(false), 300);
            }
          },
          (i + 1) * 400,
        );
      });
    },
    [isAnimating],
  );

  const reset = () => {
    setLogs([]);
    setAnimatingIndex(-1);
    setIsAnimating(false);
  };

  const selectPhase = (phase: Phase) => {
    setActivePhase(phase);
    reset();
  };

  return {
    activePhase,
    logs,
    animatingIndex,
    isAnimating,
    phaseTimings,
    animatePhase,
    reset,
    selectPhase,
  };
}
