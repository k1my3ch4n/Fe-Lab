export type Difficulty = "junior" | "mid" | "senior";

export interface Topic {
  id: string;
  name: string;
  category: string;
  difficulty: Difficulty;
  color: string;
  implemented: boolean;
}

export interface Category {
  name: string;
  topics: Topic[];
}

const topicList: Topic[] = [
  // JavaScript
  {
    id: "event-bubbling",
    name: "이벤트 버블링 / 캡쳐링",
    category: "JavaScript",
    difficulty: "junior",
    color: "var(--accent-green)",
    implemented: true,
  },
  {
    id: "closure",
    name: "클로저",
    category: "JavaScript",
    difficulty: "junior",
    color: "var(--accent-amber)",
    implemented: true,
  },
  {
    id: "prototype-chain",
    name: "프로토타입 체인",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-violet)",
    implemented: true,
  },
  {
    id: "event-loop",
    name: "이벤트 루프",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  // Browser
  {
    id: "rendering-pipeline",
    name: "렌더링 파이프라인",
    category: "Browser",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  {
    id: "reflow-repaint",
    name: "리플로우 / 리페인트",
    category: "Browser",
    difficulty: "mid",
    color: "var(--accent-magenta)",
    implemented: true,
  },
  {
    id: "critical-rendering-path",
    name: "크리티컬 렌더링 패스",
    category: "Browser",
    difficulty: "senior",
    color: "var(--accent-amber)",
    implemented: true,
  },
  // React
  {
    id: "virtual-dom",
    name: "Virtual DOM",
    category: "React",
    difficulty: "junior",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  {
    id: "reconciliation",
    name: "재조정 (Reconciliation)",
    category: "React",
    difficulty: "senior",
    color: "var(--accent-green)",
    implemented: true,
  },
  {
    id: "hooks-lifecycle",
    name: "Hooks 라이프사이클",
    category: "React",
    difficulty: "mid",
    color: "var(--accent-violet)",
    implemented: true,
  },
  // Network
  {
    id: "cors",
    name: "CORS",
    category: "Network",
    difficulty: "junior",
    color: "var(--accent-amber)",
    implemented: true,
  },
  {
    id: "http-cache",
    name: "HTTP 캐시 전략",
    category: "Network",
    difficulty: "mid",
    color: "var(--accent-magenta)",
    implemented: true,
  },
  {
    id: "websocket-sse",
    name: "WebSocket vs SSE",
    category: "Network",
    difficulty: "senior",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  // JavaScript (신규)
  {
    id: "scope-context",
    name: "스코프와 실행 컨텍스트",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  {
    id: "promise",
    name: "Promise",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-amber)",
    implemented: true,
  },
  {
    id: "deep-shallow-copy",
    name: "깊은 복사 / 얕은 복사",
    category: "JavaScript",
    difficulty: "junior",
    color: "var(--accent-green)",
    implemented: true,
  },
  {
    id: "memory-management",
    name: "메모리 관리",
    category: "JavaScript",
    difficulty: "senior",
    color: "var(--accent-magenta)",
    implemented: true,
  },
  // Browser (신규)
  {
    id: "rendering-patterns",
    name: "CSR / SSR / ISR / SSG",
    category: "Browser",
    difficulty: "mid",
    color: "var(--accent-green)",
    implemented: true,
  },
  {
    id: "web-worker",
    name: "웹 워커",
    category: "Browser",
    difficulty: "mid",
    color: "var(--accent-violet)",
    implemented: true,
  },
  // React (신규)
  {
    id: "react-memo",
    name: "React 메모이제이션",
    category: "React",
    difficulty: "mid",
    color: "var(--accent-amber)",
    implemented: true,
  },
  {
    id: "use-ref",
    name: "useRef",
    category: "React",
    difficulty: "junior",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  {
    id: "module-bundling",
    name: "모듈 번들링과 최적화",
    category: "React",
    difficulty: "mid",
    color: "var(--accent-magenta)",
    implemented: true,
  },
  // Network (신규)
  {
    id: "http-protocol",
    name: "HTTP 프로토콜",
    category: "Network",
    difficulty: "mid",
    color: "var(--accent-green)",
    implemented: true,
  },
  {
    id: "cookie-session",
    name: "쿠키와 세션",
    category: "Network",
    difficulty: "junior",
    color: "var(--accent-violet)",
    implemented: true,
  },
  {
    id: "graphql-rest",
    name: "GraphQL vs REST",
    category: "Network",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: true,
  },
  // Performance (신규 카테고리)
  {
    id: "cdn",
    name: "CDN",
    category: "Performance",
    difficulty: "mid",
    color: "var(--accent-amber)",
    implemented: true,
  },
  {
    id: "network-debugging",
    name: "네트워크 디버깅",
    category: "Performance",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: true,
  },
];

export function getCategories(): Category[] {
  const categoryMap = new Map<string, Topic[]>();
  for (const topic of topicList) {
    const list = categoryMap.get(topic.category) ?? [];
    list.push(topic);
    categoryMap.set(topic.category, list);
  }
  return Array.from(categoryMap.entries()).map(([name, topics]) => ({
    name,
    topics,
  }));
}

export function getTopic(id: string): Topic | undefined {
  return topicList.find((t) => t.id === id);
}

export const difficultyConfig: Record<
  Difficulty,
  { label: string; className: string }
> = {
  junior: { label: "Jr", className: "bg-accent-green-dim text-accent-green" },
  mid: { label: "Mid", className: "bg-accent-amber-dim text-accent-amber" },
  senior: {
    label: "Sr",
    className: "bg-accent-magenta-dim text-accent-magenta",
  },
};
