import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Suspense 사용",
    code: `import { Suspense } from 'react';

// 데이터 페칭 라이브러리 (React Query, SWR 등)
function UserProfile() {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  return <h1>{user.name}</h1>;
}

// Suspense로 로딩 상태 선언적 처리
function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile />
    </Suspense>
  );
}

// 중첩 Suspense — 독립적 로딩 상태
function Dashboard() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ListSkeleton />}>
        <TodoList />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <Analytics />
      </Suspense>
    </Suspense>
  );
}`,
  },
  {
    title: "Error Boundary 구현",
    code: `import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 리포팅 서비스로 전송
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 사용
<ErrorBoundary fallback={<ErrorPage />}>
  <RiskyComponent />
</ErrorBoundary>`,
  },
  {
    title: "React 19 use() 훅",
    code: `import { use, Suspense } from 'react';

// use() — Promise를 직접 사용
function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}

// use() — Context도 사용 가능
function ThemeButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Click</button>;
}

// 조합: Error Boundary + Suspense + use()
function App() {
  const userPromise = fetchUser();

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Spinner />}>
        <UserProfile userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

// use()는 조건문 안에서도 사용 가능 (hooks 규칙 예외)
function OptionalData({ shouldFetch, dataPromise }) {
  if (shouldFetch) {
    const data = use(dataPromise);
    return <DataView data={data} />;
  }
  return <Placeholder />;
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Suspense란 무엇이고 어떻게 동작하나요?",
    answer: (
      <>
        Suspense는 React에서{" "}
        <strong>비동기 작업의 로딩 상태를 선언적으로 처리</strong>
        하는 메커니즘입니다. 자식 컴포넌트가 아직 준비되지 않았을 때(Promise를
        throw), 가장 가까운 Suspense의 <InlineCode>fallback</InlineCode>을
        표시합니다. Promise가 resolve되면 자식 컴포넌트를 다시 렌더링합니다.
        중첩하여 독립적인 로딩 상태를 구성할 수 있으며, React 18부터 서버 사이드
        스트리밍 렌더링에도 활용됩니다.
      </>
    ),
  },
  {
    question: "Error Boundary란 무엇이고 왜 클래스 컴포넌트로 작성하나요?",
    answer: (
      <>
        Error Boundary는 자식 컴포넌트에서 발생한{" "}
        <strong>렌더링 에러를 catch</strong>
        하여 앱 전체가 크래시되는 것을 방지합니다.{" "}
        <InlineCode>getDerivedStateFromError</InlineCode>와{" "}
        <InlineCode>componentDidCatch</InlineCode> 라이프사이클 메서드가
        필요한데, 이는 아직 함수형 컴포넌트에서 지원되지 않으므로{" "}
        <strong>클래스 컴포넌트</strong>로 작성해야 합니다. 이벤트 핸들러,
        비동기 코드, SSR의 에러는 catch하지 못하며, 오직{" "}
        <strong>렌더링 단계의 에러</strong>만 처리합니다.
      </>
    ),
  },
  {
    question: "React 19의 use() 훅은 무엇인가요?",
    answer: (
      <>
        <InlineCode>use()</InlineCode>는 React 19에서 도입된 훅으로,{" "}
        <strong>Promise나 Context를 직접 읽을 수</strong> 있습니다. 기존 훅과
        달리 <strong>조건문이나 반복문 안에서도 호출 가능</strong>합니다.
        Promise를 전달하면 Suspense와 연동되어 자동으로 로딩 상태를 처리하고,
        reject 시 Error Boundary로 에러가 전파됩니다. Context를 전달하면{" "}
        <InlineCode>useContext</InlineCode>처럼 동작합니다.
      </>
    ),
  },
];
