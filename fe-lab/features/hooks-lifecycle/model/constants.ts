import type { LifecyclePhase, HookTiming, ClassToHookMapping } from "./types";

export const PHASES: LifecyclePhase[] = [
  {
    id: "mount",
    label: "Mount",
    color: "#00e676",
    description: "컴포넌트가 DOM에 최초 삽입될 때",
  },
  {
    id: "update",
    label: "Update",
    color: "#ffb800",
    description: "state 또는 props가 변경될 때",
  },
  {
    id: "unmount",
    label: "Unmount",
    color: "#ff2d8a",
    description: "컴포넌트가 DOM에서 제거될 때",
  },
];

export const HOOK_TIMINGS: HookTiming[] = [
  // Mount phase
  {
    hook: "useState (초기값 설정)",
    phase: "mount",
    order: 1,
    color: "#00e5ff",
    description: "state 초기값이 설정됨",
  },
  {
    hook: "useMemo (초기 계산)",
    phase: "mount",
    order: 2,
    color: "#b388ff",
    description: "메모이제이션된 값 최초 계산",
  },
  {
    hook: "Render (JSX 반환)",
    phase: "mount",
    order: 3,
    color: "#ffffff",
    description: "컴포넌트 함수 실행, JSX 반환",
  },
  {
    hook: "DOM 업데이트",
    phase: "mount",
    order: 4,
    color: "#888888",
    description: "React가 실제 DOM에 반영",
  },
  {
    hook: "useLayoutEffect",
    phase: "mount",
    order: 5,
    color: "#ff2d8a",
    description: "DOM 변경 직후, 브라우저 페인트 전 동기 실행",
  },
  {
    hook: "브라우저 Paint",
    phase: "mount",
    order: 6,
    color: "#888888",
    description: "브라우저가 화면에 픽셀을 그림",
  },
  {
    hook: "useEffect",
    phase: "mount",
    order: 7,
    color: "#00e676",
    description: "브라우저 페인트 후 비동기 실행",
  },

  // Update phase
  {
    hook: "setState 호출",
    phase: "update",
    order: 1,
    color: "#ffb800",
    description: "상태 변경이 스케줄링됨",
  },
  {
    hook: "useMemo (재계산 여부)",
    phase: "update",
    order: 2,
    color: "#b388ff",
    description: "의존성 변경 시에만 재계산",
  },
  {
    hook: "Render (JSX 반환)",
    phase: "update",
    order: 3,
    color: "#ffffff",
    description: "컴포넌트 함수 재실행",
  },
  {
    hook: "DOM 업데이트",
    phase: "update",
    order: 4,
    color: "#888888",
    description: "변경된 부분만 DOM에 반영",
  },
  {
    hook: "useLayoutEffect cleanup",
    phase: "update",
    order: 5,
    color: "#ff2d8a",
    description: "이전 useLayoutEffect 클린업 실행",
  },
  {
    hook: "useLayoutEffect",
    phase: "update",
    order: 6,
    color: "#ff2d8a",
    description: "DOM 변경 직후 동기 실행",
  },
  {
    hook: "브라우저 Paint",
    phase: "update",
    order: 7,
    color: "#888888",
    description: "브라우저가 화면을 다시 그림",
  },
  {
    hook: "useEffect cleanup",
    phase: "update",
    order: 8,
    color: "#00e676",
    description: "이전 useEffect 클린업 실행",
  },
  {
    hook: "useEffect",
    phase: "update",
    order: 9,
    color: "#00e676",
    description: "브라우저 페인트 후 비동기 실행",
  },

  // Unmount phase
  {
    hook: "useLayoutEffect cleanup",
    phase: "unmount",
    order: 1,
    color: "#ff2d8a",
    description: "useLayoutEffect 클린업 실행",
  },
  {
    hook: "useEffect cleanup",
    phase: "unmount",
    order: 2,
    color: "#00e676",
    description: "useEffect 클린업 실행",
  },
  {
    hook: "DOM 제거",
    phase: "unmount",
    order: 3,
    color: "#888888",
    description: "컴포넌트가 DOM에서 제거됨",
  },
];

export const CLASS_TO_HOOKS_MAP: ClassToHookMapping[] = [
  {
    classMethod: "constructor",
    hookEquivalent: "useState(initialValue)",
    description: "초기 상태 설정",
  },
  {
    classMethod: "componentDidMount",
    hookEquivalent: "useEffect(() => {}, [])",
    description: "마운트 시 1회 실행",
  },
  {
    classMethod: "componentDidUpdate",
    hookEquivalent: "useEffect(() => {}, [deps])",
    description: "의존성 변경 시 실행",
  },
  {
    classMethod: "componentWillUnmount",
    hookEquivalent: "useEffect cleanup",
    description: "언마운트 시 정리 작업",
  },
  {
    classMethod: "shouldComponentUpdate",
    hookEquivalent: "React.memo / useMemo",
    description: "불필요한 리렌더 방지",
  },
  {
    classMethod: "getDerivedStateFromProps",
    hookEquivalent: "렌더 중 setState 호출",
    description: "props 기반 state 동기화",
  },
  {
    classMethod: "getSnapshotBeforeUpdate",
    hookEquivalent: "useLayoutEffect",
    description: "DOM 변경 직후 동기 작업",
  },
];

export const FLOW_STEPS = [
  { label: "useState init", color: "#00e5ff" },
  { label: "useMemo", color: "#b388ff" },
  { label: "Render", color: "#ffffff" },
  { label: "DOM Update", color: "#888" },
  { label: "useLayoutEffect", color: "#ff2d8a" },
  { label: "Paint", color: "#888" },
  { label: "useEffect", color: "#00e676" },
] as const;
