"use client";

import { useState } from "react";
import { TabBar, DemoLayout, RightPanel, LogPanel } from "@shared/ui";
import { useLog } from "@shared/hooks";
import { useWaterfallTab } from "./hooks/useWaterfallTab";
import { useStatusCodesTab } from "./hooks/useStatusCodesTab";

export default function NetworkDebuggingDemo() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "status">(
    "waterfall",
  );
  const { logs, addLog, clearLogs } = useLog();

  const waterfallTab = useWaterfallTab({ addLog, clearLogs });
  const statusCodesTab = useStatusCodesTab({ addLog, clearLogs });

  const tabMap = { waterfall: waterfallTab, status: statusCodesTab };
  const current = tabMap[activeTab];

  const handleReset = () => {
    waterfallTab.reset();
    statusCodesTab.reset();
    clearLogs();
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
          <RightPanel onReset={handleReset} actions={current.actions}>
            <LogPanel
              logs={logs}
              emptyMessage={"리소스를 클릭하거나\n버튼으로 분석을 실행하세요"}
            />
          </RightPanel>
        }
      >
        {current.content}
      </DemoLayout>
    </>
  );
}
