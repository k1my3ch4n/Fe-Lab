import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "dynamic import",
    code: `// React.lazy + Suspense로 코드 스플릿팅
import { lazy, Suspense } from 'react';

// 라우트 기반 코드 스플릿팅
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}

// Next.js dynamic import
import dynamic from 'next/dynamic';
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>차트 로딩 중...</p>,
  ssr: false, // 클라이언트에서만 렌더링
});`,
  },
  {
    title: "트리 쉐이킹",
    code: `// ✅ ESM — 트리 쉐이킹 가능 (정적 분석)
import { add, subtract } from './math';
// multiply, divide는 번들에 포함되지 않음

// ❌ CJS — 트리 쉐이킹 불가 (동적 분석)
const math = require('./math');
// 전체 모듈이 번들에 포함됨

// ✅ 라이브러리 최적화 — 서브 경로 import
import debounce from 'lodash/debounce';    // 해당 함수만
// ❌ import { debounce } from 'lodash';   // 전체 lodash

// package.json에서 sideEffects 설정
{
  "name": "my-lib",
  "sideEffects": false,  // 전체 트리 쉐이킹 허용
  // 또는 특정 파일만 사이드 이펙트 표시
  "sideEffects": ["*.css", "./src/polyfills.js"]
}`,
  },
  {
    title: "번들 분석",
    code: `// next.config.js — 번들 분석 설정
const withBundleAnalyzer = require(
  '@next/bundle-analyzer'
)({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config...
});

// 실행: ANALYZE=true npm run build

// webpack-bundle-analyzer (직접 사용)
const { BundleAnalyzerPlugin } = require(
  'webpack-bundle-analyzer'
);

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
    }),
  ],
};

// 번들 사이즈 모니터링
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "size": "size-limit"
  }
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "트리 쉐이킹(Tree Shaking)이란 무엇인가요?",
    answer: (
      <>
        트리 쉐이킹은 번들러가{" "}
        <strong>사용되지 않는 코드(dead code)를 제거</strong>하는 최적화
        기법입니다. ES Modules의 <InlineCode>import</InlineCode>/
        <InlineCode>export</InlineCode>는 정적이므로 빌드 시점에 어떤 코드가
        사용되는지 분석할 수 있습니다.
        <InlineCode>sideEffects: false</InlineCode>를 설정하면 번들러가 더
        적극적으로 미사용 코드를 제거합니다.
      </>
    ),
  },
  {
    question: "코드 스플릿팅의 구현 방법을 설명해주세요.",
    answer: (
      <>
        1. <strong>라우트 기반</strong> — <InlineCode>React.lazy</InlineCode> +{" "}
        <InlineCode>Suspense</InlineCode>로 페이지별 청크 분리 2.{" "}
        <strong>컴포넌트 기반</strong> —{" "}
        <InlineCode>dynamic import()</InlineCode>로 무거운 컴포넌트를 지연 로딩{" "}
        3. <strong>라이브러리 기반</strong> — lodash 등 대형 라이브러리의 서브
        모듈만 import
        <br />
        <br />
        Next.js에서는 <InlineCode>next/dynamic</InlineCode>으로 SSR 여부까지
        제어할 수 있습니다.
      </>
    ),
  },
  {
    question: "ESM과 CJS의 차이점을 설명해주세요.",
    answer: (
      <>
        <strong>ESM(ES Modules)</strong>은 <InlineCode>import</InlineCode>/
        <InlineCode>export</InlineCode>를 사용하며,
        <strong>정적 분석</strong>이 가능하여 트리 쉐이킹에 유리합니다. 비동기
        로딩을 지원합니다.
        <br />
        <br />
        <strong>CJS(CommonJS)</strong>는 <InlineCode>require</InlineCode>/
        <InlineCode>module.exports</InlineCode>를 사용하며, 런타임에{" "}
        <strong>동적으로 모듈을 로드</strong>합니다. 조건부 require가 가능하지만
        트리 쉐이킹이 어렵습니다. Node.js의 기본 모듈 시스템이었으나 ESM으로
        전환 중입니다.
      </>
    ),
  },
];
