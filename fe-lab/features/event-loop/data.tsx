import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "실행 컨텍스트와 콜 스택",
    code: `// 콜 스택은 현재 실행 중인 함수를 추적합니다.
// LIFO(Last In, First Out) 구조입니다.

function first() {
  console.log("first 시작");
  second();               // second()가 콜 스택에 push
  console.log("first 끝"); // second() 완료 후 실행
}

function second() {
  console.log("second 시작");
  third();                // third()가 콜 스택에 push
  console.log("second 끝");
}

function third() {
  console.log("third");   // 가장 위에서 실행 후 pop
}

first();
// 출력: first 시작 → second 시작 → third
//       → second 끝 → first 끝`,
  },
  {
    title: "setTimeout(0)의 비밀",
    code: `// setTimeout(fn, 0)은 "즉시 실행"이 아닙니다!
// 콜백을 태스크 큐에 넣고, 콜 스택이 빌 때까지 기다립니다.

console.log("1");          // 동기 — 즉시 실행

setTimeout(() => {
  console.log("2");        // 태스크 큐 → 마지막에 실행
}, 0);

console.log("3");          // 동기 — 즉시 실행

// 출력: 1 → 3 → 2
// "0ms"라도 동기 코드가 모두 끝난 후 실행됩니다.

// 이유: 이벤트 루프는 다음 순서를 따릅니다.
// 1. 콜 스택의 모든 동기 코드 실행
// 2. 마이크로태스크 큐 비우기
// 3. 태스크 큐에서 하나 꺼내 실행
// 4. 2-3 반복`,
  },
  {
    title: "Promise vs setTimeout",
    code: `// Promise.then()은 마이크로태스크 큐를 사용합니다.
// setTimeout()은 태스크(매크로태스크) 큐를 사용합니다.
// 마이크로태스크가 항상 먼저 실행됩니다!

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("promise 1"))
  .then(() => console.log("promise 2"));

queueMicrotask(() => console.log("microtask"));

console.log("sync");

// 출력: sync → promise 1 → microtask → promise 2 → timeout

// 마이크로태스크 소스:
//   - Promise.then / catch / finally
//   - queueMicrotask()
//   - MutationObserver

// 매크로태스크(태스크) 소스:
//   - setTimeout / setInterval
//   - I/O 작업
//   - requestAnimationFrame (렌더링 전)
//   - UI 렌더링`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "이벤트 루프가 무엇인지 설명해주세요.",
    answer: (
      <>
        이벤트 루프는 JavaScript의 <strong>비동기 실행 메커니즘</strong>입니다.
        JavaScript는 싱글 스레드 언어이므로 한 번에 하나의 작업만 실행할 수
        있습니다. 이벤트 루프는 <strong>콜 스택</strong>이 비어있는지 확인하고,
        비어있다면 먼저 <strong>마이크로태스크 큐</strong>의 모든 작업을 처리한
        후, <strong>태스크 큐(매크로태스크 큐)</strong>에서 하나의 작업을 꺼내
        콜 스택에 올립니다. 이 과정을 무한히 반복하여 비동기 코드의 실행 순서를
        관리합니다. 브라우저에서는 렌더링도 이 루프 사이에 끼어들어{" "}
        <InlineCode size="md">requestAnimationFrame</InlineCode> 콜백이
        실행됩니다.
      </>
    ),
  },
  {
    question: "마이크로태스크와 매크로태스크의 차이점은?",
    answer: (
      <>
        <strong>마이크로태스크</strong>는{" "}
        <InlineCode size="md">Promise.then</InlineCode>,{" "}
        <InlineCode size="md">queueMicrotask</InlineCode>,{" "}
        <InlineCode size="md">MutationObserver</InlineCode> 등에 의해 생성되며,
        현재 실행 중인 태스크가 끝나면{" "}
        <strong>즉시, 큐가 완전히 빌 때까지</strong> 모두 실행됩니다.
        <br />
        <br />
        <strong>매크로태스크(태스크)</strong>는{" "}
        <InlineCode size="md">setTimeout</InlineCode>,{" "}
        <InlineCode size="md">setInterval</InlineCode>, I/O 콜백 등에 의해
        생성되며, 이벤트 루프 한 바퀴에 <strong>하나씩만</strong> 실행됩니다.
        따라서 마이크로태스크는 항상 다음 매크로태스크보다 먼저 처리됩니다.
        마이크로태스크 내에서 새 마이크로태스크를 생성하면 그것도 같은 사이클에
        처리되므로 무한 루프에 주의해야 합니다.
      </>
    ),
  },
  {
    question: "다음 코드의 실행 순서를 설명해주세요.",
    answer: (
      <>
        <InlineCode size="md">console.log</InlineCode>,{" "}
        <InlineCode size="md">setTimeout</InlineCode>,{" "}
        <InlineCode size="md">Promise</InlineCode>가 혼합된 코드의 실행 순서:
        <br />
        <br />
        1. <strong>동기 코드</strong>가 먼저 실행됩니다 — 콜 스택에서 즉시 처리.{" "}
        2. <InlineCode size="md">setTimeout</InlineCode>은 콜백을{" "}
        <strong>태스크 큐</strong>에 등록만 합니다. 3.{" "}
        <InlineCode size="md">Promise.then</InlineCode>은 콜백을{" "}
        <strong>마이크로태스크 큐</strong>에 등록합니다. 4. 동기 코드가 모두
        끝나면 <strong>마이크로태스크 큐를 먼저 비웁니다</strong>. 5. 마지막으로{" "}
        <strong>태스크 큐</strong>의 콜백이 실행됩니다.
        <br />
        <br />
        핵심: 동기 &gt; 마이크로태스크 &gt; 매크로태스크 순서이며, 이는 이벤트
        루프의 우선순위 규칙에 의한 것입니다.
      </>
    ),
  },
];
