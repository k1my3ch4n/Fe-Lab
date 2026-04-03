import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "제네릭 함수와 인터페이스",
    code: `// 제네릭 함수
function toArray<T>(value: T): T[] {
  return [value];
}

toArray<string>("hello"); // string[]
toArray<number>(42);      // number[]

// 제네릭 인터페이스
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userRes: ApiResponse<User> = {
  data: { name: "Kim", age: 25 },
  status: 200,
  message: "OK",
};`,
  },
  {
    title: "유틸리티 타입 활용",
    code: `interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial: 부분 업데이트
function updateTodo(
  todo: Todo,
  fieldsToUpdate: Partial<Todo>
): Todo {
  return { ...todo, ...fieldsToUpdate };
}

// Pick: API 응답에서 필요한 필드만
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit: 민감 정보 제외
type PublicUser = Omit<User, "password" | "ssn">;

// Record: 상태별 메시지 매핑
type ErrorMessages = Record<ErrorCode, string>;`,
  },
  {
    title: "커스텀 유틸리티 타입",
    code: `// DeepPartial: 중첩 객체도 선택적으로
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// Nullable: null 허용 유틸리티
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// PickByType: 특정 타입의 속성만 추출
type PickByType<T, ValueType> = {
  [P in keyof T as T[P] extends ValueType ? P : never]: T[P];
};

type StringFields = PickByType<User, string>;
// { name: string; email: string }`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "제네릭(Generics)이란 무엇인가요?",
    answer: (
      <>
        제네릭은 <strong>타입을 매개변수화</strong>하는 기능입니다. 함수,
        클래스, 인터페이스를 작성할 때 특정 타입에 고정하지 않고, 사용하는
        시점에 타입을 지정할 수 있습니다. 이를 통해 <strong>타입 안전성</strong>
        을 유지하면서도 <strong>코드 재사용성</strong>을 높일 수 있습니다.{" "}
        <InlineCode>{"Array<T>"}</InlineCode>,{" "}
        <InlineCode>{"Promise<T>"}</InlineCode> 등이 대표적인 제네릭 타입입니다.
      </>
    ),
  },
  {
    question: "주요 유틸리티 타입의 종류와 사용법을 설명해주세요.",
    answer: (
      <>
        1. <InlineCode>{"Partial<T>"}</InlineCode> — 모든 속성을 선택적으로 변환
        (업데이트 함수에 유용) 2. <InlineCode>{"Pick<T,K>"}</InlineCode> — 특정
        속성만 추출 (API 응답 가공) 3. <InlineCode>{"Omit<T,K>"}</InlineCode> —
        특정 속성 제외 (민감 정보 제거) 4.{" "}
        <InlineCode>{"Record<K,V>"}</InlineCode> — 키-값 매핑 타입 생성 5.{" "}
        <InlineCode>{"ReturnType<T>"}</InlineCode> — 함수 반환 타입 추출 6.{" "}
        <InlineCode>{"Required<T>"}</InlineCode> — 모든 속성을 필수로 변환
      </>
    ),
  },
  {
    question: "조건부 타입(Conditional Types)은 어떻게 동작하나요?",
    answer: (
      <>
        조건부 타입은 <InlineCode>T extends U ? X : Y</InlineCode> 형태의{" "}
        <strong>타입 수준 삼항 연산자</strong>입니다. T가 U에 할당 가능하면 X,
        아니면 Y 타입이 됩니다. <InlineCode>infer</InlineCode> 키워드와 함께
        사용하면 <strong>타입을 추출</strong>할 수 있습니다. 예를 들어{" "}
        <InlineCode>{"ReturnType<T>"}</InlineCode>은{" "}
        <InlineCode>
          {"T extends (...args: any[]) => infer R ? R : never"}
        </InlineCode>{" "}
        로 구현됩니다. 유니온 타입에 적용하면 <strong>분배 법칙</strong>이
        적용되어 각 멤버에 대해 개별 평가됩니다.
      </>
    ),
  },
];
