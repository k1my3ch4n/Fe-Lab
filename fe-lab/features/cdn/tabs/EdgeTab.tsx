"use client";

import { useState } from "react";
import { EDGE_SERVERS, ORIGIN_SERVER } from "../constants";
import { ActionButton, SectionHeader } from "@shared/ui";

interface UseEdgeTabOptions {
  addLog: (text: string, color?: string) => void;
  clearLogs: () => void;
}

export function useEdgeTab({ addLog, clearLogs }: UseEdgeTabOptions) {
  const [highlightEdge, setHighlightEdge] = useState<string | null>(null);

  const reset = () => {
    setHighlightEdge(null);
  };

  const actions = (
    <>
      <ActionButton
        variant="cyan"
        onClick={() => {
          clearLogs();
          addLog("서울 사용자 → Seoul 엣지 (~5ms)");
          addLog("도쿄 사용자 → Tokyo 엣지 (~8ms)");
          addLog("뉴욕 사용자 → Virginia 엣지 (~10ms)");
          addLog("");
          addLog("CDN 없이 (Origin 직접):");
          addLog("서울 → Virginia Origin (~200ms)");
        }}
      >
        지연 시간 비교
      </ActionButton>
      <ActionButton
        variant="green"
        onClick={() => {
          clearLogs();
          addLog("엣지 서버 수: 10개 리전");
          addLog("Asia: Seoul, Tokyo, Singapore, Mumbai");
          addLog("Europe: Frankfurt, London");
          addLog("America: Virginia, Oregon, São Paulo");
          addLog("Oceania: Sydney");
        }}
      >
        서버 목록 확인
      </ActionButton>
    </>
  );

  const content = (
    <>
      {/* World map (simplified) */}
      <div
        className="rounded-lg border border-border-subtle bg-bg-deep p-4 relative"
        style={{ minHeight: "280px" }}
      >
        <SectionHeader>전 세계 엣지 서버 분포</SectionHeader>
        <div className="relative w-full" style={{ height: "220px" }}>
          {/* Origin server */}
          <div
            className="absolute w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              left: `${ORIGIN_SERVER.x}%`,
              top: `${ORIGIN_SERVER.y}%`,
              backgroundColor: ORIGIN_SERVER.color,
              boxShadow: `0 0 8px ${ORIGIN_SERVER.color}`,
            }}
            title={`Origin: ${ORIGIN_SERVER.name}`}
          />

          {/* Edge servers */}
          {EDGE_SERVERS.map((edge) => (
            <div
              key={edge.id}
              className="absolute w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150"
              style={{
                left: `${edge.x}%`,
                top: `${edge.y}%`,
                backgroundColor:
                  highlightEdge === edge.id ? "#fff" : edge.color,
                boxShadow:
                  highlightEdge === edge.id
                    ? `0 0 12px ${edge.color}`
                    : `0 0 4px ${edge.color}66`,
              }}
              onMouseEnter={() => setHighlightEdge(edge.id)}
              onMouseLeave={() => setHighlightEdge(null)}
              title={`${edge.name} (${edge.region})`}
            />
          ))}

          {/* Tooltip */}
          {highlightEdge &&
            (() => {
              const edge = EDGE_SERVERS.find((e) => e.id === highlightEdge);
              if (!edge) return null;
              return (
                <div
                  className="absolute bg-bg-elevated border border-border-subtle rounded px-2 py-1 pointer-events-none z-10"
                  style={{
                    left: `${edge.x + 2}%`,
                    top: `${edge.y - 8}%`,
                  }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-primary">
                    {edge.name}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[8px] text-text-muted">
                    {edge.region}
                  </div>
                </div>
              );
            })()}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#ff2d8a" }}
            />
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
              Origin
            </span>
          </div>
          {[
            { label: "Asia", color: "#00e5ff" },
            { label: "Europe", color: "#b388ff" },
            { label: "America", color: "#00e676" },
            { label: "Oceania", color: "#ffb800" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: r.color }}
              />
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return { actions, content, reset };
}
