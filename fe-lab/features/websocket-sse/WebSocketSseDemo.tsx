"use client";

import { useState, useEffect } from "react";
import { PROTOCOLS } from "./constants";
import { TabBar, DemoLayout, PanelHeader, SectionHeader } from "@shared/ui";
import { useSimulation } from "./hooks/useSimulation";
import { ComparisonTable } from "./components/ComparisonTable";
import { SimulationView } from "./components/SimulationView";

type TabType = "websocket" | "sse" | "comparison";

const TABS: { id: TabType; label: string }[] = [
  { id: "websocket", label: "WebSocket" },
  { id: "sse", label: "SSE" },
  { id: "comparison", label: "비교표" },
];

export default function WebSocketSseDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("websocket");
  const protocolTab = activeTab === "comparison" ? "websocket" : activeTab;
  const { messages, isRunning, startSimulation, stopSimulation, reset } =
    useSimulation(protocolTab);

  const protocol = PROTOCOLS.find((p) => p.id === activeTab) ?? PROTOCOLS[0];
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  useEffect(() => {
    reset();
  }, [activeTab, reset]);

  return (
    <>
      <TabBar
        tabs={TABS.map((t) => ({ id: t.id, label: t.label }))}
        activeIndex={activeIndex}
        onTabChange={(i) => setActiveTab(TABS[i].id)}
      />

      {activeTab === "comparison" ? (
        <ComparisonTable />
      ) : (
        <DemoLayout
          rightWidth="300px"
          rightPanel={
            <>
              <PanelHeader label="시뮬레이션" onReset={reset} />

              {/* Controls */}
              <div className="p-4 border-b border-border-subtle">
                <button
                  onClick={isRunning ? stopSimulation : startSimulation}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200"
                  style={{
                    borderColor: protocol.color,
                    color: protocol.color,
                    background: `${protocol.color}11`,
                  }}
                >
                  {isRunning ? "중지" : "시뮬레이션 시작"}
                </button>
              </div>

              {/* Use Cases */}
              <div className="p-4 border-b border-border-subtle">
                <SectionHeader>Use Cases</SectionHeader>
                <div className="flex flex-col gap-1.5">
                  {protocol.useCases.map((uc, i) => (
                    <div
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary flex items-center gap-1.5"
                    >
                      <span style={{ color: protocol.color }}>*</span>
                      {uc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros / Cons */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-3">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-1.5">
                    Pros
                  </div>
                  {protocol.pros.map((p, i) => (
                    <div
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary mb-1"
                    >
                      + {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-1.5">
                    Cons
                  </div>
                  {protocol.cons.map((c, i) => (
                    <div
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary mb-1"
                    >
                      - {c}
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        >
          <SimulationView
            protocol={protocol}
            activeTab={activeTab}
            messages={messages}
            isRunning={isRunning}
          />
        </DemoLayout>
      )}
    </>
  );
}
