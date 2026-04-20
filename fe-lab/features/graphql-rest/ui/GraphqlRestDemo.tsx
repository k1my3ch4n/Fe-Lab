"use client";

import { useState } from "react";
import { useLog } from "@shared/hooks";
import { UNDER_FETCH_EXAMPLE } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
  SectionHeader,
} from "@shared/ui";
import { OverfetchComparison } from "./components/OverfetchComparison";
import { ComparisonTable } from "./components/ComparisonTable";

export default function GraphqlRestDemo() {
  const [activeTab, setActiveTab] = useState<
    "overfetch" | "underfetch" | "compare"
  >("overfetch");
  const { logs, addLog, clearLogs } = useLog();

  const handleReset = () => {
    clearLogs();
  };

  const tabs = [
    { id: "overfetch", label: "Over-fetching" },
    { id: "underfetch", label: "Under-fetching" },
    { id: "compare", label: "비교표" },
  ];
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={(i) => {
          setActiveTab(tabs[i].id as typeof activeTab);
          handleReset();
        }}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <>
                <ActionButton
                  variant="cyan"
                  onClick={() => {
                    clearLogs();
                    addLog("REST: GET /api/users/1");
                    addLog("→ 응답: 8개 필드 (200B)");
                    addLog("→ 사용: 2개 필드 (50B)");
                    addLog("→ 낭비: 75% Over-fetching ⚠️");
                    addLog("");
                    addLog("GraphQL: POST /graphql");
                    addLog("→ 응답: 2개 필드 (50B)");
                    addLog("→ 사용: 2개 필드 (50B)");
                    addLog("→ 낭비: 0% ✓");
                  }}
                >
                  Over-fetching 비교 실행
                </ActionButton>
                <ActionButton
                  variant="amber"
                  onClick={() => {
                    clearLogs();
                    addLog("REST 요청 흐름:");
                    addLog("  1. GET /users/1 → 50ms");
                    addLog("  2. GET /users/1/posts → 80ms");
                    addLog("  3. GET /users/1/followers → 60ms");
                    addLog("  총: 190ms (순차) / 140ms (병렬)");
                    addLog("");
                    addLog("GraphQL 요청:");
                    addLog("  1. POST /graphql → 100ms");
                    addLog("  총: 100ms ✓");
                  }}
                >
                  Under-fetching 비교 실행
                </ActionButton>
                <ActionButton
                  variant="magenta"
                  onClick={() => {
                    clearLogs();
                    addLog("N+1 문제 (GraphQL):");
                    addLog("  query { users { posts { title } } }");
                    addLog("");
                    addLog("  1. users 쿼리 → 1번 DB 조회");
                    addLog("  2. user[0].posts → 1번 DB 조회");
                    addLog("  3. user[1].posts → 1번 DB 조회");
                    addLog("  ...");
                    addLog("  N+1번 DB 조회 발생! ⚠️");
                    addLog("");
                    addLog("  해결: DataLoader로 배치 처리");
                    addLog("  → SELECT * FROM posts");
                    addLog("    WHERE userId IN (1, 2, ...) ✓");
                  }}
                >
                  N+1 문제 시뮬레이션
                </ActionButton>
              </>
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nREST/GraphQL 비교를 확인하세요"}
            />
          </RightPanel>
        }
      >
        {activeTab === "overfetch" ? (
          <OverfetchComparison />
        ) : activeTab === "underfetch" ? (
          <>
            <SectionHeader>
              필요한 데이터: 사용자 정보 + 게시글 + 팔로워
            </SectionHeader>

            <div className="grid grid-cols-2 gap-4">
              {/* REST */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3">
                <div
                  className="font-mono text-[12px] font-bold"
                  style={{ color: UNDER_FETCH_EXAMPLE.rest.color }}
                >
                  REST (Under-fetching)
                </div>
                {UNDER_FETCH_EXAMPLE.rest.requests.map((req, i) => (
                  <div key={i} className="rounded bg-bg-surface p-2">
                    <span className="font-mono text-caption text-accent-amber">
                      요청 {i + 1}:
                    </span>
                    <span className="font-mono text-caption text-accent-cyan ml-2">
                      {req}
                    </span>
                  </div>
                ))}
                <div className="font-mono text-caption text-accent-magenta mt-1">
                  → 3번의 왕복(round trip) 필요
                </div>
              </div>

              {/* GraphQL */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3">
                <div
                  className="font-mono text-[12px] font-bold"
                  style={{ color: UNDER_FETCH_EXAMPLE.graphql.color }}
                >
                  GraphQL (단일 요청)
                </div>
                <pre className="font-mono text-caption text-accent-cyan bg-bg-surface p-2 rounded leading-[1.6]">
                  {UNDER_FETCH_EXAMPLE.graphql.query}
                </pre>
                <div className="font-mono text-caption text-accent-green mt-1">
                  → 1번의 요청으로 모든 데이터 조회 ✓
                </div>
              </div>
            </div>
          </>
        ) : (
          <ComparisonTable />
        )}
      </DemoLayout>
    </>
  );
}
