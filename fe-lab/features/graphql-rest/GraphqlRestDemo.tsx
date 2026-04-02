"use client";

import { useState, useCallback } from "react";
import {
  FETCH_EXAMPLES,
  UNDER_FETCH_EXAMPLE,
  COMPARISON_TABLE,
} from "./constants";

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

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["overfetch", "underfetch", "compare"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              handleReset();
            }}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab === "overfetch"
              ? "Over-fetching"
              : tab === "underfetch"
                ? "Under-fetching"
                : "비교표"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {activeTab === "overfetch" ? (
            <>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
                필요한 데이터: name, email만 필요
              </div>

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
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
                필요한 데이터: 사용자 정보 + 게시글 + 팔로워
              </div>

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
        </div>

        {/* Right: Interactive Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              실행
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
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
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
            >
              Over-fetching 비교 실행
            </button>
            <button
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
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
            >
              Under-fetching 비교 실행
            </button>
            <button
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
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
            >
              N+1 문제 시뮬레이션
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                REST/GraphQL 비교를 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
