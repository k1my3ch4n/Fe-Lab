"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { COMPONENT_TYPES, TABS } from "../model/constants";
import { RenderFlowVisualization } from "./components/RenderFlowVisualization";
import { BundleSizeIndicator } from "./components/BundleSizeIndicator";

export default function ServerComponentsDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePhase, setActivePhase] = useState(-1);
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  const compType = COMPONENT_TYPES[activeTab];

  const handleTabChange = (index: number) => {
    clearTimers();
    setActiveTab(index);
    clearLogs();
    setActivePhase(-1);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    setActivePhase(-1);
  };

  const handleSimulate = () => {
    clearLogs();
    setActivePhase(0);
    const phases = compType.phases;
    let step = 0;

    const runStep = () => {
      if (step < phases.length) {
        setActivePhase(step);
        addLog(`${step + 1}. [${phases[step].label}] ${phases[step].description}`);
        step++;
        addTimer(runStep, 600);
      } else {
        addLog(`--- 번들 사이즈: ${compType.bundleSize}`);
        addLog(`--- 렌더 위치: ${compType.renderLocation}`);
      }
    };
    runStep();
  };

  const handleCompare = () => {
    clearLogs();
    addLog("=== Server vs Client 비교 ===");
    addTimer(() => {
      addLog("Server: DB 직접 접근 ✓ | useState ✗");
      addTimer(() => {
        addLog("Client: useState ✓ | DB 직접 접근 ✗");
        addTimer(() => {
          addLog("Server: 번들 0KB | Client: 2-10KB+");
          addTimer(() => {
            addLog("→ 인터랙션 없으면 Server Component 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <>
                <ActionButton variant="cyan" onClick={handleSimulate}>
                  렌더 흐름 시뮬레이션
                </ActionButton>
                <ActionButton variant="amber" onClick={handleCompare}>
                  Server vs Client 비교
                </ActionButton>
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nRSC 렌더링 흐름을\n확인하세요"}
            />
          </RightPanel>
        }
      >
        <CodeBlock>{compType.code}</CodeBlock>

        <RenderFlowVisualization
          phases={compType.phases}
          activePhase={activePhase}
        />

        <BundleSizeIndicator
          componentId={compType.id}
          bundleSize={compType.bundleSize}
        />
      </DemoLayout>
    </>
  );
}
