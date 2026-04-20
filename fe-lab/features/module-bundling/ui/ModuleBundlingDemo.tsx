"use client";

import { useState } from "react";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
} from "@shared/ui";
import { BUNDLE_EXAMPLES, TABS } from "../model/constants";
import { BundleModuleList } from "./components/BundleModuleList";
import { BundleSizeSummary } from "./components/BundleSizeSummary";

export default function ModuleBundlingDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [showOptimized, setShowOptimized] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const example = BUNDLE_EXAMPLES[activeExample];

  const handleToggleOptimize = () => {
    const next = !showOptimized;
    setShowOptimized(next);

    if (next) {
      if (activeExample === 0) {
        setLogs((prev) => [
          ...prev,
          "트리 쉐이킹 적용: 미사용 함수 제거",
          `번들 사이즈: ${example.totalSize}KB → ${example.optimizedSize}KB (${Math.round((1 - example.optimizedSize / example.totalSize) * 100)}% 감소)`,
        ]);
      } else if (activeExample === 1) {
        setLogs((prev) => [
          ...prev,
          "코드 스플릿팅 적용: 라우트별 청크 분리",
          `초기 로드: ${example.totalSize}KB → ${example.optimizedSize}KB`,
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          "ESM 정적 분석으로 dead code 제거",
          `ESM: ${example.optimizedSize}KB vs CJS: ${example.totalSize}KB`,
        ]);
      }
    }
  };

  const handleReset = () => {
    setShowOptimized(false);
    setLogs([]);
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
              <ActionButton
                variant={showOptimized ? "magenta" : "green"}
                onClick={handleToggleOptimize}
              >
                {showOptimized ? "최적화 해제" : "최적화 적용"}
              </ActionButton>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"최적화를 적용하여\n번들 변화를 확인하세요"}
            />
          </RightPanel>
        }
      >
        <div className="text-sm text-text-secondary leading-[1.8]">
          {example.description}
        </div>

        <BundleModuleList
          activeExample={activeExample}
          modules={example.modules}
          showOptimized={showOptimized}
        />

        <BundleSizeSummary
          totalSize={example.totalSize}
          optimizedSize={example.optimizedSize}
          showOptimized={showOptimized}
        />
      </DemoLayout>
    </>
  );
}
