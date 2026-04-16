import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Context API 기본",
    code: `import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Kim' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function Profile() {
  const { user } = useContext(UserContext);
  return <h1>{user.name}</h1>;
}

// 사용
function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}`,
  },
  {
    title: "Zustand 기본",
    code: `import { create } from 'zustand';

// 스토어 생성 — Provider 불필요
const useTodoStore = create((set, get) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),

  get completedCount() {
    return get().todos.filter((t) => t.done).length;
  },
}));

// 컴포넌트 — selector로 필요한 값만 구독
function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const toggle = useTodoStore((s) => s.toggleTodo);

  return todos.map((t) => (
    <li key={t.id} onClick={() => toggle(t.id)}>
      {t.done ? '✅' : '⬜'} {t.text}
    </li>
  ));
}`,
  },
  {
    title: "Redux Toolkit 기본",
    code: `import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Slice 정의
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Store 생성
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// 컴포넌트
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "왜 상태 관리 라이브러리가 필요한가요?",
    answer: (
      <>
        React의 기본 상태 관리는 <InlineCode>useState</InlineCode>와{" "}
        <InlineCode>props</InlineCode>입니다. 컴포넌트 트리가 깊어지면{" "}
        <strong>prop drilling</strong> 문제가 발생합니다. 중간 컴포넌트들이
        사용하지도 않는 props를 전달만 해야 하므로 유지보수가 어렵고, 불필요한
        리렌더링이 발생합니다. 상태 관리 라이브러리는 이를 해결하여{" "}
        <strong>전역 상태를 효율적으로 공유</strong>하고,{" "}
        <strong>리렌더링을 최적화</strong>합니다.
      </>
    ),
  },
  {
    question: "Context API의 한계는 무엇인가요?",
    answer: (
      <>
        Context의 가장 큰 한계는 <strong>리렌더링 최적화가 어렵다</strong>는
        점입니다. Context 값이 변경되면 해당 Context를 구독하는{" "}
        <strong>모든 컴포넌트</strong>가 리렌더됩니다. 셀렉터(selector) 패턴을
        지원하지 않아, 값의 일부만 사용하는 컴포넌트도 전체 리렌더됩니다.{" "}
        <InlineCode>useMemo</InlineCode>나 컴포넌트 분리로 우회할 수 있지만
        복잡도가 증가합니다. 따라서 <strong>자주 변경되지 않는 값</strong>(테마,
        로케일)에 적합하고, 빈번한 업데이트에는 Zustand/Redux가 낫습니다.
      </>
    ),
  },
  {
    question: "Redux와 Zustand를 비교해주세요.",
    answer: (
      <>
        <strong>Redux</strong>: 엄격한 단방향 데이터 흐름(Action → Reducer →
        Store), DevTools로 시간 여행 디버깅, 미들웨어 생태계(thunk, saga)가
        강점입니다. 단점은 보일러플레이트가 많고 학습 곡선이 높습니다.
        <br />
        <br />
        <strong>Zustand</strong>: 최소한의 API(<InlineCode>create</InlineCode>
        ), Provider 없이 사용 가능, 셀렉터 기반 리렌더 최적화가 강점입니다. 번들
        사이즈도 작습니다(~1KB). 대규모 팀에서는 컨벤션을 별도로 정의해야 하고,
        DevTools 지원이 제한적입니다.
      </>
    ),
  },
];
