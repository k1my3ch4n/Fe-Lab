"use client";

import { useState } from "react";
import { CLOSURE_EXAMPLES, TABS } from "../model/constants";
import { useLog } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  CodeBlock,
} from "@shared/ui";
import { ClosureActions } from "./components/ClosureActions";
import { ScopeChain } from "./components/ScopeChain";

export default function ClosureDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [counterValue, setCounterValue] = useState(0);
  const { logs, addLog, clearLogs } = useLog();

  const example = CLOSURE_EXAMPLES[activeExample];

  const handleCounterClick = () => {
    const next = counterValue + 1;
    setCounterValue(next);
    addLog(`counter() → ${next}  // count가 ${next}로 증가`);
  };

  const handleReset = () => {
    setCounterValue(0);
    clearLogs();
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCounterValue(0);
    clearLogs();
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
              <ClosureActions
                activeExample={activeExample}
                onCounterClick={handleCounterClick}
                addLog={addLog}
                clearLogs={clearLogs}
              />
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n클로저 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        <CodeBlock>{example.code}</CodeBlock>

        <ScopeChain
          scopes={example.scopes}
          activeExample={activeExample}
          counterValue={counterValue}
        />
      </DemoLayout>
    </>
  );
}
