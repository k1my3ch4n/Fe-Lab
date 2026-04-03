export interface StateLayer {
  name: string;
  color: string;
  description: string;
}

export interface StateApproach {
  id: string;
  label: string;
  layers: StateLayer[];
  code: string;
  pros: string[];
  cons: string[];
}

export const STATE_APPROACHES: StateApproach[] = [
  {
    id: "context",
    label: "Context API",
    layers: [
      {
        name: "Provider",
        color: "#00e5ff",
        description: "React.createContext → Provider로 값 전달",
      },
      {
        name: "Consumer",
        color: "#b388ff",
        description: "useContext로 값 소비",
      },
      {
        name: "Re-render",
        color: "#ff2d8a",
        description: "값 변경 시 모든 Consumer 리렌더",
      },
    ],
    code: `const ThemeCtx = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeCtx.Provider value={theme}>
      <Toolbar />
    </ThemeCtx.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeCtx);
  return <button className={theme}>Click</button>;
}`,
    pros: ["내장 API — 추가 의존성 없음", "단순한 전역 상태에 적합"],
    cons: [
      "값 변경 시 모든 Consumer 리렌더",
      "복잡한 상태 로직에 부적합",
      "셀렉터(selector) 미지원",
    ],
  },
  {
    id: "redux",
    label: "Redux Toolkit",
    layers: [
      {
        name: "Store",
        color: "#ffb800",
        description: "중앙 저장소 — Single Source of Truth",
      },
      {
        name: "Slice / Reducer",
        color: "#00e676",
        description: "createSlice로 상태 + 리듀서 정의",
      },
      {
        name: "Dispatch → Action",
        color: "#00e5ff",
        description: "dispatch(action)으로 상태 업데이트",
      },
      {
        name: "Selector",
        color: "#b388ff",
        description: "useSelector로 필요한 상태만 구독",
      },
    ],
    code: `// counterSlice.ts
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
});

// Component
function Counter() {
  const count = useSelector(s => s.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() =>
    dispatch(increment())}>
    {count}
  </button>;
}`,
    pros: [
      "DevTools — 시간 여행 디버깅",
      "셀렉터로 정밀한 리렌더 제어",
      "미들웨어 확장 (thunk, saga)",
    ],
    cons: ["보일러플레이트가 많음", "학습 곡선이 높음", "소규모 앱에는 과도함"],
  },
  {
    id: "zustand",
    label: "Zustand",
    layers: [
      {
        name: "Store (create)",
        color: "#00e676",
        description: "create()로 스토어 생성 — Provider 불필요",
      },
      {
        name: "Selector",
        color: "#00e5ff",
        description: "useStore(selector)로 필요한 값만 구독",
      },
      {
        name: "Action",
        color: "#ffb800",
        description: "set()으로 직접 상태 업데이트",
      },
    ],
    code: `import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  increment: () =>
    set((s) => ({ count: s.count + 1 })),
  decrement: () =>
    set((s) => ({ count: s.count - 1 })),
}));

function Counter() {
  const count = useCounterStore(s => s.count);
  const increment = useCounterStore(s => s.increment);
  return <button onClick={increment}>
    {count}
  </button>;
}`,
    pros: [
      "최소한의 보일러플레이트",
      "Provider 불필요 — 어디서든 사용",
      "셀렉터 기반 리렌더 최적화",
    ],
    cons: [
      "DevTools 지원이 Redux보다 제한적",
      "대규모 팀에서 컨벤션 필요",
      "미들웨어 생태계가 작음",
    ],
  },
];

export const PROP_DRILLING_LEVELS = [
  { name: "App", color: "#00e5ff", hasState: true },
  { name: "Layout", color: "#b388ff", hasState: false },
  { name: "Sidebar", color: "#ffb800", hasState: false },
  { name: "UserProfile", color: "#00e676", hasState: false },
  { name: "Avatar", color: "#ff2d8a", hasState: false },
];
