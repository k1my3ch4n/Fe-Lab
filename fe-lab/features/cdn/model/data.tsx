import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "CDN 설정 예제 (Cloudflare Workers)",
    code: `// Cloudflare Workers에서 캐시 제어
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 정적 에셋: 장기 캐시
    if (url.pathname.startsWith('/assets/')) {
      const response = await fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Cache-Control',
        'public, max-age=31536000, immutable');
      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    // HTML: 짧은 캐시 + 재검증
    const response = await fetch(request);
    const headers = new Headers(response.headers);
    headers.set('Cache-Control',
      'public, max-age=0, must-revalidate');
    headers.set('CDN-Cache-Control', 'max-age=60');
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  }
};`,
  },
  {
    title: "Cache-Control과 CDN",
    code: `// 브라우저 캐시 vs CDN 캐시 분리
// s-maxage: CDN(공유 캐시)에만 적용
Cache-Control: public, max-age=0, s-maxage=3600

// CDN-Cache-Control: CDN 전용 (Cloudflare)
Cache-Control: public, max-age=60
CDN-Cache-Control: max-age=86400

// Surrogate-Control: CDN 전용 (Fastly, Akamai)
Cache-Control: public, max-age=60
Surrogate-Control: max-age=86400

// stale-while-revalidate: 만료 후 캐시 제공
Cache-Control: max-age=3600,
  stale-while-revalidate=86400

// → 만료 후에도 캐시를 반환하면서
//   백그라운드에서 오리진에 재검증`,
  },
  {
    title: "에셋 핑거프린팅 (Next.js)",
    code: `// next.config.js — 자동 해시 포함
module.exports = {
  // Next.js는 기본적으로 에셋 핑거프린팅 적용
  // _next/static/chunks/app-a1b2c3.js
  assetPrefix: 'https://cdn.example.com',
  // → CDN에서 정적 에셋 제공
};

// 빌드 결과:
// /_next/static/css/app.a1b2c3d4.css
// /_next/static/chunks/main.e5f6g7h8.js
// /_next/static/media/font.i9j0k1l2.woff2

// 캐시 전략:
// _next/static/** → Cache-Control: immutable
// HTML/API → Cache-Control: no-cache

// CDN 설정:
// 정적 에셋: max-age=31536000, immutable
// 동적 콘텐츠: s-maxage=60, stale-while-revalidate`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "CDN의 역할과 동작 원리를 설명해주세요.",
    answer: (
      <>
        CDN(Content Delivery Network)은 전 세계에 분산된{" "}
        <strong>엣지 서버</strong>를 통해 사용자에게 가장 가까운 서버에서
        콘텐츠를 제공합니다. 첫 요청 시 오리진에서 콘텐츠를 가져와 엣지에
        캐시하고(Cache MISS), 이후 요청은 캐시된 콘텐츠를 반환합니다(Cache HIT).
        <strong>지연 시간 감소</strong>, <strong>오리진 부하 분산</strong>,
        <strong>가용성 향상</strong>이 주요 이점입니다.
      </>
    ),
  },
  {
    question: "캐시 무효화 전략에는 어떤 것이 있나요?",
    answer: (
      <>
        1. <strong>TTL 기반</strong>: <InlineCode size="md">max-age</InlineCode>
        로 만료 시간 설정 2. <strong>수동 퍼지</strong>: CDN API를 통해 특정
        URL의 캐시를 삭제 3. <strong>에셋 핑거프린팅</strong>: 파일명에 해시를
        포함하여 변경 시 새 URL 사용 4. <strong>Stale-While-Revalidate</strong>:
        만료된 캐시를 제공하면서 백그라운드 갱신. 가장 효과적인 전략은
        핑거프린팅 + 장기 캐시(immutable)이며, Next.js 등 프레임워크에서 기본
        제공됩니다.
      </>
    ),
  },
  {
    question: "CDN과 HTTP 캐시의 관계를 설명해주세요.",
    answer: (
      <>
        CDN은 HTTP 캐시 헤더를 기반으로 동작합니다.
        <InlineCode size="md">Cache-Control</InlineCode>의{" "}
        <InlineCode size="md">s-maxage</InlineCode>는 CDN(공유 캐시)에만
        적용되고,
        <InlineCode size="md">max-age</InlineCode>는 브라우저 캐시에 적용됩니다.
        CDN 전용 헤더로 <InlineCode size="md">CDN-Cache-Control</InlineCode>
        (Cloudflare)이나
        <InlineCode size="md">Surrogate-Control</InlineCode>(Fastly)을 사용하면
        브라우저와 CDN의 캐시 정책을 독립적으로 관리할 수 있습니다.
      </>
    ),
  },
];
