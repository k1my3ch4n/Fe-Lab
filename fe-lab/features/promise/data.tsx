import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Promise 기본",
    code: `// Promise 생성
const fetchData = () => new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    success ? resolve({ id: 1, name: 'Kim' }) : reject('Error');
  }, 1000);
});

// Promise 체이닝
fetchData()
  .then(data => {
    console.log(data);         // { id: 1, name: 'Kim' }
    return data.name;
  })
  .then(name => {
    console.log(name.toUpperCase()); // 'KIM'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('완료');        // 항상 실행
  });`,
  },
  {
    title: "Promise 메서드들",
    code: `const p1 = Promise.resolve('A');
const p2 = new Promise(r => setTimeout(() => r('B'), 1000));
const p3 = Promise.reject('C');

// Promise.all — 모두 성공해야 성공
Promise.all([p1, p2])
  .then(([a, b]) => console.log(a, b)); // 'A' 'B'

// Promise.race — 가장 빠른 결과
Promise.race([p2, new Promise(r => setTimeout(() => r('fast'), 500))])
  .then(v => console.log(v)); // 'fast'

// Promise.allSettled — 모든 결과 수집
Promise.allSettled([p1, p3])
  .then(results => console.log(results));
// [{ status: 'fulfilled', value: 'A' },
//  { status: 'rejected', reason: 'C' }]

// Promise.any — 첫 성공
Promise.any([p3, p1])
  .then(v => console.log(v)); // 'A'`,
  },
  {
    title: "async/await 변환",
    code: `// Promise 체이닝
function getUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(user => fetch(\`/api/posts?userId=\${user.id}\`))
    .then(res => res.json())
    .catch(err => console.error(err));
}

// async/await로 변환
async function getUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const user = await res.json();
    const postsRes = await fetch(\`/api/posts?userId=\${user.id}\`);
    return await postsRes.json();
  } catch (err) {
    console.error(err);
  }
}

// 병렬 실행
async function getAll() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
  ]);
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Promise란 무엇인가요?",
    answer: (
      <>
        Promise는 <strong>비동기 작업의 최종 완료 또는 실패</strong>를 나타내는
        객체입니다. 세 가지 상태를 가집니다: <InlineCode>pending</InlineCode>
        (대기), <InlineCode>fulfilled</InlineCode>(이행),{" "}
        <InlineCode>rejected</InlineCode>(거부). 한 번 settled(fulfilled 또는
        rejected) 상태가 되면 다시 변경되지 않습니다. 콜백 헬(callback hell)을
        해결하고, 체이닝을 통한 가독성 향상과 에러 처리를 일원화합니다.
      </>
    ),
  },
  {
    question: "Promise.all, race, allSettled, any의 차이점은 무엇인가요?",
    answer: (
      <>
        <InlineCode>Promise.all</InlineCode>: 모든 Promise가 fulfilled되면 결과
        배열 반환, 하나라도 rejected되면 즉시 reject.{" "}
        <InlineCode>Promise.race</InlineCode>: 가장 먼저 settle된 결과 반환
        (성공이든 실패든). <InlineCode>Promise.allSettled</InlineCode>: 모든
        Promise가 settle될 때까지 대기, 각각의 status와 value/reason 반환.{" "}
        <InlineCode>Promise.any</InlineCode>: 가장 먼저 fulfilled된 값 반환,
        모두 rejected되면 AggregateError 발생.
      </>
    ),
  },
  {
    question: "async/await와 Promise의 관계를 설명해주세요.",
    answer: (
      <>
        <InlineCode>async/await</InlineCode>는 Promise를 더 읽기 쉽게 사용하기
        위한 <strong>문법적 설탕(syntactic sugar)</strong>입니다.
        <InlineCode>async</InlineCode> 함수는 항상 Promise를 반환하며,{" "}
        <InlineCode>await</InlineCode>는 Promise가 settle될 때까지 실행을 일시
        중지합니다. try/catch로 에러 처리가 가능하여 동기 코드처럼 작성할 수
        있습니다. 내부적으로는 여전히 Promise 기반으로 동작합니다.
      </>
    ),
  },
];
