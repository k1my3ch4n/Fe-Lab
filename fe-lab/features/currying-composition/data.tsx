import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "커링 구현",
    code: `// 기본 커링
const curry = (fn) => {
  const arity = fn.length;

  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

// 사용 예
const add = curry((a, b, c) => a + b + c);

add(1)(2)(3);      // 6
add(1, 2)(3);      // 6
add(1)(2, 3);      // 6
add(1, 2, 3);      // 6

// 화살표 함수 커링
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);`,
  },
  {
    title: "pipe / compose 구현",
    code: `// pipe: 왼쪽 → 오른쪽 (읽기 순서)
const pipe = (...fns) =>
  (x) => fns.reduce((v, f) => f(v), x);

// compose: 오른쪽 → 왼쪽 (수학적 합성)
const compose = (...fns) =>
  (x) => fns.reduceRight((v, f) => f(v), x);

// 비동기 pipe
const asyncPipe = (...fns) =>
  (x) => fns.reduce(
    (promise, fn) => promise.then(fn),
    Promise.resolve(x)
  );

// TypeScript 타입 안전한 pipe
function pipe2<A, B>(f: (a: A) => B): (a: A) => B;
function pipe2<A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C
): (a: A) => C;
// ... 오버로드 추가`,
  },
  {
    title: "실전 활용",
    code: `// 데이터 변환 파이프라인
const processOrder = pipe(
  validateOrder,
  calculateTotal,
  applyDiscount(0.1),    // 커링: 10% 할인
  addTax(0.08),          // 커링: 8% 세금
  formatReceipt
);

// React 컴포넌트 합성
const enhance = compose(
  withRouter,
  withAuth,
  withTheme("dark"),     // 커링: 테마 설정
  React.memo
);

const EnhancedPage = enhance(PageComponent);

// 유효성 검사 합성
const validateEmail = pipe(
  trim,
  toLowerCase,
  checkFormat(/^[^@]+@[^@]+$/),
  checkLength(5, 50)    // 커링: 길이 범위
);`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "커링(Currying)이란 무엇인가요?",
    answer: (
      <>
        커링은 <strong>다중 인자 함수를 단일 인자 함수의 체인으로 변환</strong>
        하는 기법입니다. <InlineCode>f(a, b, c)</InlineCode>를{" "}
        <InlineCode>f(a)(b)(c)</InlineCode>로 변환합니다. 이를 통해{" "}
        <strong>부분 적용(Partial Application)</strong>이 가능해집니다 — 일부
        인자를 미리 고정한 새로운 함수를 만들 수 있습니다. 클로저를 활용하여
        이전에 전달된 인자를 기억합니다.
      </>
    ),
  },
  {
    question: "함수 합성(Function Composition)이란?",
    answer: (
      <>
        함수 합성은 <strong>여러 함수를 결합하여 새로운 함수를 만드는</strong>{" "}
        기법입니다. <InlineCode>compose(f, g)(x)</InlineCode>는{" "}
        <InlineCode>f(g(x))</InlineCode>와 같습니다.{" "}
        <InlineCode>pipe</InlineCode>는 왼쪽에서 오른쪽으로 (읽기 순서),{" "}
        <InlineCode>compose</InlineCode>는 오른쪽에서 왼쪽으로 (수학적 합성)
        실행됩니다. 데이터 변환 파이프라인, 미들웨어 패턴, React HOC 합성 등에
        활용됩니다.
      </>
    ),
  },
  {
    question: "커링과 함수 합성의 실전 사용 사례는?",
    answer: (
      <>
        1. <strong>설정 팩토리</strong> —{" "}
        <InlineCode>
          createLogger(&quot;ERROR&quot;)(&quot;API&quot;)
        </InlineCode>{" "}
        처럼 설정을 단계별로 주입 2. <strong>데이터 파이프라인</strong> —{" "}
        <InlineCode>pipe(filter, sort, take(10), format)</InlineCode> 3.{" "}
        <strong>이벤트 핸들러</strong> —{" "}
        <InlineCode>handleClick(userId)</InlineCode> 로 파라미터 바인딩 4.{" "}
        <strong>유효성 검사</strong> — 검사 규칙을 합성하여 재사용 5.{" "}
        <strong>React HOC / 미들웨어</strong> — 기능을 레이어별로 합성
      </>
    ),
  },
];
