"use client";

import { useState } from "react";
import { DEMO_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { useLog, useTimers } from "@shared/hooks";
import { CurryingStepVisualization } from "./components/CurryingStepVisualization";

export default function CurryingCompositionDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const example = DEMO_EXAMPLES[activeExample];

  const handleExampleChange = (index: number) => {
    clearTimers();
    setActiveExample(index);
    setCurrentStep(-1);
    clearLogs();
  };

  const handleReset = () => {
    clearTimers();
    setCurrentStep(-1);
    clearLogs();
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < example.steps.length) {
      setCurrentStep(nextStep);
      const step = example.steps[nextStep];
      addLog(`Step ${nextStep + 1}: ${step.description}`);
      addLog(`  args: ${step.args.join(", ")}`);
      addLog(`  → ${step.result}`);
    }
  };

  const handleRunAll = () => {
    setCurrentStep(-1);
    clearLogs();

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex < example.steps.length) {
        const step = example.steps[stepIndex];
        setCurrentStep(stepIndex);
        addLog(`Step ${stepIndex + 1}: ${step.description}`);
        addLog(`  → ${step.result}`);
        stepIndex++;
        addTimer(runStep, 600);
      }
    };
    runStep();
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
              <>
                <ActionButton
                  variant="cyan"
                  onClick={handleNextStep}
                  disabled={currentStep >= example.steps.length - 1}
                >
                  다음 단계 →
                </ActionButton>
                <ActionButton variant="green" onClick={handleRunAll}>
                  전체 실행 ▶
                </ActionButton>
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n단계별 실행을 확인하세요"}
            />
          </RightPanel>
        }
      >
        <CodeBlock>{example.code}</CodeBlock>

        <CurryingStepVisualization
          activeExample={activeExample}
          steps={example.steps}
          currentStep={currentStep}
          color={example.color}
        />
      </DemoLayout>
    </>
  );
}
