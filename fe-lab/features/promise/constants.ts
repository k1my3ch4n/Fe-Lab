export type PromiseState = "pending" | "fulfilled" | "rejected";

export interface PromiseItem {
  id: number;
  label: string;
  delay: number;
  shouldReject: boolean;
  state: PromiseState;
  value?: string;
}

export interface MethodExample {
  id: string;
  label: string;
  code: string;
  description: string;
  color: string;
}

export const PROMISE_METHODS: MethodExample[] = [
  {
    id: "basic",
    label: "기본 Promise",
    code: `const promise = new Promise((resolve, reject) => {
  // 비동기 작업 수행
  setTimeout(() => {
    resolve('성공!');    // fulfilled 상태로 전이
    // reject('실패!');  // rejected 상태로 전이
  }, 1000);
});

promise
  .then(value => console.log(value))   // '성공!'
  .catch(error => console.log(error))
  .finally(() => console.log('완료'));`,
    description:
      "Promise는 pending → fulfilled 또는 pending → rejected로 한 번만 전이됩니다.",
    color: "#00e5ff",
  },
  {
    id: "all",
    label: "Promise.all",
    code: `// 모든 Promise가 fulfilled되면 결과 배열 반환
// 하나라도 rejected되면 즉시 reject
const results = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments'),
]);

// results = [usersResponse, postsResponse, commentsResponse]`,
    description:
      "모든 Promise가 성공해야 성공합니다. 하나라도 실패하면 전체가 실패합니다.",
    color: "#00e676",
  },
  {
    id: "race",
    label: "Promise.race",
    code: `// 가장 먼저 settle된 Promise의 결과를 반환
const result = await Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) =>
    setTimeout(() => reject('Timeout'), 5000)
  ),
]);

// 5초 안에 응답이 오면 → 데이터
// 5초 초과 → 'Timeout' reject`,
    description:
      "가장 먼저 완료(성공 또는 실패)된 결과를 반환합니다. 타임아웃 구현에 활용됩니다.",
    color: "#ffb800",
  },
  {
    id: "allSettled",
    label: "allSettled",
    code: `// 모든 Promise가 settle될 때까지 대기
const results = await Promise.allSettled([
  Promise.resolve('A'),
  Promise.reject('B'),
  Promise.resolve('C'),
]);

// [
//   { status: 'fulfilled', value: 'A' },
//   { status: 'rejected',  reason: 'B' },
//   { status: 'fulfilled', value: 'C' },
// ]`,
    description:
      "성공/실패 관계없이 모든 결과를 수집합니다. 각 결과의 status로 구분합니다.",
    color: "#ff2d8a",
  },
  {
    id: "any",
    label: "Promise.any",
    code: `// 가장 먼저 fulfilled된 Promise의 값을 반환
// 모두 rejected되면 AggregateError
const fastest = await Promise.any([
  fetch('https://cdn1.example.com/data'),
  fetch('https://cdn2.example.com/data'),
  fetch('https://cdn3.example.com/data'),
]);

// 가장 먼저 성공한 CDN의 응답 반환`,
    description:
      "가장 먼저 성공한 결과를 반환합니다. 모두 실패해야 실패합니다 (race의 반대).",
    color: "#b388ff",
  },
];

export const STATE_COLORS: Record<PromiseState, string> = {
  pending: "#ffb800",
  fulfilled: "#00e676",
  rejected: "#ff2d8a",
};

export const DEFAULT_PROMISES: Omit<PromiseItem, "state" | "value">[] = [
  { id: 1, label: "API 호출 A", delay: 1000, shouldReject: false },
  { id: 2, label: "API 호출 B", delay: 2000, shouldReject: false },
  { id: 3, label: "API 호출 C", delay: 1500, shouldReject: true },
];
