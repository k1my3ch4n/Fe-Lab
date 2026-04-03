import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Server Component",
    code: `// app/users/page.tsx — Server Component (기본값)
// "use client" 없으면 자동으로 Server Component

import { db } from '@/lib/db';

async function UsersPage() {
  // 서버에서 직접 DB 접근 — API 라우트 불필요
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      <h1>사용자 목록</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default UsersPage;

// 이 컴포넌트의 JS는 클라이언트 번들에 포함되지 않음
// → 번들 사이즈 0KB, SEO 최적화`,
  },
  {
    title: "Client Component",
    code: `"use client";
// "use client"를 파일 최상단에 선언

import { useState, useTransition } from 'react';

function SearchFilter({ initialItems }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const filtered = initialItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="검색..."
      />
      {isPending && <span>필터링 중...</span>}
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// useState, onClick 등 인터랙션이 필요하면 Client Component`,
  },
  {
    title: "Server Actions",
    code: `// app/actions.ts
"use server";

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // 서버에서 실행 — DB 직접 접근
  const post = await db.post.create({
    data: { title, content },
  });

  revalidatePath('/posts');  // 캐시 무효화
  redirect(\`/posts/\${post.id}\`);  // 리다이렉트
}

// app/posts/new/page.tsx — Client Component
"use client";

import { createPost } from '../actions';

function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">작성</button>
    </form>
  );
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "React Server Components(RSC)란 무엇인가요?",
    answer: (
      <>
        RSC는 <strong>서버에서만 실행되는 React 컴포넌트</strong>입니다.{" "}
        <InlineCode>async/await</InlineCode>로 데이터를 직접 fetch하고, DB에
        접근할 수 있지만 <InlineCode>useState</InlineCode>,{" "}
        <InlineCode>useEffect</InlineCode> 등 클라이언트 훅은 사용할 수
        없습니다. 컴포넌트 코드가{" "}
        <strong>클라이언트 번들에 포함되지 않아</strong> 번들 사이즈를 줄이고,
        서버의 리소스(DB, 파일시스템)에 직접 접근할 수 있습니다.
      </>
    ),
  },
  {
    question: '"use client"와 "use server"의 경계는 어떻게 동작하나요?',
    answer: (
      <>
        <InlineCode>&quot;use client&quot;</InlineCode>를 파일 최상단에 선언하면
        해당 파일과 그 하위 import가 <strong>Client Component</strong>가 됩니다.
        이것이 Server/Client의 <strong>경계(boundary)</strong>입니다. Server
        Component는 Client Component를 자식으로 가질 수 있지만, Client Component
        안에서 Server Component를 직접 import할 수 없습니다(children prop으로
        전달은 가능). <InlineCode>&quot;use server&quot;</InlineCode>는 Server
        Actions를 정의하며, 클라이언트에서 호출 가능한 서버 함수를 만듭니다.
      </>
    ),
  },
  {
    question: "RSC의 장단점을 설명해주세요.",
    answer: (
      <>
        <strong>장점</strong>: 1) 번들 사이즈 감소 — 서버 코드가 클라이언트로
        전송되지 않음 2) 서버 리소스 직접 접근 — API 라우트 없이 DB, 파일시스템
        사용 3) 자동 코드 분할 — Client Component만 필요할 때 로드 4) 스트리밍
        렌더링 — Suspense와 연동하여 점진적 로딩
        <br />
        <br />
        <strong>단점</strong>: 1) 인터랙션 불가 —{" "}
        <InlineCode>useState</InlineCode>, 이벤트 핸들러 사용 불가 2) 학습 곡선
        — Server/Client 경계 이해 필요 3) 직렬화 제한 — props로 함수, 클래스
        인스턴스 등 전달 불가
      </>
    ),
  },
];
