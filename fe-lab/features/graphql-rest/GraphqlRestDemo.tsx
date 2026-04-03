"use client";

import { useState, useCallback } from "react";
import {
  FETCH_EXAMPLES,
  UNDER_FETCH_EXAMPLE,
  COMPARISON_TABLE,
} from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  ActionButton,
  LogPanel,
  SectionHeader,
} from "@shared/ui";

export default function GraphqlRestDemo() {
  const [activeTab, setActiveTab] = useState<
    "overfetch" | "underfetch" | "compare"
  >("overfetch");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setLogs([]);
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
          <>
            <PanelHeader label="실행" onReset={handleReset} />

            <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
              <ActionButton
                variant="cyan"
                onClick={() => {
                  setLogs([]);
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
                  setLogs([]);
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
                  setLogs([]);
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
            </div>

            {/* Log */}
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nREST/GraphQL 비교를 확인하세요"}
            />
          </>
        }
      >
        {activeTab === "overfetch" ? (
          <>
            <SectionHeader>필요한 데이터: name, email만 필요</SectionHeader>

            <div className="grid grid-cols-2 gap-4">
              {FETCH_EXAMPLES.map((ex) => (
                <div
                  key={ex.style.id}
                  className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
                    style={{ color: ex.style.color }}
                  >
                    {ex.style.label}
                  </div>

                  {/* Request */}
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase mb-1">
                      Request
                    </div>
                    <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan bg-bg-surface p-2 rounded leading-[1.6] overflow-x-auto">
                      {ex.request}
                    </pre>
                  </div>

                  {/* Response */}
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase mb-1">
                      Response
                    </div>
                    <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green bg-bg-surface p-2 rounded leading-[1.6] overflow-x-auto">
                      {ex.response}
                    </pre>
                  </div>

                  {/* Data efficiency */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(ex.neededFields / ex.totalFields) * 100}%`,
                          backgroundColor:
                            ex.neededFields === ex.totalFields
                              ? "#00e676"
                              : "#ff2d8a",
                        }}
                      />
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                      {ex.neededFields}/{ex.totalFields} 필드
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Waste indicator */}
            <div className="rounded-lg border border-accent-magenta/30 bg-accent-magenta-dim p-3 text-center">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
                REST: 불필요한 6개 필드 전송 (Over-fetching)
              </span>
            </div>
          </>
        ) : activeTab === "underfetch" ? (
          <>
            <SectionHeader>
              필요한 데이터: 사용자 정보 + 게시글 + 팔로워
            </SectionHeader>

            <div className="grid grid-cols-2 gap-4">
              {/* REST */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3">
                <div
                  className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
                  style={{ color: UNDER_FETCH_EXAMPLE.rest.color }}
                >
                  REST (Under-fetching)
                </div>
                {UNDER_FETCH_EXAMPLE.rest.requests.map((req, i) => (
                  <div key={i} className="rounded bg-bg-surface p-2">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-amber">
                      요청 {i + 1}:
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan ml-2">
                      {req}
                    </span>
                  </div>
                ))}
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta mt-1">
                  → 3번의 왕복(round trip) 필요
                </div>
              </div>

              {/* GraphQL */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3">
                <div
                  className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
                  style={{ color: UNDER_FETCH_EXAMPLE.graphql.color }}
                >
                  GraphQL (단일 요청)
                </div>
                <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan bg-bg-surface p-2 rounded leading-[1.6]">
                  {UNDER_FETCH_EXAMPLE.graphql.query}
                </pre>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mt-1">
                  → 1번의 요청으로 모든 데이터 조회 ✓
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Comparison table */
          <div className="rounded-lg border border-border-subtle bg-bg-deep overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted text-left p-3 uppercase tracking-wider">
                    비교 항목
                  </th>
                  <th className="font-[family-name:var(--font-mono)] text-[10px] text-accent-amber text-left p-3 uppercase tracking-wider">
                    REST
                  </th>
                  <th className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan text-left p-3 uppercase tracking-wider">
                    GraphQL
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i < COMPARISON_TABLE.length - 1
                        ? "border-b border-border-subtle"
                        : ""
                    }
                  >
                    <td className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary p-3 font-semibold">
                      {row.aspect}
                    </td>
                    <td className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted p-3">
                      {row.rest}
                    </td>
                    <td className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted p-3">
                      {row.graphql}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DemoLayout>
    </>
  );
}
