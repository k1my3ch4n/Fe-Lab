import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "캡쳐링 / 버블링 리스너",
    code: `// 버블링 (기본) — 타겟 → window 순서
document.querySelector('.parent')
  .addEventListener('click', (e) => {
    console.log('버블링:', e.currentTarget);
  });

// 캡쳐링 — window → 타겟 순서
document.querySelector('.parent')
  .addEventListener('click', (e) => {
    console.log('캡쳐링:', e.currentTarget);
  }, { capture: true });  // 또는 세 번째 인자에 true`,
  },
  {
    title: "stopPropagation()",
    code: `// 이벤트 전파 중단
button.addEventListener('click', (e) => {
  e.stopPropagation();
  // 이 이벤트는 부모로 전파되지 않음
  console.log('버튼 클릭!');
});

// stopImmediatePropagation()
// 같은 요소의 다른 리스너도 실행하지 않음
button.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
});`,
  },
  {
    title: "이벤트 위임 패턴",
    code: `// ❌ 각 아이템마다 리스너 등록
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// ✅ 부모 하나에 리스너 등록 (이벤트 위임)
document.querySelector('.list')
  .addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (!item) return;

    // 동적으로 추가된 요소도 자동 처리!
    console.log('클릭된 아이템:', item.dataset.id);
  });`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "이벤트 버블링과 캡쳐링의 차이를 설명해주세요.",
    answer: (
      <>
        이벤트 전파는 3단계로 진행됩니다. <strong>캡쳐링</strong>은
        최상위(window)에서 타겟까지 내려가는 단계이고, <strong>버블링</strong>은
        타겟에서 다시 최상위로 올라가는 단계입니다. 기본적으로 이벤트 리스너는
        버블링 단계에서 동작하며, <InlineCode>addEventListener</InlineCode>의 세
        번째 인자에 <InlineCode>true</InlineCode> 또는{" "}
        <InlineCode>{`{ capture: true }`}</InlineCode>를 전달하면 캡쳐링
        단계에서 이벤트를 처리할 수 있습니다.
      </>
    ),
  },
  {
    question: "event.stopPropagation()과 event.preventDefault()의 차이는?",
    answer: (
      <>
        <InlineCode>stopPropagation()</InlineCode>은 이벤트의{" "}
        <strong>전파를 중단</strong>합니다. 현재 요소에서 이벤트 처리 후
        부모/자식 요소로 더 이상 전파되지 않습니다.
        <br />
        <br />
        <InlineCode>preventDefault()</InlineCode>는 이벤트의{" "}
        <strong>기본 동작을 취소</strong>합니다. 예를 들어 링크 클릭 시 페이지
        이동, 폼 제출 시 새로고침 등을 막습니다. 이벤트 전파는 그대로
        진행됩니다.
      </>
    ),
  },
  {
    question: "이벤트 위임(Event Delegation)이란 무엇이며 왜 사용하나요?",
    answer: (
      <>
        이벤트 위임은 버블링을 활용한 패턴입니다. 자식 요소마다 이벤트 리스너를
        붙이는 대신, <strong>공통 부모 요소 하나에 리스너를 등록</strong>하여{" "}
        <InlineCode>event.target</InlineCode>으로 실제 클릭된 요소를 판별합니다.
        <br />
        <br />
        장점: 1. 메모리 효율 (리스너 수 감소) 2. 동적으로 추가되는 요소도 자동
        처리 3. 관리 포인트가 하나로 집중
      </>
    ),
  },
];
