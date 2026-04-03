export interface FlowStep {
  label: string;
  color: string;
  description: string;
}

export interface SuspenseScenario {
  id: string;
  label: string;
  steps: FlowStep[];
  code: string;
}

export const SUSPENSE_SCENARIOS: SuspenseScenario[] = [
  {
    id: "suspense",
    label: "Suspense",
    steps: [
      {
        label: "Render",
        color: "#00e5ff",
        description: "컴포넌트 렌더링 시작",
      },
      {
        label: "Promise Throw",
        color: "#ffb800",
        description: "데이터 미준비 → Promise를 throw",
      },
      {
        label: "Fallback",
        color: "#b388ff",
        description: "가장 가까운 Suspense의 fallback 표시",
      },
      {
        label: "Resolve",
        color: "#00e676",
        description: "Promise 해결 → 컴포넌트 재렌더",
      },
    ],
    code: `<Suspense fallback={<Spinner />}>
  <UserProfile />  {/* 데이터 로딩 중 → Spinner */}
</Suspense>

// React 19: use() 훅
function UserProfile() {
  const user = use(fetchUser());  // Promise throw
  return <h1>{user.name}</h1>;
}`,
  },
  {
    id: "error-boundary",
    label: "Error Boundary",
    steps: [
      {
        label: "Render",
        color: "#00e5ff",
        description: "컴포넌트 렌더링 시작",
      },
      {
        label: "Error Throw",
        color: "#ff2d8a",
        description: "렌더링 중 에러 발생",
      },
      {
        label: "getDerivedStateFromError",
        color: "#ffb800",
        description: "에러 catch → hasError: true",
      },
      {
        label: "Fallback UI",
        color: "#b388ff",
        description: "에러 UI 표시 + componentDidCatch 로깅",
      },
    ],
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}`,
  },
  {
    id: "combined",
    label: "조합 패턴",
    steps: [
      {
        label: "Suspense Boundary",
        color: "#00e5ff",
        description: "로딩 상태 처리",
      },
      {
        label: "Error Boundary",
        color: "#ff2d8a",
        description: "에러 상태 처리",
      },
      {
        label: "Component",
        color: "#00e676",
        description: "실제 렌더링 (성공 상태)",
      },
      {
        label: "use() Hook",
        color: "#ffb800",
        description: "React 19 — Promise를 직접 사용",
      },
    ],
    code: `// 이상적인 조합 패턴
<ErrorBoundary fallback={<ErrorPage />}>
  <Suspense fallback={<Skeleton />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>

// React 19의 use()
function AsyncComponent() {
  const data = use(fetchData());  // 로딩 → Suspense
  // 에러 → Error Boundary
  return <DataView data={data} />;
}`,
  },
];
