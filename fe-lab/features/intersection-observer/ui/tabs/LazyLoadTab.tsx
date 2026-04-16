"use client";

import { useState, useRef } from "react";

interface UseLazyLoadTabOptions {
  addLog: (text: string) => void;
}

export function useLazyLoadTab({ addLog }: UseLazyLoadTabOptions) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reset = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    setLoadedImages(new Set());
  };

  const handleLazyLoad = () => {
    setLoadedImages(new Set());
    addLog("▶ Lazy Loading 시뮬레이션 시작");

    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-lazy"));
            addLog(`📷 이미지 ${id} 로딩 시작...`);

            setTimeout(() => {
              setLoadedImages((prev) => new Set([...prev, id]));
              addLog(`✅ 이미지 ${id} 로딩 완료`);
            }, 600);

            observer.unobserve(entry.target);
          }
        });
      },
      { root: container, threshold: 0.1 },
    );

    observerRef.current = observer;

    const targets = container.querySelectorAll("[data-lazy]");
    targets.forEach((el) => observer.observe(el));
  };

  const actions = (
    <button
      onClick={handleLazyLoad}
      className="self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-1.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
    >
      Lazy Loading 시작
    </button>
  );

  const content = (
    <div
      ref={scrollContainerRef}
      className="h-[320px] overflow-y-auto rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
    >
      {Array.from({ length: 8 }, (_, i) => i + 1).map((id) => (
        <div
          key={id}
          data-lazy={id}
          className="min-h-[120px] rounded-lg border border-border-subtle flex items-center justify-center transition-all duration-500"
          style={{
            background: loadedImages.has(id)
              ? "linear-gradient(135deg, #00e5ff15, #b388ff15)"
              : "var(--color-bg-surface)",
          }}
        >
          {loadedImages.has(id) ? (
            <div className="text-center">
              <div className="text-2xl mb-1">🖼️</div>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green">
                이미지 {id} 로딩 완료
              </span>
            </div>
          ) : (
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-muted">
              이미지 {id} (대기 중...)
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return { actions, content, reset };
}
