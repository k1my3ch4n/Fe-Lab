"use client";

import { useState } from "react";
import { useLog } from "@shared/hooks";
import { COPY_METHODS, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { ReferenceDiagram } from "./components/ReferenceDiagram";

export default function DeepShallowCopyDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const { logs, addLog, clearLogs } = useLog();
  const [mutated, setMutated] = useState<Record<string, boolean>>({});

  const method = COPY_METHODS[activeTab];

  const handleReset = () => {
    clearLogs();
    setMutated({});
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    clearLogs();
    setMutated({});
  };

  const simulatePrimitiveMutation = () => {
    addLog("copy.name = 'Lee'");
    addLog("→ 원본 name: 'Kim' (영향 없음) ✓");
    addLog("→ 복사본 name: 'Lee'");
    setMutated((prev) => ({ ...prev, primitive: true }));
  };

  const simulateReferenceMutation = () => {
    const isDeep = method.isDeep;
    addLog("copy.address.city = 'Busan'");

    if (isDeep) {
      addLog("→ 원본 address.city: 'Seoul' (영향 없음) ✓");
      addLog("→ 복사본 address.city: 'Busan'");
      addLog(`// ${method.label}: 깊은 복사 — 참조 분리됨`);
    } else {
      addLog("→ 원본 address.city: 'Busan' (같이 변경!) ✗");
      addLog("→ 복사본 address.city: 'Busan'");
      addLog("// 얕은 복사: 중첩 객체는 참조를 공유");
    }

    setMutated((prev) => ({ ...prev, reference: true, isDeep }));
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
                <ActionButton
                  variant="cyan"
                  onClick={simulatePrimitiveMutation}
                >
                  원시값 변경 (name)
                </ActionButton>
                <ActionButton
                  variant="amber"
                  onClick={simulateReferenceMutation}
                >
                  중첩 객체 변경 (address)
                </ActionButton>
              </>
            }
          >
            <div className="p-4 border-b border-border-subtle">
              <div className="text-label text-text-secondary leading-[1.8]">
                {method.description}
              </div>
            </div>
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n복사 동작을 비교하세요"}
            />
          </RightPanel>
        }
      >
        <CodeBlock>{method.code}</CodeBlock>

        <ReferenceDiagram method={method} mutated={mutated} />
      </DemoLayout>
    </>
  );
}
