"use client";

import { useRef, useSyncExternalStore } from "react";

interface ScrollProgressProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollProgress({ containerRef }: ScrollProgressProps) {
  const callbacksRef = useRef(new Set<() => void>());

  const progress = useSyncExternalStore(
    (callback) => {
      const el = containerRef.current;
      callbacksRef.current.add(callback);

      const handler = () => callbacksRef.current.forEach((cb) => cb());

      el?.addEventListener("scroll", handler, { passive: true });

      return () => {
        el?.removeEventListener("scroll", handler);
        callbacksRef.current.delete(callback);
      };
    },
    () => {
      const el = containerRef.current;
      if (!el) {
        return 0;
      }

      const maxScroll = el.scrollHeight - el.clientHeight;

      if (maxScroll <= 0) {
        return 0;
      }

      return Math.round((el.scrollTop / maxScroll) * 100);
    },
    () => 0,
  );

  return (
    <div className="sticky top-0 left-0 w-full h-[2px] z-50 bg-transparent">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--accent-cyan), var(--accent-cyan-bright, #22d3ee))",
        }}
      />
    </div>
  );
}
