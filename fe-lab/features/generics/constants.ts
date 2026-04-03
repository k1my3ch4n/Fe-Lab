export interface GenericExample {
  id: string;
  label: string;
  code: string;
  description: string;
  inputType: string;
  outputType: string;
  color: string;
}

export const GENERIC_EXAMPLES: GenericExample[] = [
  {
    id: "identity",
    label: "Identity<T>",
    code: `function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // "hello"
identity<number>(42);      // 42`,
    description:
      "제네릭 함수는 타입을 매개변수로 받아 다양한 타입에서 동작합니다.",
    inputType: "T",
    outputType: "T",
    color: "#00e5ff",
  },
  {
    id: "partial",
    label: "Partial<T>",
    code: `interface User {
  name: string;
  age: number;
  email: string;
}

// Partial<User> → 모든 속성이 선택적
type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

const update: PartialUser = { name: "Kim" }; // ✓`,
    description: "Partial<T>는 모든 속성을 선택적(optional)으로 만듭니다.",
    inputType: "{ name: string; age: number; email: string }",
    outputType: "{ name?: string; age?: number; email?: string }",
    color: "#b388ff",
  },
  {
    id: "pick-omit",
    label: "Pick / Omit",
    code: `interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

// Pick: 선택한 속성만 추출
type UserProfile = Pick<User, "name" | "email">;
// { name: string; email: string }

// Omit: 선택한 속성을 제외
type SafeUser = Omit<User, "password">;
// { name: string; age: number; email: string }`,
    description: "Pick은 특정 속성만 추출하고, Omit은 특정 속성을 제외합니다.",
    inputType: "User (4 props)",
    outputType: "Pick → 2 props / Omit → 3 props",
    color: "#00e676",
  },
  {
    id: "record",
    label: "Record<K,V>",
    code: `type Status = "loading" | "success" | "error";

// Record: 키-값 타입 매핑
type StatusMap = Record<Status, string>;
// { loading: string; success: string; error: string }

const messages: StatusMap = {
  loading: "로딩 중...",
  success: "완료!",
  error: "오류 발생",
};`,
    description: "Record<K,V>는 키 타입과 값 타입으로 객체 타입을 생성합니다.",
    inputType: 'K = "loading" | "success" | "error", V = string',
    outputType: "{ loading: string; success: string; error: string }",
    color: "#ffb800",
  },
  {
    id: "conditional",
    label: "Conditional",
    code: `// 조건부 타입: T extends U ? X : Y
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// infer를 사용한 타입 추출
type ReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never;

type Fn = () => number;
type Result = ReturnType<Fn>; // number`,
    description:
      "조건부 타입은 타입 수준의 삼항 연산자로, infer로 타입 추출이 가능합니다.",
    inputType: "T extends U ?",
    outputType: "X : Y",
    color: "#ff2d8a",
  },
];

export const UTILITY_TYPE_MAP = [
  { name: "Partial<T>", desc: "모든 속성 선택적", color: "#b388ff" },
  { name: "Required<T>", desc: "모든 속성 필수", color: "#00e5ff" },
  { name: "Readonly<T>", desc: "모든 속성 읽기전용", color: "#00e676" },
  { name: "Pick<T,K>", desc: "특정 속성 추출", color: "#ffb800" },
  { name: "Omit<T,K>", desc: "특정 속성 제외", color: "#ff2d8a" },
  { name: "Record<K,V>", desc: "키-값 매핑", color: "#b388ff" },
  { name: "Exclude<T,U>", desc: "유니온에서 제외", color: "#00e5ff" },
  { name: "Extract<T,U>", desc: "유니온에서 추출", color: "#00e676" },
  { name: "ReturnType<T>", desc: "함수 반환 타입", color: "#ffb800" },
  { name: "Parameters<T>", desc: "함수 매개변수 타입", color: "#ff2d8a" },
];
