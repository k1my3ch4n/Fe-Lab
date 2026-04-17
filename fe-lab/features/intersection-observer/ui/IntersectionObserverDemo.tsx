"use client";

import { useState } from "react";
import { TAB_ITEMS } from "../model/constants";
import type { TabId } from "../model/types";
import { TabBar, DemoLayout, RightPanel, LogPanel } from "@shared/ui";
import { useLog } from "@shared/hooks";
import { useObserveTab } from "./tabs/ObserveTab";
import { useLazyLoadTab } from "./tabs/LazyLoadTab";
import { useInfiniteScrollTab } from "./tabs/InfiniteScrollTab";

export default function IntersectionObserverDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("observe");
  const { logs, addLog, clearLogs } = useLog();

  const observeTab = useObserveTab({ addLog });
  const lazyLoadTab = useLazyLoadTab({ addLog });
  const infiniteScrollTab = useInfiniteScrollTab({ addLog });

  const handleTabChange = (id: TabId) => {
    observeTab.reset();
    lazyLoadTab.reset();
    infiniteScrollTab.reset();
    setActiveTab(id);
    clearLogs();
  };

  const handleReset = () => {
    observeTab.reset();
    lazyLoadTab.reset();
    infiniteScrollTab.reset();
    clearLogs();
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
          <RightPanel label="로그" onReset={handleReset}>
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nObserver 동작을 확인하세요"}
            />
          </RightPanel>
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
