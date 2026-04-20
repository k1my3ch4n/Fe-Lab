import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "기본 클로저",
    code: `function outer() {
  const message = 'Hello';  // 외부 함수의 변수

  function inner() {
    console.log(message);   // 클로저: 외부 변수 참조
  }

  return inner;
}

const fn = outer();
fn(); // 'Hello' — outer()는 이미 종료되었지만
      // inner()가 message를 기억하고 있음`,
  },
  {
    title: "클로저로 캡슐화",
    code: `function createStack() {
  const items = [];  // 외부에서 접근 불가

  return {
    push(item) { items.push(item); },
    pop() { return items.pop(); },
    peek() { return items[items.length - 1]; },
    get size() { return items.length; }
  };
}

const stack = createStack();
stack.push('a');
stack.push('b');
stack.size;     // 2
stack.pop();    // 'b'
// stack.items → undefined (캡슐화 성공)`,
  },
  {
    title: "커링 (Currying)",
    code: `// 클로저를 활용한 커링 패턴
function multiply(a) {
  return function(b) {  // 클로저: a를 기억
    return a * b;
  };
}

const double = multiply(2);   // a = 2 고정
const triple = multiply(3);   // a = 3 고정

double(5);  // 10
triple(5);  // 15

// 화살표 함수로 간결하게
const multiply = a => b => a * b;`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "클로저(Closure)란 무엇인가요?",
    answer: (
      <>
        클로저는 <strong>함수와 그 함수가 선언된 렉시컬 환경의 조합</strong>
        입니다. 내부 함수가 외부 함수의 변수에 접근할 수 있는 것을 의미합니다.
        외부 함수의 실행이 끝나더라도 내부 함수가 외부 함수의 변수를{" "}
        <strong>기억</strong>하고 접근할 수 있습니다. 이는 JavaScript의 렉시컬
        스코핑 규칙에 의해 가능합니다.
      </>
    ),
  },
  {
    question: "클로저의 실용적 사용 사례를 설명해주세요.",
    answer: (
      <>
        1. <strong>데이터 캡슐화/프라이빗 변수</strong> — 모듈 패턴에서 외부
        접근을 차단 2. <strong>팩토리 함수</strong> — 설정을 기억하는 함수 생성
        (커링, partial application) 3. <strong>이벤트 핸들러</strong> — 콜백에서
        외부 상태 참조 4. <strong>메모이제이션</strong> — 이전 계산 결과를 캐싱{" "}
        5. React의 <InlineCode>useState</InlineCode>,{" "}
        <InlineCode>useEffect</InlineCode> 등 훅도 내부적으로 클로저를
        활용합니다.
      </>
    ),
  },
  {
    question: "클로저와 메모리 누수의 관계를 설명해주세요.",
    answer: (
      <>
        클로저가 외부 변수를 참조하고 있으면, 해당 변수는{" "}
        <strong>가비지 컬렉션의 대상이 되지 않습니다</strong>. 클로저가 더 이상
        필요하지 않은데도 참조를 유지하면 메모리 누수가 발생할 수 있습니다.
        <br />
        <br />
        예방법: 1. 불필요한 클로저 참조를 <InlineCode>null</InlineCode>로 해제{" "}
        2. 이벤트 리스너 등록 시 반드시 해제 처리 3.{" "}
        <InlineCode>WeakRef</InlineCode>나 <InlineCode>WeakMap</InlineCode> 활용
        검토
      </>
    ),
  },
];
