"use client";

import { useState } from "react";
import { MEMO_EXAMPLES, TABS } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
  InfoCard,
} from "@shared/ui";

interface RenderLog {
  component: string;
  reason: string;
  color: string;
}

export default function ReactMemoDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [parentCount, setParentCount] = useState(0);
  const [renderLogs, setRenderLogs] = useState<RenderLog[]>([]);

  const example = MEMO_EXAMPLES[activeExample];

  const handleParentRender = () => {
    setParentCount((c) => c + 1);
    const newLog: RenderLog = {
      component: "Parent",
      reason: "state 변경",
      color: "#00e5ff",
    };

    if (activeExample === 0) {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "Child",
          reason: "부모 리렌더링 (props 변경 없음)",
          color: "#ff2d8a",
        },
      ]);
    } else if (activeExample === 1) {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "MemoChild",
          reason: "SKIP — props 동일",
          color: "#00e676",
        },
      ]);
    } else {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "MemoChild",
          reason: "리렌더링 — 새 객체 참조",
          color: "#ffb800",
        },
      ]);
    }
  };

  const handleReset = () => {
    setParentCount(0);
    setRenderLogs([]);
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    handleReset();
  };

  const logEntries = renderLogs.map((log) => ({
    text: `[${log.component}] ${log.reason}`,
    color: log.color,
  }));

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader onReset={handleReset} />

            <div className="p-4 border-b border-border-subtle">
              <ActionButton variant="cyan" onClick={handleParentRender}>
                Parent 리렌더링 트리거
              </ActionButton>
            </div>

            <LogPanel
              logs={logEntries}
              emptyMessage={"버튼을 클릭하여\n리렌더링 동작을 확인하세요"}
            />
          </>
        }
      >
        {/* Description */}
        <div className="text-sm text-text-secondary leading-[1.8]">
          {example.description}
        </div>

        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* Render Counter Visualization */}
        <div>
          <SectionHeader>Render Count</SectionHeader>
          <div className="flex gap-4">
            <InfoCard label="Parent" value={parentCount} color="#00e5ff" />
            <InfoCard
              label="Child"
              value={activeExample === 1 ? 0 : parentCount}
              color={activeExample === 1 ? "#00e676" : "#ff2d8a"}
            />
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
