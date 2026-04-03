"use client";

import { INVALIDATION_STRATEGIES } from "../constants";
import { ActionButton, SectionHeader } from "@shared/ui";

interface UseInvalidationTabOptions {
  addLog: (text: string, color?: string) => void;
  clearLogs: () => void;
}

export function useInvalidationTab({
  addLog,
  clearLogs,
}: UseInvalidationTabOptions) {
  const reset = () => {};

  const actions = (
    <>
      <ActionButton
        variant="cyan"
        onClick={() => {
          clearLogs();
          addLog("Cache-Control: public, max-age=3600");
          addLog("→ 1시간 동안 엣지에서 캐시");
          addLog("→ 만료 후 오리진에 재검증");
          addLog("");
          addLog("CDN-Cache-Control: max-age=86400");
          addLog("→ CDN 전용 캐시 정책 분리 가능");
        }}
      >
        Cache-Control 설정
      </ActionButton>
      <ActionButton
        variant="magenta"
        onClick={() => {
          clearLogs();
          addLog("퍼지 요청: /api/cdn/purge");
          addLog("→ 대상: /assets/style.css");
          addLog("→ 전 세계 엣지 서버에서 삭제");
          addLog("→ 다음 요청 시 오리진에서 갱신 ✓");
        }}
      >
        캐시 퍼지 시뮬레이션
      </ActionButton>
    </>
  );

  const content = (
    <div className="flex flex-col gap-3">
      <SectionHeader>캐시 무효화 전략</SectionHeader>
      {INVALIDATION_STRATEGIES.map((strategy) => (
        <div
          key={strategy.name}
          className="rounded-lg border border-border-subtle bg-bg-deep p-4"
        >
          <div
            className="font-[family-name:var(--font-mono)] text-[12px] font-bold mb-1"
            style={{ color: strategy.color }}
          >
            {strategy.name}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.6]">
            {strategy.description}
          </div>
        </div>
      ))}

      {/* Fingerprinting example */}
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
        <SectionHeader>에셋 핑거프린팅 예시</SectionHeader>
        <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan leading-[1.8]">
          {`// 빌드 시 파일명에 해시 포함
app.js      → app.a1b2c3d4.js
style.css   → style.e5f6g7h8.css

// HTML에서 참조
<script src="/app.a1b2c3d4.js"></script>

// Cache-Control: max-age=31536000 (1년)
// → 파일 변경 시 해시가 바뀌므로 새로운 URL
// → 캐시 무효화 없이 항상 최신 파일 제공`}
        </pre>
      </div>
    </div>
  );

  return { actions, content, reset };
}
