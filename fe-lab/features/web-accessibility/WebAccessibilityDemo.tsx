"use client";

import { useState, useCallback } from "react";
import { A11Y_TABS, type A11yTabId } from "./constants";
import { TabBar, DemoLayout, PanelHeader, LogPanel } from "@shared/ui";
import { useSemanticTab } from "./tabs/SemanticTab";
import { useAriaTab } from "./tabs/AriaTab";
import { useKeyboardTab } from "./tabs/KeyboardTab";

export default function WebAccessibilityDemo() {
  const [activeTab, setActiveTab] = useState<A11yTabId>("semantic");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-30), text]);
  }, []);

  const semanticTab = useSemanticTab({ addLog });
  const ariaTab = useAriaTab({ addLog });
  const keyboardTab = useKeyboardTab({ addLog });

  const handleTabChange = (id: A11yTabId) => {
    setActiveTab(id);
    setLogs([]);
    semanticTab.reset();
    ariaTab.reset();
    keyboardTab.reset();
  };

  const handleReset = () => {
    setLogs([]);
    semanticTab.reset();
    ariaTab.reset();
    keyboardTab.reset();
  };

  const tabsForBar = A11Y_TABS.map((t) => ({ id: t.id, label: t.label }));
  const activeIndex = A11Y_TABS.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={tabsForBar}
        activeIndex={activeIndex}
        onTabChange={(i) => handleTabChange(A11Y_TABS[i].id)}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader label="로그" onReset={handleReset} />

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하거나\n키보드를 사용해보세요"}
            />
          </>
        }
      >
        {activeTab === "semantic" && semanticTab.content}
        {activeTab === "aria" && ariaTab.content}
        {activeTab === "keyboard" && keyboardTab.content}
      </DemoLayout>
    </>
  );
}
