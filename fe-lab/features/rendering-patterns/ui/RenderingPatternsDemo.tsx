"use client";

import { useState } from "react";
import { TabBar, DemoLayout, SectionHeader } from "@shared/ui";
import { RENDERING_PATTERNS, TABS } from "../model/constants";

export default function RenderingPatternsDemo() {
  const [activePattern, setActivePattern] = useState(0);

  const pattern = RENDERING_PATTERNS[activePattern];

  const rightPanel = (
    <>
      <div className="px-4 py-3 border-b border-border-subtle">
        <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
          비교
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 font-mono text-[11px]">
        {[
          { label: "초기 로딩", values: ["느림", "보통", "빠름", "빠름"] },
          { label: "SEO", values: ["나쁨", "좋음", "좋음", "좋음"] },
          { label: "서버 부하", values: ["낮음", "높음", "없음", "낮음"] },
          {
            label: "데이터 최신성",
            values: ["실시간", "실시간", "빌드 시", "주기적"],
          },
          { label: "TTFB", values: ["빠름", "느림", "빠름", "빠름"] },
        ].map((row) => (
          <div key={row.label} className="flex flex-col gap-1">
            <span className="text-text-muted text-[10px]">{row.label}</span>
            <span
              className="px-2 py-1 rounded bg-bg-deep"
              style={{
                color:
                  row.values[activePattern].includes("좋") ||
                  row.values[activePattern].includes("빠") ||
                  row.values[activePattern] === "낮음" ||
                  row.values[activePattern] === "없음" ||
                  row.values[activePattern] === "실시간"
                    ? "#00e676"
                    : row.values[activePattern].includes("나") ||
                        row.values[activePattern].includes("느") ||
                        row.values[activePattern] === "높음"
                      ? "#ff2d8a"
                      : "#ffb800",
              }}
            >
              {row.values[activePattern]}
            </span>
          </div>
        ))}
      </div>

      {/* Use case */}
      <div className="mt-auto p-4 border-t border-border-subtle">
        <div className="font-mono text-[10px] text-text-muted mb-2">
          적합한 사용처
        </div>
        <div className="font-mono text-[11px] text-accent-amber leading-[1.6]">
          {activePattern === 0 && "SPA, 대시보드, 관리자 페이지"}
          {activePattern === 1 && "SNS, 실시간 데이터 페이지"}
          {activePattern === 2 && "블로그, 문서 사이트, 랜딩 페이지"}
          {activePattern === 3 && "이커머스, 뉴스 사이트"}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={TABS}
        activeIndex={activePattern}
        onTabChange={setActivePattern}
      />

      <DemoLayout rightPanel={rightPanel}>
        {/* Description */}
        <div className="text-sm text-text-secondary leading-[1.8]">
          {pattern.description}
        </div>

        {/* Timeline */}
        <div>
          <SectionHeader>Timeline</SectionHeader>
          <div className="flex flex-col gap-2">
            {pattern.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] w-[120px] shrink-0 text-right"
                  style={{ color: step.color }}
                >
                  {step.label}
                </span>
                <div className="flex-1 h-6 bg-bg-deep rounded relative overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded transition-all duration-500"
                    style={{
                      left: `${step.start}%`,
                      width: `${step.end - step.start}%`,
                      background: `${step.color}44`,
                      borderLeft: `2px solid ${step.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Time axis */}
          <div className="flex items-center mt-2 ml-[132px]">
            <div className="flex-1 flex justify-between font-mono text-[9px] text-text-muted">
              <span>요청</span>
              <span>FCP</span>
              <span>TTI</span>
            </div>
          </div>
        </div>

        {/* Data Flow */}
        <div>
          <SectionHeader>Data Flow</SectionHeader>
          <div className="flex flex-col gap-1.5">
            {pattern.flow.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-accent-cyan shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] text-text-secondary">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DemoLayout>
    </>
  );
}
