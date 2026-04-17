"use client";

import { useState } from "react";
import { TYPE_GUARD_EXAMPLES, TABS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  SectionHeader,
  ActionButton,
  CodeBlock,
} from "@shared/ui";
import { useLog } from "@shared/hooks";

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
              <>
                {activeExample === 0 && (
                  <div className="flex flex-col gap-2">
                    <ActionButton
                      variant="cyan"
                      onClick={() =>
                        handleGuardCheck('"hello" (string)', "string")
                      }
                    >
                      format(&quot;hello&quot;)
                    </ActionButton>
                    <ActionButton
                      variant="amber"
                      onClick={() =>
                        handleGuardCheck("3.14159 (number)", "number")
                      }
                    >
                      format(3.14159)
                    </ActionButton>
                  </div>
                )}
                {activeExample === 1 && (
                  <div className="flex flex-col gap-2">
                    <ActionButton
                      variant="violet"
                      onClick={() =>
                        handleGuardCheck("new Dog()", "Dog → bark()")
                      }
                    >
                      speak(new Dog())
                    </ActionButton>
                    <ActionButton
                      variant="green"
                      onClick={() =>
                        handleGuardCheck("new Cat()", "Cat → meow()")
                      }
                    >
                      speak(new Cat())
                    </ActionButton>
                  </div>
                )}
                {activeExample === 2 && (
                  <div className="flex flex-col gap-2">
                    <ActionButton
                      variant="cyan"
                      onClick={() =>
                        handleGuardCheck("{ swim() }", "Fish → swim()")
                      }
                    >
                      move(fish)
                    </ActionButton>
                    <ActionButton
                      variant="green"
                      onClick={() =>
                        handleGuardCheck("{ fly() }", "Bird → fly()")
                      }
                    >
                      move(bird)
                    </ActionButton>
                  </div>
                )}
                {activeExample === 3 && (
                  <div className="flex flex-col gap-2">
                    <ActionButton
                      variant="amber"
                      onClick={() =>
                        handleGuardCheck(
                          '{ role: "admin" }',
                          "Admin → permissions",
                        )
                      }
                    >
                      getInfo(admin)
                    </ActionButton>
                    <ActionButton
                      variant="magenta"
                      onClick={() =>
                        handleGuardCheck('{ role: "user" }', "User → email")
                      }
                    >
                      getInfo(user)
                    </ActionButton>
                  </div>
                )}
                {activeExample === 4 && (
                  <div className="flex flex-col gap-2">
                    <ActionButton
                      variant="cyan"
                      onClick={() => {
                        handleGuardCheck(
                          '{ kind: "circle" }',
                          "circle → radius",
                        );
                        addLog("area = π × r²");
                      }}
                    >
                      area(circle)
                    </ActionButton>
                    <ActionButton
                      variant="amber"
                      onClick={() => {
                        handleGuardCheck(
                          '{ kind: "rectangle" }',
                          "rectangle → w, h",
                        );
                        addLog("area = w × h");
                      }}
                    >
                      area(rectangle)
                    </ActionButton>
                    <ActionButton
                      variant="magenta"
                      onClick={() => {
                        handleGuardCheck(
                          '{ kind: "triangle" }',
                          "triangle → base, height",
                        );
                        addLog("area = (base × height) / 2");
                      }}
                    >
                      area(triangle)
                    </ActionButton>
                  </div>
                )}
              </>
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
        <CodeBlock>
          {example.code}
        </CodeBlock>

        {/* Type Narrowing Visualization */}
        <div>
          <SectionHeader>Type Narrowing</SectionHeader>
          <div className="flex items-center gap-3">
            {/* Before Guard */}
            <div
              className="flex-1 rounded-lg border p-3"
              style={{
                borderColor: "#666",
                background: "#ffffff08",
              }}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1 text-text-muted">
                Before Guard
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                {example.beforeType}
              </div>
            </div>

            {/* Guard */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-1 rounded"
                style={{
                  color: example.color,
                  background: `${example.color}22`,
                }}
              >
                guard
              </div>
              <div className="text-text-muted text-lg">→</div>
            </div>

            {/* After Guard */}
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
                After Guard
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary whitespace-pre-line">
                {narrowedType ?? example.afterType}
              </div>
            </div>
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
