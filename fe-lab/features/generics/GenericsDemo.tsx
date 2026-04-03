"use client";

import { useState } from "react";
import { useLog } from "@shared/hooks";
import { GENERIC_EXAMPLES, TABS, UTILITY_TYPE_MAP } from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";

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
          <>
            <PanelHeader onReset={handleReset} />

            {/* Action buttons */}
            <div className="p-4 border-b border-border-subtle">
              {activeExample === 0 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="cyan"
                    onClick={() => handleTypeCall("string")}
                  >
                    identity&lt;string&gt;()
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => handleTypeCall("number")}
                  >
                    identity&lt;number&gt;()
                  </ActionButton>
                  <ActionButton
                    variant="green"
                    onClick={() => handleTypeCall("boolean")}
                  >
                    identity&lt;boolean&gt;()
                  </ActionButton>
                </div>
              )}
              {activeExample === 1 && (
                <ActionButton
                  variant="violet"
                  onClick={() => handleUtilityApply("Partial<User>")}
                >
                  Partial&lt;User&gt; 적용
                </ActionButton>
              )}
              {activeExample === 2 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="green"
                    onClick={() => {
                      addLog('Pick<User, "name" | "email">');
                      addLog("→ { name: string; email: string }");
                    }}
                  >
                    Pick 적용
                  </ActionButton>
                  <ActionButton
                    variant="magenta"
                    onClick={() => {
                      addLog('Omit<User, "password">');
                      addLog("→ { name: string; age: number; email: string }");
                    }}
                  >
                    Omit 적용
                  </ActionButton>
                </div>
              )}
              {activeExample === 3 && (
                <ActionButton
                  variant="amber"
                  onClick={() => {
                    addLog("Record<Status, string> 적용");
                    addLog(
                      "→ { loading: string; success: string; error: string }",
                    );
                  }}
                >
                  Record 적용
                </ActionButton>
              )}
              {activeExample === 4 && (
                <div className="flex flex-col gap-2">
                  <ActionButton
                    variant="cyan"
                    onClick={() => {
                      addLog('IsString<string> → "yes"');
                      addLog('string extends string ? ✓ → "yes"');
                    }}
                  >
                    IsString&lt;string&gt;
                  </ActionButton>
                  <ActionButton
                    variant="magenta"
                    onClick={() => {
                      addLog('IsString<number> → "no"');
                      addLog('number extends string ? ✗ → "no"');
                    }}
                  >
                    IsString&lt;number&gt;
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      addLog("ReturnType<() => number>");
                      addLog("infer R → number");
                    }}
                  >
                    ReturnType 추론
                  </ActionButton>
                </div>
              )}
            </div>

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\n제네릭 타입 동작을 확인하세요"}
            />
          </>
        }
      >
        {/* Code */}
        <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {example.code}
        </pre>

        {/* Type Transformation Visualization */}
        <div>
          <SectionHeader>Type Transformation</SectionHeader>
          <div className="flex items-center gap-3">
            {/* Input Type */}
            <div
              className="flex-1 rounded-lg border p-3"
              style={{
                borderColor: `${example.color}44`,
                background: `${example.color}08`,
              }}
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
                style={{ color: example.color }}
              >
                Input Type
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                {example.inputType}
              </div>
            </div>

            {/* Arrow */}
            <div className="text-text-muted text-lg">→</div>

            {/* Output Type */}
            <div
              className="flex-1 rounded-lg border p-3"
              style={{
                borderColor: `${example.color}44`,
                background: `${example.color}08`,
              }}
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
                style={{ color: example.color }}
              >
                Output Type
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                {resolvedType ?? example.outputType}
              </div>
            </div>
          </div>
        </div>

        {/* Utility Type Map */}
        {activeExample === 1 || activeExample === 2 || activeExample === 3 ? (
          <div>
            <SectionHeader>Utility Types</SectionHeader>
            <div className="grid grid-cols-2 gap-2">
              {UTILITY_TYPE_MAP.map((ut) => (
                <div
                  key={ut.name}
                  className="rounded border px-3 py-2 flex items-center justify-between"
                  style={{
                    borderColor: `${ut.color}33`,
                    background: `${ut.color}08`,
                  }}
                >
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{ color: ut.color }}
                  >
                    {ut.name}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                    {ut.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </DemoLayout>
    </>
  );
}
