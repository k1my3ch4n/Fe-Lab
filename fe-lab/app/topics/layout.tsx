"use client";

import { useState, useRef } from "react";
import { Sidebar } from "@widgets/sidebar";
import { useMediaQuery } from "@shared/hooks";
import { ScrollProgress } from "@shared/ui";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const [collapsed, setCollapsed] = useState(isTablet);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile drawer overlay */}
      {isMobile && drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isMobile ? (
        <aside
          className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar collapsed={false} onToggle={() => setDrawerOpen(false)} />
        </aside>
      ) : (
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      )}

      {/* Main content */}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto relative"
        style={{
          background: `
            radial-gradient(ellipse 600px 400px at 70% 10%, var(--accent-cyan-dim) 0%, transparent 100%),
            radial-gradient(ellipse 400px 300px at 30% 80%, var(--accent-magenta-dim) 0%, transparent 100%),
            var(--bg-deep)
          `,
        }}
      >
        <ScrollProgress containerRef={mainRef} />

        {/* Mobile header bar */}
        {isMobile && (
          <div className="sticky top-0 z-30 bg-bg-surface/90 backdrop-blur border-b border-border-subtle px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
              className="w-8 h-8 rounded-md border border-border-subtle bg-transparent flex items-center justify-center cursor-pointer text-text-muted hover:text-accent-cyan hover:border-accent-cyan transition-all duration-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="font-[family-name:var(--font-display)] text-sm font-bold text-text-primary">
              FE Lab
            </span>
          </div>
        )}

        <div className="max-w-[1200px] mx-auto px-4 py-6 pb-12 md:px-8 md:py-8 md:pb-16 lg:px-12 lg:py-10 lg:pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
