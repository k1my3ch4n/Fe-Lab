"use client";

import { useState } from "react";
import { TYPE_GUARD_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  CodeBlock,
} from "@shared/ui";
import { useLog } from "@shared/hooks";
import { TypeNarrowingVisualization, TypeGuardActions } from "./components";

export default function TypeGuardDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [narrowedType, setNarrowedType] = useState<string | null>(null);
  const { logs, addLog, clearLogs } = useLog();

  const example = TYPE_GUARD_EXAMPLES[activeExample];

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setNarrowedType(null);
    clearLogs();
  };

  const handleReset = () => {
    setNarrowedType(null);
    clearLogs();
  };

  const handleGuardCheck = (inputLabel: string, resultType: string) => {
    setNarrowedType(resultType);
    addLog(`${example.guardMethod} 검사`);
    addLog(`입력: ${inputLabel}`);
    addLog(`→ 타입 좁히기: ${resultType}`);
  };

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <TypeGuardActions
                activeExample={activeExample}
                onGuardCheck={handleGuardCheck}
                onAddLog={addLog}
              />
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n타입 가드 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {/* Code */}
        <CodeBlock>{example.code}</CodeBlock>

        {/* Type Narrowing Visualization */}
        <div>
          <SectionHeader>Type Narrowing</SectionHeader>
          <TypeNarrowingVisualization
            beforeType={example.beforeType}
            afterType={example.afterType}
            color={example.color}
            narrowedType={narrowedType}
          />
        </div>
      </DemoLayout>
    </>
  );
}
