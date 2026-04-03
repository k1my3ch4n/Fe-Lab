"use client";

import { useState, useCallback } from "react";
import { DEMO_EXAMPLES } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";

export default function CurryingCompositionDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);

  const example = DEMO_EXAMPLES[activeExample];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCurrentStep(-1);
    setLogs([]);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setLogs([]);
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
    setLogs([]);

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex < example.steps.length) {
        const step = example.steps[stepIndex];
        setCurrentStep(stepIndex);
        setLogs((prev) => [
          ...prev,
          `Step ${stepIndex + 1}: ${step.description}`,
          `  → ${step.result}`,
        ]);
        stepIndex++;
        setTimeout(runStep, 600);
      }
    };
    runStep();
  };

  const tabs = DEMO_EXAMPLES.map((ex) => ({ id: ex.id, label: ex.label }));

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader onReset={handleReset} />

            {/* Action buttons */}
            <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
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
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n단계별 실행을 확인하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* Step Visualization */}
        <div>
          <SectionHeader>
            {activeExample <= 1 ? "Partial Application" : "Function Pipeline"}
          </SectionHeader>
          <div className="flex flex-col gap-2">
            {example.steps.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 transition-all duration-300"
                style={{
                  opacity: currentStep >= i ? 1 : 0.3,
                }}
              >
                {/* Step number */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[10px] font-bold flex-shrink-0"
                  style={{
                    background:
                      currentStep >= i ? `${example.color}33` : "#ffffff08",
                    color: currentStep >= i ? example.color : "#666",
                  }}
                >
                  {i + 1}
                </div>

                {/* Arrow + args */}
                <div
                  className="flex-1 rounded-lg border p-2 transition-all duration-300"
                  style={{
                    borderColor:
                      currentStep >= i ? `${example.color}44` : "#333",
                    background:
                      currentStep >= i ? `${example.color}08` : "transparent",
                  }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                    {step.args.join(" → ")}
                  </div>
                  <div
                    className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                    style={{
                      color: currentStep >= i ? example.color : "#666",
                    }}
                  >
                    → {step.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
