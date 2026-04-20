"use client";

import { useRef } from "react";
import { Sidebar } from "@widgets/sidebar";
import { useSidebarStore, useViewportStore } from "@shared/stores";
import { ScrollProgress, MenuIcon } from "@shared/ui";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const { isMobile } = useViewportStore();
  const { drawerOpen, openDrawer, closeDrawer } = useSidebarStore();

  return (
    <div className="flex h-screen">
      {/* Mobile drawer overlay */}
      {isMobile && drawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeDrawer} />
      )}

      {/* Sidebar */}
      {isMobile ? (
        <aside
          className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>
      ) : (
        <Sidebar />
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
              onClick={openDrawer}
              aria-label="메뉴 열기"
              className="w-8 h-8 rounded-md border border-border-subtle bg-transparent flex items-center justify-center cursor-pointer text-text-muted hover:text-accent-cyan hover:border-accent-cyan transition-all duration-200"
            >
              <MenuIcon />
            </button>
            <span className="font-display text-sm font-bold text-text-primary">
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
