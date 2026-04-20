"use client";

import { useState } from "react";
import { useLog } from "@shared/hooks";
import { GENERIC_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  CodeBlock,
} from "@shared/ui";
import {
  TypeTransformationVisualization,
  UtilityTypeMap,
  GenericsActions,
} from "./components";

export default function GenericsDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [resolvedType, setResolvedType] = useState<string | null>(null);
  const { logs, addLog, clearLogs } = useLog();

  const example = GENERIC_EXAMPLES[activeExample];

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setResolvedType(null);
    clearLogs();
  };

  const handleReset = () => {
    setResolvedType(null);
    clearLogs();
  };

  const handleTypeCall = (typeArg: string) => {
    setResolvedType(typeArg);
    addLog(`identity<${typeArg}>(value) → ${typeArg}`);
  };

  const handleUtilityApply = (utilName: string) => {
    addLog(`${utilName} 적용됨`);
    addLog(`입력: ${example.inputType}`);
    addLog(`출력: ${example.outputType}`);
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
              <GenericsActions
                activeExample={activeExample}
                onTypeCall={handleTypeCall}
                onAddLog={addLog}
                onUtilityApply={handleUtilityApply}
              />
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n제네릭 타입 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {/* Code */}
        <CodeBlock>
          {example.code}
        </CodeBlock>

        {/* Type Transformation Visualization */}
        <div>
          <SectionHeader>Type Transformation</SectionHeader>
          <TypeTransformationVisualization
            inputType={example.inputType}
            outputType={example.outputType}
            color={example.color}
            resolvedType={resolvedType}
          />
        </div>

        {/* Utility Type Map */}
        {(activeExample === 1 || activeExample === 2 || activeExample === 3) && (
          <div>
            <SectionHeader>Utility Types</SectionHeader>
            <UtilityTypeMap />
          </div>
        )}
      </DemoLayout>
    </>
  );
}
