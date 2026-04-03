"use client";

import { useState, useRef } from "react";
import { OBSERVER_BOXES, THRESHOLD_OPTIONS } from "../constants";

interface UseObserveTabOptions {
  addLog: (text: string) => void;
}

export function useObserveTab({ addLog }: UseObserveTabOptions) {
  const [threshold, setThreshold] = useState(0.5);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reset = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    setVisibleIds(new Set());
  };

  const handleStartObserving = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    setVisibleIds(new Set());
    addLog(`▶ Observer 시작 (threshold: ${threshold})`);

    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          const ratio = entry.intersectionRatio.toFixed(2);

          if (entry.isIntersecting) {
            setVisibleIds((prev) => new Set([...prev, id]));
            addLog(`✅ Box ${id} 진입 (ratio: ${ratio})`);
          } else {
            setVisibleIds((prev) => {
              const next = new Set(prev);
              next.delete(id);

              return next;
            });
            addLog(`⬜ Box ${id} 이탈 (ratio: ${ratio})`);
          }
        });
      },
      { threshold, root: container },
    );

    observerRef.current = observer;

    const targets = container.querySelectorAll("[data-id]");
    targets.forEach((el) => observer.observe(el));
  };

  const actions = (
    <div className="flex items-center gap-3">
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
        Threshold
      </span>
      <div className="flex gap-1">
        {THRESHOLD_OPTIONS.map((t) => (
          <button
            key={t}
            onClick={() => setThreshold(t)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded border cursor-pointer transition-all duration-200 ${
              threshold === t
                ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                : "border-border-subtle text-text-muted hover:text-text-secondary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <button
        onClick={handleStartObserving}
        className="ml-auto font-[family-name:var(--font-mono)] text-[11px] px-4 py-1.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
      >
        감지 시작
      </button>
    </div>
  );

  const content = (
    <div
      ref={scrollContainerRef}
      className="h-[320px] overflow-y-auto rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
    >
      {OBSERVER_BOXES.map((box) => (
        <div
          key={box.id}
          data-id={box.id}
          className="min-h-[100px] rounded-lg border-2 flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: visibleIds.has(box.id)
              ? box.color
              : "var(--color-border-subtle)",
            background: visibleIds.has(box.id)
              ? `${box.color}15`
              : "transparent",
          }}
        >
          <span
            className="font-[family-name:var(--font-mono)] text-[13px] font-semibold transition-all duration-300"
            style={{
              color: visibleIds.has(box.id)
                ? box.color
                : "var(--color-text-muted)",
            }}
          >
            {box.label} {visibleIds.has(box.id) ? "👁 보임" : "숨김"}
          </span>
        </div>
      ))}
    </div>
  );

  return { actions, content, reset };
}
