"use client";

import { useState } from "react";
import { useLog } from "@shared/hooks";
import { COPY_METHODS, ORIGINAL_OBJECT } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";

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

  const tabs = COPY_METHODS.map((m) => ({ id: m.id, label: m.label }));

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader onReset={handleReset} />

            {/* Action buttons */}
            <div className="p-4 border-b border-border-subtle">
              <div className="flex flex-col gap-2">
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
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-border-subtle">
              <div className="text-[11px] text-text-secondary leading-[1.8]">
                {method.description}
              </div>
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n복사 동작을 비교하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {method.code}
        </pre>

        {/* Object Reference Visualization */}
        <div>
          <SectionHeader>Reference Diagram</SectionHeader>
          <div className="grid grid-cols-2 gap-4">
            {/* Original */}
            <div className="rounded-lg border border-[#00e5ff44] bg-[#00e5ff08] p-3">
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan mb-2">
                original
              </div>
              {ORIGINAL_OBJECT.map((node) => (
                <div key={node.key} className="flex items-center gap-2 mb-1">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                    <span style={{ color: node.color }}>{node.key}</span>
                    <span className="text-text-muted">: </span>
                    <span className="text-text-primary">
                      {mutated.reference &&
                      !mutated.isDeep &&
                      node.key === "address"
                        ? "{ city: 'Busan' }"
                        : node.value}
                    </span>
                  </span>
                  {node.isReference && (
                    <span className="text-[10px]" style={{ color: node.color }}>
                      {mutated.reference ? (method.isDeep ? "◇" : "◆→") : "◆→"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Copy */}
            <div
              className="rounded-lg border p-3"
              style={{
                borderColor: `${method.color}44`,
                background: `${method.color}08`,
              }}
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-2"
                style={{ color: method.color }}
              >
                copy ({method.isDeep ? "깊은 복사" : "얕은 복사"})
              </div>
              {ORIGINAL_OBJECT.map((node) => (
                <div key={node.key} className="flex items-center gap-2 mb-1">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                    <span style={{ color: node.color }}>{node.key}</span>
                    <span className="text-text-muted">: </span>
                    <span className="text-text-primary">
                      {mutated.primitive && node.key === "name"
                        ? "'Lee'"
                        : mutated.reference && node.key === "address"
                          ? "{ city: 'Busan' }"
                          : node.value}
                    </span>
                  </span>
                  {node.isReference && !method.isDeep && (
                    <span className="text-[10px]" style={{ color: node.color }}>
                      ←◆
                    </span>
                  )}
                  {node.isReference && method.isDeep && (
                    <span className="text-[10px] text-accent-green">
                      ◇ 독립
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3">
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
              ◆→ 참조 공유 (얕은 복사)
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
              ◇ 독립 복사 (깊은 복사)
            </span>
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
