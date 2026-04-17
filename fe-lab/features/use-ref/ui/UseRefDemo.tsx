"use client";

import { useState, useRef } from "react";
import { useLog } from "@shared/hooks";
import { REF_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  CodeBlock,
} from "@shared/ui";
import { UseRefActions } from "./components/UseRefActions";
import { UseRefVisualization } from "./components/UseRefVisualization";

export default function UseRefDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const { logs, addLog, clearLogs } = useLog();
  const [refDisplay, setRefDisplay] = useState(0);
  const [prevDisplay, setPrevDisplay] = useState<number | undefined>(undefined);
  const refCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(0);

  const example = REF_EXAMPLES[activeExample];
  const renderCount = stateCount;

  const handleReset = () => {
    setStateCount(0);
    refCount.current = 0;
    setRefDisplay(0);
    setInputValue(0);
    setPrevDisplay(undefined);
    clearLogs();
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    handleReset();
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
              <UseRefActions
                activeExample={activeExample}
                stateCount={stateCount}
                refCountRef={refCount}
                inputRef={inputRef}
                inputValue={inputValue}
                prevDisplay={prevDisplay}
                addLog={addLog}
                setStateCount={setStateCount}
                setPrevDisplay={setPrevDisplay}
                setInputValue={setInputValue}
              />
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nuseRef 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        <div className="text-sm text-text-secondary leading-[1.8]">
          {example.description}
        </div>

        <CodeBlock>{example.code}</CodeBlock>

        <UseRefVisualization
          activeExample={activeExample}
          stateCount={stateCount}
          renderCount={renderCount}
          refDisplay={refDisplay}
          inputRef={inputRef}
          inputValue={inputValue}
          prevDisplay={prevDisplay}
        />
      </DemoLayout>
    </>
  );
}
