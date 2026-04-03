import type { WorkerComparison } from "./types";

export const WORKER_TYPES: WorkerComparison[] = [
  {
    id: "dedicated",
    label: "Dedicated Worker",
    description: "하나의 스크립트에서만 사용 가능한 전용 워커",
  },
  {
    id: "shared",
    label: "Shared Worker",
    description: "여러 탭/윈도우에서 공유 가능한 워커",
  },
  {
    id: "service",
    label: "Service Worker",
    description: "네트워크 프록시 역할, 오프라인 캐싱 및 푸시 알림 지원",
  },
];

export const HEAVY_COMPUTATION_CODE = `// 메인 스레드에서 실행 (UI 블로킹)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(40); // UI가 멈춤!

// 워커 스레드에서 실행 (UI 블로킹 없음)
const worker = new Worker('fib-worker.js');
worker.postMessage({ n: 40 });
worker.onmessage = (e) => {
  console.log(e.data.result); // UI 정상 동작
};`;

export const WORKER_COMMUNICATION_CODE = `// main.js
const worker = new Worker('worker.js');

// 메시지 전송
worker.postMessage({ type: 'calc', data: [1, 2, 3] });

// 결과 수신
worker.onmessage = (event) => {
  console.log('결과:', event.data);
};

// 에러 처리
worker.onerror = (error) => {
  console.error('Worker 에러:', error.message);
};

// 종료
worker.terminate();`;
