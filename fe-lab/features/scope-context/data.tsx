import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "스코프 체인",
    code: `const globalVar = 'global';

function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';
    // inner → outer → global 순서로 탐색
    console.log(innerVar);  // 'inner'  (자신의 스코프)
    console.log(outerVar);  // 'outer'  (외부 스코프)
    console.log(globalVar); // 'global' (전역 스코프)
  }

  inner();
}

outer();`,
  },
  {
    title: "this 바인딩 규칙",
    code: `// 1. 기본 바인딩 (단독 호출)
function standalone() {
  console.log(this); // window (non-strict) / undefined (strict)
}

// 2. 암시적 바인딩 (메서드 호출)
const obj = {
  name: 'Kim',
  greet() { console.log(this.name); } // 'Kim'
};

// 3. 명시적 바인딩
function greet() { console.log(this.name); }
greet.call({ name: 'Lee' });   // 'Lee'
greet.apply({ name: 'Park' }); // 'Park'
const bound = greet.bind({ name: 'Choi' });
bound(); // 'Choi'

// 4. new 바인딩
function Person(name) { this.name = name; }
const p = new Person('Kim'); // this → 새 객체`,
  },
  {
    title: "IIFE 패턴",
    code: `// 기본 IIFE
(function() {
  const private = 'secret';
  console.log(private); // 'secret'
})();
// private → ReferenceError

// 매개변수 전달
(function(global) {
  console.log(global === window); // true
})(window);

// 화살표 함수 IIFE
(() => {
  const config = { debug: true };
  console.log(config.debug); // true
})();

// 반환값 활용
const result = (() => {
  const x = 10, y = 20;
  return x + y;
})(); // 30`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "스코프(Scope)와 스코프 체인에 대해 설명해주세요.",
    answer: (
      <>
        스코프는 <strong>변수에 접근할 수 있는 범위</strong>입니다.
        JavaScript에는 전역 스코프, 함수 스코프, 블록 스코프가 있습니다. 스코프
        체인은 현재 스코프에서 변수를 찾지 못하면{" "}
        <strong>상위 스코프로 올라가며 탐색</strong>하는 메커니즘입니다. 이는
        렉시컬 스코핑(정적 스코핑)에 기반하여, 함수가{" "}
        <strong>선언된 위치</strong>에 따라 스코프 체인이 결정됩니다.
      </>
    ),
  },
  {
    question: "실행 컨텍스트(Execution Context)란 무엇인가요?",
    answer: (
      <>
        실행 컨텍스트는 <strong>코드가 실행되기 위한 환경 정보</strong>를 담고
        있는 객체입니다. Variable Environment(변수 환경), Lexical
        Environment(렉시컬 환경), <InlineCode>this</InlineCode> 바인딩으로
        구성됩니다. 코드 실행 시 전역 실행 컨텍스트가 생성되고, 함수 호출마다
        새로운 실행 컨텍스트가 콜 스택에 push됩니다. 함수 종료 시 pop되어 이전
        컨텍스트로 돌아갑니다.
      </>
    ),
  },
  {
    question: "화살표 함수와 일반 함수의 this 차이는 무엇인가요?",
    answer: (
      <>
        일반 함수의 <InlineCode>this</InlineCode>는 <strong>호출 방식</strong>에
        따라 동적으로 결정됩니다 (메서드 호출, call/apply/bind, new 등). 반면
        화살표 함수는 자체 <InlineCode>this</InlineCode>를 갖지 않고,{" "}
        <strong>선언 시점의 상위 스코프 this</strong>를 그대로 사용합니다
        (렉시컬 this). 따라서 <InlineCode>call</InlineCode>,{" "}
        <InlineCode>apply</InlineCode>, <InlineCode>bind</InlineCode>로도 화살표
        함수의 this를 변경할 수 없습니다.
      </>
    ),
  },
  {
    question: "IIFE의 목적과 사용 사례를 설명해주세요.",
    answer: (
      <>
        IIFE(Immediately Invoked Function Expression)는{" "}
        <strong>선언과 동시에 실행</strong>되는 함수입니다. 주요 목적: 1.{" "}
        <strong>전역 스코프 오염 방지</strong> — 변수를 함수 스코프 내에 격리 2.{" "}
        <strong>모듈 패턴</strong> — 캡슐화된 프라이빗 상태와 퍼블릭 API 구현 3.{" "}
        <strong>초기화 코드</strong> — 한 번만 실행되는 설정 로직. ES6 모듈(
        <InlineCode>import</InlineCode>/<InlineCode>export</InlineCode>)이
        도입되면서 사용 빈도가 줄었지만, 라이브러리 번들링이나 레거시 환경에서
        여전히 활용됩니다.
      </>
    ),
  },
];
