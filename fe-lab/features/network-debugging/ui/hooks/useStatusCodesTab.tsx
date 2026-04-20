"use client";

import { useState } from "react";
import { STATUS_CODES } from "../../model/constants";
import { ActionButton } from "@shared/ui";

interface UseStatusCodesTabOptions {
  addLog: (text: string) => void;
  clearLogs: () => void;
}

export function useStatusCodesTab({
  addLog,
  clearLogs,
}: UseStatusCodesTabOptions) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(STATUS_CODES.map((s) => s.category))];

  const reset = () => {
    setSelectedCategory(null);
  };

  const actions = (
    <>
      <ActionButton
        variant="cyan"
        onClick={() => {
          clearLogs();
          addLog("200 OK → 성공적으로 처리됨");
          addLog("301 → 영구 이동 (브라우저 캐시)");
          addLog("302 → 임시 이동 (캐시 안 함)");
          addLog("304 → 변경 없음 (캐시 사용)");
          addLog("");
          addLog("캐시 흐름:");
          addLog("요청 → ETag/If-None-Match 확인");
          addLog("→ 변경 없으면 304 (빈 응답)");
          addLog("→ 브라우저가 로컬 캐시 사용 ✓");
        }}
      >
        리다이렉트/캐시 흐름
      </ActionButton>
      <ActionButton
        variant="magenta"
        onClick={() => {
          clearLogs();
          addLog("401 vs 403 차이:");
          addLog("  401: 인증되지 않음 (로그인 필요)");
          addLog("  403: 인증됨 but 권한 없음");
          addLog("");
          addLog("500 vs 502 vs 503:");
          addLog("  500: 서버 코드 오류");
          addLog("  502: 프록시/게이트웨이 뒤 서버 오류");
          addLog("  503: 서비스 일시 중단 (과부하)");
        }}
      >
        에러 코드 구분
      </ActionButton>
    </>
  );

  const content = (
    <>
      {/* Category filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
            selectedCategory === null
              ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
              : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
          }`}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status codes grid */}
      <div className="grid grid-cols-2 gap-2">
        {STATUS_CODES.filter(
          (s) => !selectedCategory || s.category === selectedCategory,
        ).map((status) => (
          <div
            key={status.code}
            className="rounded-lg border border-border-subtle bg-bg-deep p-3 cursor-pointer hover:bg-bg-surface transition-all duration-200"
            onClick={() => {
              addLog(`${status.code} ${status.name}`);
              addLog(`  → ${status.description}`);
              addLog(`  카테고리: ${status.category}`);
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-[family-name:var(--font-mono)] text-[14px] font-bold"
                style={{ color: status.color }}
              >
                {status.code}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
                {status.name}
              </span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mt-1">
              {status.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return { actions, content, reset };
}
