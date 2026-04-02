export interface DomNode {
  id: string;
  tag: string;
  text?: string;
  children?: DomNode[];
}

export interface ComparisonItem {
  category: string;
  realDom: string;
  virtualDom: string;
}

export const DOM_COMPARISON: ComparisonItem[] = [
  {
    category: "업데이트 방식",
    realDom: "변경 시 전체 DOM 트리를 다시 렌더링",
    virtualDom: "변경된 노드만 최소한으로 업데이트",
  },
  {
    category: "성능",
    realDom: "DOM 조작마다 리플로우/리페인트 발생",
    virtualDom: "Batch 처리로 리플로우 최소화",
  },
  {
    category: "메모리",
    realDom: "무거운 DOM 노드 객체 직접 조작",
    virtualDom: "가벼운 JS 객체로 비교 후 반영",
  },
  {
    category: "개발 편의성",
    realDom: "수동으로 DOM 변경 관리 필요",
    virtualDom: "선언적 UI — 상태만 관리하면 됨",
  },
];

export const INITIAL_TREE: DomNode = {
  id: "root",
  tag: "div",
  children: [
    {
      id: "header",
      tag: "h1",
      text: "Hello",
    },
    {
      id: "list",
      tag: "ul",
      children: [
        { id: "item-1", tag: "li", text: "Item A" },
        { id: "item-2", tag: "li", text: "Item B" },
      ],
    },
    {
      id: "footer",
      tag: "p",
      text: "Footer",
    },
  ],
};

export const UPDATED_TREE: DomNode = {
  id: "root",
  tag: "div",
  children: [
    {
      id: "header",
      tag: "h1",
      text: "Hi!",
    },
    {
      id: "list",
      tag: "ul",
      children: [
        { id: "item-1", tag: "li", text: "Item A" },
        { id: "item-2", tag: "li", text: "Item B*" },
        { id: "item-3", tag: "li", text: "Item C" },
      ],
    },
  ],
};

// Diff result: which nodes changed and how
export type DiffStatus = "unchanged" | "modified" | "added" | "removed";

export interface DiffEntry {
  id: string;
  status: DiffStatus;
  detail?: string;
}

export const DIFF_RESULT: DiffEntry[] = [
  { id: "root", status: "unchanged" },
  { id: "header", status: "modified", detail: '"Hello" → "Hi!"' },
  { id: "list", status: "unchanged" },
  { id: "item-1", status: "unchanged" },
  { id: "item-2", status: "modified", detail: '"Item B" → "Item B*"' },
  { id: "item-3", status: "added", detail: "새 노드 추가" },
  { id: "footer", status: "removed", detail: "노드 삭제" },
];

export const STEP_LABELS = [
  "초기 상태",
  "상태 변경 → 새 Virtual DOM 생성",
  "Diffing (비교)",
  "최소 DOM 업데이트 적용",
] as const;
