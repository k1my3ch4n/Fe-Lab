import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "typeof / instanceof 타입 가드",
    code: `// typeof: 원시 타입 구분
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.trim();        // value: string
  }
  if (typeof value === "number") {
    return value.toFixed(2);    // value: number
  }
  return value ? "Yes" : "No";  // value: boolean
}

// instanceof: 클래스 인스턴스 구분
function handleError(error: Error | TypeError | RangeError) {
  if (error instanceof TypeError) {
    console.log("타입 에러:", error.message);
  } else if (error instanceof RangeError) {
    console.log("범위 에러:", error.message);
  } else {
    console.log("일반 에러:", error.message);
  }
}`,
  },
  {
    title: "사용자 정의 타입 가드 (is)",
    code: `interface Cat {
  type: "cat";
  meow(): void;
}
interface Dog {
  type: "dog";
  bark(): void;
}

// 사용자 정의 타입 가드: 반환 타입에 "is" 사용
function isCat(animal: Cat | Dog): animal is Cat {
  return animal.type === "cat";
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();  // OK: animal은 Cat
  } else {
    animal.bark();  // OK: animal은 Dog
  }
}

// 배열 필터링에서 활용
const animals: (Cat | Dog)[] = [...];
const cats = animals.filter(isCat);
// cats: Cat[] ← 타입이 좁혀짐!`,
  },
  {
    title: "Discriminated Union 패턴",
    code: `// 공통 판별 속성 (discriminant)을 가진 유니온
type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: string[] }
  | { type: "ERROR"; error: Error };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      // action.data에 안전하게 접근 가능
      return { loading: false, data: action.data };
    case "ERROR":
      // action.error에 안전하게 접근 가능
      return { loading: false, error: action.error };
  }
}

// 완전성 검사 (exhaustiveness check)
function assertNever(x: never): never {
  throw new Error("Unexpected: " + x);
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "타입 가드(Type Guard)란 무엇인가요?",
    answer: (
      <>
        타입 가드는 런타임 검사를 통해 <strong>특정 스코프 내에서 타입을
        좁히는</strong> 표현식입니다. TypeScript 컴파일러가 타입 가드를 인식하면
        해당 블록 내에서 더 구체적인 타입으로 추론합니다. 내장 타입 가드로{" "}
        <InlineCode>typeof</InlineCode>, <InlineCode>instanceof</InlineCode>,{" "}
        <InlineCode>in</InlineCode> 연산자가 있으며, 사용자 정의 타입 가드는{" "}
        <InlineCode>is</InlineCode> 키워드로 만듭니다.
      </>
    ),
  },
  {
    question: "사용자 정의 타입 가드(is 키워드)는 언제 사용하나요?",
    answer: (
      <>
        <InlineCode>typeof</InlineCode>나 <InlineCode>instanceof</InlineCode>로
        판별할 수 없는 복잡한 타입 구분이 필요할 때 사용합니다. 반환 타입을{" "}
        <InlineCode>paramName is Type</InlineCode> 형태로 선언하면, 해당 함수가{" "}
        <InlineCode>true</InlineCode>를 반환할 때 TypeScript가 타입을 좁힙니다.
        특히 <InlineCode>Array.filter()</InlineCode>와 함께 사용하면 필터링 결과의
        타입이 자동으로 좁혀져 유용합니다.
      </>
    ),
  },
  {
    question: "Discriminated Union 패턴을 설명해주세요.",
    answer: (
      <>
        유니온의 각 멤버가 <strong>공통 리터럴 속성(판별자)</strong>을 가지는
        패턴입니다. <InlineCode>switch</InlineCode> 문에서 판별자를 기준으로
        분기하면 각 케이스에서 타입이 자동으로 좁혀집니다. Redux의{" "}
        <InlineCode>action.type</InlineCode>이 대표적인 예입니다.{" "}
        <InlineCode>never</InlineCode> 타입을 활용한{" "}
        <strong>완전성 검사(exhaustiveness check)</strong>로 모든 케이스를
        처리했는지 컴파일 타임에 확인할 수 있습니다.
      </>
    ),
  },
];
