"use client";

import { useState, useCallback } from "react";
import { TAB_ITEMS } from "./constants";
import type { TabId } from "./types";
import { TabBar, DemoLayout, PanelHeader, LogPanel } from "@shared/ui";
import { useObserveTab } from "./tabs/ObserveTab";
import { useLazyLoadTab } from "./tabs/LazyLoadTab";
import { useInfiniteScrollTab } from "./tabs/InfiniteScrollTab";

export default function IntersectionObserverDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("observe");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-30), text]);
  }, []);

  const observeTab = useObserveTab({ addLog });
  const lazyLoadTab = useLazyLoadTab({ addLog });
  const infiniteScrollTab = useInfiniteScrollTab({ addLog });

  const handleTabChange = (id: TabId) => {
    observeTab.reset();
    lazyLoadTab.reset();
    infiniteScrollTab.reset();
    setActiveTab(id);
    setLogs([]);
  };

  const handleReset = () => {
    observeTab.reset();
    lazyLoadTab.reset();
    infiniteScrollTab.reset();
    setLogs([]);
  };

  const tabsForBar = TAB_ITEMS.map((t) => ({ id: t.id, label: t.label }));
  const activeIndex = TAB_ITEMS.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={tabsForBar}
        activeIndex={activeIndex}
        onTabChange={(i) => handleTabChange(TAB_ITEMS[i].id)}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader label="로그" onReset={handleReset} />

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nObserver 동작을 확인하세요"}
            />
          </>
        }
      >
        {activeTab === "observe" && (
          <>
            {observeTab.actions}
            {observeTab.content}
          </>
        )}

        {activeTab === "lazy" && (
          <>
            {lazyLoadTab.actions}
            {lazyLoadTab.content}
          </>
        )}

        {activeTab === "infinite" && (
          <>
            {infiniteScrollTab.actions}
            {infiniteScrollTab.content}
          </>
        )}
      </DemoLayout>
    </>
  );
}
