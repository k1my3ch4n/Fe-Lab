"use client";

import { useState, useCallback } from "react";
import { TabBar, DemoLayout, PanelHeader, LogPanel } from "@shared/ui";
import { useWaterfallTab } from "./tabs/WaterfallTab";
import { useStatusCodesTab } from "./tabs/StatusCodesTab";

export default function NetworkDebuggingDemo() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "status">(
    "waterfall",
  );
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const waterfallTab = useWaterfallTab({ addLog, setLogs });
  const statusCodesTab = useStatusCodesTab({ addLog, setLogs });

  const tabMap = { waterfall: waterfallTab, status: statusCodesTab };
  const current = tabMap[activeTab];

  const handleReset = () => {
    waterfallTab.reset();
    statusCodesTab.reset();
    setLogs([]);
  };

  const tabs = [
    { id: "waterfall", label: "워터폴 차트" },
    { id: "status", label: "HTTP 상태 코드" },
  ];

  const activeIndex = activeTab === "waterfall" ? 0 : 1;

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={(i) => {
          setActiveTab(i === 0 ? "waterfall" : "status");
          handleReset();
        }}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader label="실행" onReset={handleReset} />

            <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
              {current.actions}
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"리소스를 클릭하거나\n버튼으로 분석을 실행하세요"}
            />
          </>
        }
      >
        {current.content}
      </DemoLayout>
    </>
  );
}
