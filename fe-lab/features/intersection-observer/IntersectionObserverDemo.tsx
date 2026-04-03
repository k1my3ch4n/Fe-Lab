"use client";

import { useState, useCallback, useRef } from "react";
import {
  OBSERVER_BOXES,
  THRESHOLD_OPTIONS,
  TAB_ITEMS,
  type TabId,
} from "./constants";

export default function IntersectionObserverDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("observe");
  const [threshold, setThreshold] = useState(0.5);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  const [logs, setLogs] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [infiniteItems, setInfiniteItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-30), text]);
  }, []);

  const handleStartObserving = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    setVisibleIds(new Set());
    setLogs([]);
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

  const handleLazyLoad = () => {
    setLoadedImages(new Set());
    setLogs([]);
    addLog("▶ Lazy Loading 시뮬레이션 시작");

    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    if (observerRef.current) observerRef.current.disconnect();

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
    setLogs([]);
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

  const handleTabChange = (id: TabId) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    setActiveTab(id);
    setLogs([]);
    setVisibleIds(new Set());
    setLoadedImages(new Set());
    setInfiniteItems([1, 2, 3, 4, 5]);
  };

  const handleReset = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    setLogs([]);
    setVisibleIds(new Set());
    setLoadedImages(new Set());
    setInfiniteItems([1, 2, 3, 4, 5]);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Scroll Area */}
        <div className="p-6 flex flex-col gap-4">
          {/* Threshold control (observe tab) */}
          {activeTab === "observe" && (
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
          )}

          {activeTab === "lazy" && (
            <button
              onClick={handleLazyLoad}
              className="self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-1.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
            >
              Lazy Loading 시작
            </button>
          )}

          {activeTab === "infinite" && (
            <button
              onClick={handleInfiniteScroll}
              className="self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-1.5 rounded-lg border border-accent-violet text-accent-violet bg-accent-violet-dim cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
            >
              무한 스크롤 시작
            </button>
          )}

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="h-[320px] overflow-y-auto rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
          >
            {activeTab === "observe" &&
              OBSERVER_BOXES.map((box) => (
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

            {activeTab === "lazy" &&
              Array.from({ length: 8 }, (_, i) => i + 1).map((id) => (
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

            {activeTab === "infinite" && (
              <>
                {infiniteItems.map((item) => (
                  <div
                    key={item}
                    className="min-h-[60px] rounded-lg border border-border-subtle bg-bg-surface flex items-center px-4"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[12px] text-text-secondary">
                      항목 #{item}
                    </span>
                  </div>
                ))}
                <div
                  data-sentinel
                  className="min-h-[40px] flex items-center justify-center"
                >
                  {isLoadingMore ? (
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-amber animate-pulse">
                      로딩 중...
                    </span>
                  ) : (
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                      ↓ 센티널 요소
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Log Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              로그
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                Observer 동작을 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
