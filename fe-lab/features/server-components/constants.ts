export interface RenderPhase {
  label: string;
  color: string;
  description: string;
}

export interface ComponentType {
  id: string;
  label: string;
  phases: RenderPhase[];
  code: string;
  bundleSize: string;
  renderLocation: string;
}

export const COMPONENT_TYPES: ComponentType[] = [
  {
    id: "server",
    label: "Server Component",
    phases: [
      {
        label: "서버 실행",
        color: "#00e676",
        description: "서버에서 컴포넌트 렌더링 + 데이터 fetch",
      },
      {
        label: "RSC Payload",
        color: "#00e5ff",
        description: "직렬화된 React 트리를 클라이언트로 전송",
      },
      {
        label: "HTML 스트리밍",
        color: "#b388ff",
        description: "브라우저에 HTML 스트리밍 렌더",
      },
      {
        label: "No Hydration",
        color: "#ffb800",
        description: "JS 번들 없음 — hydration 불필요",
      },
    ],
    code: `// Server Component (기본값 — "use client" 없음)
async function UserList() {
  const users = await db.user.findMany(); // 직접 DB 접근

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
    bundleSize: "0 KB (JS 번들에 포함되지 않음)",
    renderLocation: "서버",
  },
  {
    id: "client",
    label: "Client Component",
    phases: [
      {
        label: "서버 pre-render",
        color: "#00e676",
        description: "서버에서 초기 HTML 생성 (SSR)",
      },
      {
        label: "JS 번들 전송",
        color: "#ff2d8a",
        description: "컴포넌트 JS 코드를 클라이언트로 전송",
      },
      {
        label: "Hydration",
        color: "#ffb800",
        description: "이벤트 핸들러 연결 + 인터랙티브",
      },
      {
        label: "Re-render",
        color: "#00e5ff",
        description: "상태 변경 시 클라이언트에서 리렌더",
      },
    ],
    code: `"use client";

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
    bundleSize: "~2-10 KB (컴포넌트 코드 + 의존성)",
    renderLocation: "서버(SSR) + 클라이언트(Hydration)",
  },
  {
    id: "actions",
    label: "Server Actions",
    phases: [
      {
        label: "클라이언트 이벤트",
        color: "#00e5ff",
        description: "폼 제출 또는 버튼 클릭",
      },
      {
        label: "서버 전송",
        color: "#ffb800",
        description: '"use server" 함수를 RPC로 호출',
      },
      {
        label: "서버 실행",
        color: "#00e676",
        description: "DB 업데이트, 파일 처리 등 서버 로직",
      },
      {
        label: "UI 갱신",
        color: "#b388ff",
        description: "revalidatePath/redirect로 UI 자동 갱신",
      },
    ],
    code: `// Server Action
"use server";

async function createTodo(formData: FormData) {
  const title = formData.get('title');
  await db.todo.create({ data: { title } });
  revalidatePath('/todos');
}

// Client Component에서 사용
"use client";
function TodoForm() {
  return (
    <form action={createTodo}>
      <input name="title" />
      <button type="submit">추가</button>
    </form>
  );
}`,
    bundleSize: "~0 KB (서버 함수 코드는 번들에 미포함)",
    renderLocation: "서버 (RPC 호출)",
  },
];
