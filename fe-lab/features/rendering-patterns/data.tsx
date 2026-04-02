import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "SSR (Server Component)",
    code: `// app/products/page.tsx — Next.js App Router (기본 SSR)
// Server Component: 서버에서 렌더링, JS 번들에 포함되지 않음

async function ProductsPage() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - {p.price}원</li>
      ))}
    </ul>
  );
}

export default ProductsPage;`,
  },
  {
    title: "CSR (Client Component)",
    code: `"use client";
// Client Component: 브라우저에서 렌더링

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  return <div>{/* 대시보드 UI */}</div>;
}`,
  },
  {
    title: "ISR (revalidate)",
    code: `// app/blog/[slug]/page.tsx — ISR with revalidate

export const revalidate = 60; // 60초마다 재생성

async function BlogPost({ params }) {
  const res = await fetch(
    \`https://api.example.com/posts/\${params.slug}\`
  );
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// generateStaticParams로 빌드 시 미리 생성
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  return posts.map((post) => ({ slug: post.slug }));
}

export default BlogPost;`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "CSR, SSR, SSG, ISR을 각각 설명해주세요.",
    answer: (
      <>
        <strong>CSR</strong>은 빈 HTML을 받아 클라이언트에서 JS로 렌더링합니다.
        <strong> SSR</strong>은 매 요청마다 서버에서 HTML을 생성합니다.
        <strong> SSG</strong>는 빌드 시점에 HTML을 미리 생성하여 CDN에서
        배포합니다.
        <strong> ISR</strong>은 SSG에 <InlineCode>revalidate</InlineCode> 옵션을
        추가해 주기적으로 백그라운드 재생성하는 방식입니다.
      </>
    ),
  },
  {
    question: "SSR의 장단점과 적합한 사용 사례는?",
    answer: (
      <>
        <strong>장점:</strong> SEO에 유리하고, 초기 로딩 시 완성된 HTML을 보여줄
        수 있어 FCP가 빠릅니다.
        <strong> 단점:</strong> 매 요청마다 서버 렌더링이 필요하여 서버 부하가
        높고, TTFB가 느려질 수 있습니다.
        <br />
        <br />
        <strong>적합한 경우:</strong> 실시간 데이터가 필요한 페이지, 사용자별
        맞춤 콘텐츠, SNS처럼 SEO와 최신 데이터가 모두 중요한 서비스에
        적합합니다.
      </>
    ),
  },
  {
    question: "Next.js에서 각 렌더링 방식은 어떻게 구현하나요?",
    answer: (
      <>
        App Router 기준: 기본적으로 <strong>Server Component</strong>
        (SSR)입니다.
        <InlineCode>{'"use client"'}</InlineCode> 지시어를 추가하면 CSR이 됩니다.
        <InlineCode>generateStaticParams</InlineCode>를 사용하면 SSG,
        <InlineCode>revalidate</InlineCode> 옵션을 설정하면 ISR이 됩니다.
        <br />
        <br />
        Pages Router에서는 <InlineCode>getServerSideProps</InlineCode>(SSR),
        <InlineCode>getStaticProps</InlineCode>(SSG),
        <InlineCode>getStaticProps + revalidate</InlineCode>(ISR)로 구분합니다.
      </>
    ),
  },
];
