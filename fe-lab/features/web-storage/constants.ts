export const STORAGE_TABS = [
  { id: "local", label: "localStorage" },
  { id: "session", label: "sessionStorage" },
  { id: "indexed", label: "IndexedDB" },
] as const;

export type StorageTabId = (typeof STORAGE_TABS)[number]["id"];

export interface StorageEntry {
  key: string;
  value: string;
  timestamp: number;
}

export const STORAGE_LIMITS = {
  localStorage: "~5–10 MB",
  sessionStorage: "~5–10 MB",
  IndexedDB: "수백 MB ~ 무제한",
} as const;

export const COMPARISON_ROWS = [
  {
    feature: "수명",
    localStorage: "영구 (수동 삭제)",
    sessionStorage: "탭 종료 시 삭제",
    indexedDB: "영구 (수동 삭제)",
  },
  {
    feature: "용량",
    localStorage: "~5–10 MB",
    sessionStorage: "~5–10 MB",
    indexedDB: "수백 MB+",
  },
  {
    feature: "데이터 형식",
    localStorage: "문자열만",
    sessionStorage: "문자열만",
    indexedDB: "구조화된 객체",
  },
  {
    feature: "API 방식",
    localStorage: "동기",
    sessionStorage: "동기",
    indexedDB: "비동기",
  },
  {
    feature: "접근 범위",
    localStorage: "같은 출처 전체",
    sessionStorage: "같은 탭만",
    indexedDB: "같은 출처 전체",
  },
] as const;
