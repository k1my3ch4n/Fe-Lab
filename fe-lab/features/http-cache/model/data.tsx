import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Cache-Control 헤더 전략",
    code: `// 정적 에셋 — 장기 캐싱 (해시된 파일명 사용)
Cache-Control: public, max-age=31536000, immutable

// API 응답 — 항상 서버 검증
Cache-Control: no-cache
// no-cache: 캐시 저장은 하되, 사용 전 반드시 서버에 검증
// no-store: 캐시 저장 자체를 하지 않음

// HTML 문서 — 짧은 캐시 + 재검증
Cache-Control: public, max-age=0, must-revalidate

// CDN + stale-while-revalidate
Cache-Control: public, max-age=60, stale-while-revalidate=120
// 60초간 fresh → 120초간 stale 상태에서 백그라운드 갱신
// 사용자는 항상 즉시 응답을 받음

// 프라이빗 캐시 (브라우저만, CDN 금지)
Cache-Control: private, max-age=600`,
  },
  {
    title: "ETag와 조건부 요청",
    code: `// 서버 응답 (첫 번째 요청)
HTTP/1.1 200 OK
ETag: "abc123"
Cache-Control: no-cache
Content-Type: application/json

{"data": "original"}

// 브라우저 재요청 (조건부)
GET /api/data HTTP/1.1
If-None-Match: "abc123"

// 서버 응답 — 변경 없음
HTTP/1.1 304 Not Modified
ETag: "abc123"
// → 본문 없이 헤더만 전송, 대역폭 절약

// Last-Modified 방식도 유사
// 응답: Last-Modified: Wed, 01 Jan 2025 00:00:00 GMT
// 재요청: If-Modified-Since: Wed, 01 Jan 2025 00:00:00 GMT`,
  },
  {
    title: "서비스 워커 캐싱",
    code: `// Cache First 전략 (정적 에셋에 적합)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) return cached;  // 캐시 HIT
        return fetch(event.request) // 캐시 MISS → 네트워크
          .then((response) => {
            const clone = response.clone();
            caches.open('v1').then((cache) => {
              cache.put(event.request, clone);
            });
            return response;
          });
      })
  );
});

// Network First 전략 (API 요청에 적합)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "HTTP 캐시 메커니즘은 어떻게 동작하나요?",
    answer: (
      <>
        HTTP 캐시는 크게 <strong>강력한 캐시(Strong Cache)</strong>와{" "}
        <strong>협상 캐시(Negotiation Cache)</strong>로 나뉩니다. 강력한 캐시는{" "}
        <InlineCode>Cache-Control</InlineCode>의{" "}
        <InlineCode>max-age</InlineCode> 디렉티브로 제어하며, 만료 전에는 서버
        요청 없이 캐시된 응답을 사용합니다. 협상 캐시는{" "}
        <InlineCode>ETag</InlineCode>/<InlineCode>If-None-Match</InlineCode>{" "}
        또는 <InlineCode>Last-Modified</InlineCode>/
        <InlineCode>If-Modified-Since</InlineCode> 헤더 쌍을 사용하여 서버에
        리소스 변경 여부를 확인합니다. 변경되지 않았으면{" "}
        <strong>304 Not Modified</strong>로 응답하여 대역폭을 절약합니다.
      </>
    ),
  },
  {
    question: "Cache-Control 디렉티브의 종류와 차이점을 설명해주세요.",
    answer: (
      <>
        주요 디렉티브: <InlineCode>max-age</InlineCode> — 캐시 유효 시간(초),{" "}
        <InlineCode>no-cache</InlineCode> — 캐시 저장하되 사용 전 반드시 서버
        검증, <InlineCode>no-store</InlineCode> — 캐시 저장 자체를 금지,{" "}
        <InlineCode>public</InlineCode> — CDN 등 공유 캐시에 저장 가능,{" "}
        <InlineCode>private</InlineCode> — 브라우저 캐시에만 저장,{" "}
        <InlineCode>must-revalidate</InlineCode> — 만료 후 반드시 서버 검증,{" "}
        <InlineCode>immutable</InlineCode> — 리소스가 절대 변경되지 않음을 명시,{" "}
        <InlineCode>stale-while-revalidate</InlineCode> — 만료된 캐시를
        반환하면서 백그라운드에서 갱신합니다.
      </>
    ),
  },
  {
    question: "캐시 무효화(Cache Busting) 전략에는 어떤 것들이 있나요?",
    answer: (
      <>
        1. <strong>파일명 해싱</strong> — 빌드 시 파일명에 해시를 포함 (예:{" "}
        <InlineCode>app.a1b2c3.js</InlineCode>). 내용이 바뀌면 해시가 변경되어
        새로운 URL이 됩니다. 2. <strong>쿼리 스트링</strong> — URL에 버전
        파라미터 추가 (예: <InlineCode>style.css?v=2</InlineCode>). 간단하지만
        일부 CDN에서 캐싱이 비효율적일 수 있습니다. 3.{" "}
        <strong>서비스 워커</strong> — 프로그래밍 방식으로 캐시를 직접 관리.
        오프라인 지원과 세밀한 캐시 전략 구현이 가능합니다. 4.{" "}
        <strong>CDN Purge</strong> — CDN의 캐시를 강제로 삭제하여 새 콘텐츠를
        배포합니다.
      </>
    ),
  },
];
