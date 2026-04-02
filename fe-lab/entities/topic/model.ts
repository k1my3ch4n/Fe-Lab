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
    implemented: false,
  },
  {
    id: "prototype-chain",
    name: "프로토타입 체인",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-violet)",
    implemented: false,
  },
  {
    id: "event-loop",
    name: "이벤트 루프",
    category: "JavaScript",
    difficulty: "mid",
    color: "var(--accent-cyan)",
    implemented: false,
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
    implemented: false,
  },
  {
    id: "critical-rendering-path",
    name: "크리티컬 렌더링 패스",
    category: "Browser",
    difficulty: "senior",
    color: "var(--accent-amber)",
    implemented: false,
  },
  // React
  {
    id: "virtual-dom",
    name: "Virtual DOM",
    category: "React",
    difficulty: "junior",
    color: "var(--accent-cyan)",
    implemented: false,
  },
  {
    id: "reconciliation",
    name: "재조정 (Reconciliation)",
    category: "React",
    difficulty: "senior",
    color: "var(--accent-green)",
    implemented: false,
  },
  {
    id: "hooks-lifecycle",
    name: "Hooks 라이프사이클",
    category: "React",
    difficulty: "mid",
    color: "var(--accent-violet)",
    implemented: false,
  },
  // Network
  {
    id: "cors",
    name: "CORS",
    category: "Network",
    difficulty: "junior",
    color: "var(--accent-amber)",
    implemented: false,
  },
  {
    id: "http-cache",
    name: "HTTP 캐시 전략",
    category: "Network",
    difficulty: "mid",
    color: "var(--accent-magenta)",
    implemented: false,
  },
  {
    id: "websocket-sse",
    name: "WebSocket vs SSE",
    category: "Network",
    difficulty: "senior",
    color: "var(--accent-cyan)",
    implemented: false,
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
