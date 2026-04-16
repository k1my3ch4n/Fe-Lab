import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Dedicated Worker",
    code: `// worker.js
self.onmessage = function(event) {
  const { type, data } = event.data;

  if (type === 'heavy-calc') {
    // 무거운 계산을 워커에서 수행
    const result = data.reduce((sum, n) => {
      for (let i = 0; i < 1000000; i++) { sum += Math.sqrt(n); }
      return sum;
    }, 0);
    self.postMessage({ type: 'result', data: result });
  }
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage({ type: 'heavy-calc', data: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log('결과:', e.data);
worker.onerror = (e) => console.error('에러:', e.message);`,
  },
  {
    title: "Shared Worker",
    code: `// shared-worker.js — 여러 탭에서 공유
const connections = [];

self.onconnect = function(e) {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = function(event) {
    // 모든 연결된 탭에 브로드캐스트
    connections.forEach(conn => {
      conn.postMessage({
        from: event.data.tabId,
        message: event.data.message,
        connections: connections.length
      });
    });
  };
};

// 각 탭에서 사용
const worker = new SharedWorker('shared-worker.js');
worker.port.start();
worker.port.postMessage({ tabId: 'tab1', message: 'hello' });
worker.port.onmessage = (e) => console.log(e.data);`,
  },
  {
    title: "Service Worker",
    code: `// service-worker.js — 네트워크 프록시 & 오프라인 캐싱
const CACHE_NAME = 'v1';
const URLS_TO_CACHE = ['/', '/index.html', '/styles.css'];

// 설치 시 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

// 등록
navigator.serviceWorker.register('/service-worker.js');`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "웹 워커(Web Worker)란 무엇인가요?",
    answer: (
      <>
        웹 워커는 <strong>메인 스레드와 별개의 백그라운드 스레드</strong>에서
        JavaScript를 실행하는 API입니다. 무거운 연산을 워커에서 처리하면 UI가
        블로킹되지 않아 사용자 경험이 향상됩니다. 워커는 DOM에 직접 접근할 수
        없으며, <InlineCode>postMessage</InlineCode>를 통해 메인 스레드와
        통신합니다.
      </>
    ),
  },
  {
    question: "메인 스레드와 워커 스레드의 통신 방법을 설명해주세요.",
    answer: (
      <>
        <InlineCode>postMessage()</InlineCode>로 메시지를 전송하고,
        <InlineCode>onmessage</InlineCode> 이벤트로 수신합니다. 데이터는
        기본적으로 <strong>구조화된 복제(Structured Clone)</strong> 방식으로
        복사되어 전달됩니다. 대용량 데이터의 경우{" "}
        <InlineCode>Transferable Objects</InlineCode>
        (ArrayBuffer 등)를 사용하면 복사 없이 소유권을 이전하여 성능을 높일 수
        있습니다.
      </>
    ),
  },
  {
    question: "Dedicated Worker, Shared Worker, Service Worker의 차이점은?",
    answer: (
      <>
        <strong>Dedicated Worker</strong>는 생성한 스크립트에서만 사용 가능한
        1:1 전용 워커입니다.
        <strong> Shared Worker</strong>는 같은 origin의 여러 탭/윈도우에서
        공유할 수 있어 탭 간 통신에 유용합니다.
        <strong> Service Worker</strong>는 네트워크 프록시 역할을 하며, 오프라인
        캐싱, 푸시 알림, 백그라운드 동기화를 지원합니다. 페이지와 독립적인
        생명주기를 가집니다.
      </>
    ),
  },
];
