"use client";

import { useState } from "react";
import { TabBar, DemoLayout, PanelHeader, LogPanel } from "@shared/ui";
import { useLog } from "@shared/hooks";
import { TABS } from "./constants";
import { useFlowTab } from "./tabs/FlowTab";
import { useEdgeTab } from "./tabs/EdgeTab";
import { useInvalidationTab } from "./tabs/InvalidationTab";

export default function CdnDemo() {
  const [activeTab, setActiveTab] = useState<"flow" | "edge" | "invalidation">(
    "flow",
  );
  const { logs, addLog, clearLogs } = useLog();

  const flowTab = useFlowTab({ addLog });
  const edgeTab = useEdgeTab({ addLog, clearLogs });
  const invalidationTab = useInvalidationTab({ addLog, clearLogs });

  const tabMap = {
    flow: flowTab,
    edge: edgeTab,
    invalidation: invalidationTab,
  };

  const current = tabMap[activeTab];

  const handleReset = () => {
    flowTab.reset();
    edgeTab.reset();
    invalidationTab.reset();
    clearLogs();
  };

  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeIndex}
        onTabChange={(i) => {
          setActiveTab(TABS[i].id as typeof activeTab);
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
              emptyMessage={"버튼을 클릭하여\nCDN 동작을 확인하세요"}
            />
          </>
        }
      >
        {current.content}
      </DemoLayout>
    </>
  );
}
