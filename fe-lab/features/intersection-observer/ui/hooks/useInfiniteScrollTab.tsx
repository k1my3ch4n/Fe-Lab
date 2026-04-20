"use client";

import { useState, useRef } from "react";

interface UseInfiniteScrollTabOptions {
  addLog: (text: string) => void;
}

export function useInfiniteScrollTab({ addLog }: UseInfiniteScrollTabOptions) {
  const [infiniteItems, setInfiniteItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reset = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    setInfiniteItems([1, 2, 3, 4, 5]);
    setIsLoadingMore(false);
  };

  const handleLoadMore = () => {
    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    addLog("⏳ 추가 데이터 로딩 중...");

    setTimeout(() => {
      setInfiniteItems((prev) => {
        const next = prev.length + 1;

        return [...prev, next, next + 1, next + 2];
      });

      setIsLoadingMore(false);
      addLog("✅ 3개 항목 추가 완료");
    }, 800);
  };

  const handleInfiniteScroll = () => {
    setInfiniteItems([1, 2, 3, 4, 5]);
    setIsLoadingMore(false);
    addLog("▶ 무한 스크롤 시뮬레이션 시작");
    addLog("↓ 하단으로 스크롤하세요");

    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    if (observerRef.current) observerRef.current.disconnect();

    setTimeout(() => {
      const sentinel = container.querySelector("[data-sentinel]");

      if (!sentinel) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleLoadMore();
            }
          });
        },
        { root: container, threshold: 0.1 },
      );

      observerRef.current = observer;
      observer.observe(sentinel);
    }, 100);
  };

  const actions = (
    <button
      onClick={handleInfiniteScroll}
      className="self-start font-mono text-label px-4 py-1.5 rounded-lg border border-accent-violet text-accent-violet bg-accent-violet-dim cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
    >
      무한 스크롤 시작
    </button>
  );

  const content = (
    <div
      ref={scrollContainerRef}
      className="h-[320px] overflow-y-auto rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
    >
      {infiniteItems.map((item) => (
        <div
          key={item}
          className="min-h-[60px] rounded-lg border border-border-subtle bg-bg-surface flex items-center px-4"
        >
          <span className="font-mono text-[12px] text-text-secondary">
            항목 #{item}
          </span>
        </div>
      ))}
      <div
        data-sentinel
        className="min-h-[40px] flex items-center justify-center"
      >
        {isLoadingMore ? (
          <span className="font-mono text-label text-accent-amber animate-pulse">
            로딩 중...
          </span>
        ) : (
          <span className="font-mono text-caption text-text-muted">
            ↓ 센티널 요소
          </span>
        )}
      </div>
    </div>
  );

  return { actions, content, reset };
}
