import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Spread / Object.assign",
    code: `// Spread 연산자 (얕은 복사)
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

copy.a = 10;       // 원본 영향 없음 (원시값)
copy.b.c = 20;     // 원본도 변경됨! (참조 공유)
console.log(original.b.c); // 20

// Object.assign (얕은 복사)
const copy2 = Object.assign({}, original);
// 동일한 동작: 1단계만 복사

// 배열도 동일
const arr = [1, [2, 3]];
const arrCopy = [...arr];
arrCopy[1].push(4);
console.log(arr[1]); // [2, 3, 4] ← 원본 변경!`,
  },
  {
    title: "JSON 방식",
    code: `// JSON.parse(JSON.stringify()) — 깊은 복사
const original = {
  name: 'Kim',
  nested: { deep: { value: 42 } }
};

const copy = JSON.parse(JSON.stringify(original));
copy.nested.deep.value = 100;
console.log(original.nested.deep.value); // 42 ✓

// ⚠️ 한계점
const problematic = {
  date: new Date(),        // → string으로 변환
  regex: /test/g,          // → {} 빈 객체
  fn: () => 'hello',      // → 소실 (undefined)
  undef: undefined,        // → 소실
  nan: NaN,                // → null
  infinity: Infinity,      // → null
  circular: null,          // 순환 참조 시 에러!
};`,
  },
  {
    title: "structuredClone",
    code: `// structuredClone — 네이티브 깊은 복사 (권장)
const original = {
  name: 'Kim',
  nested: { deep: { value: 42 } },
  date: new Date(),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  buffer: new ArrayBuffer(16),
};

const copy = structuredClone(original);
copy.nested.deep.value = 100;
console.log(original.nested.deep.value); // 42 ✓

// Date, Map, Set 등 올바르게 복사됨
copy.date instanceof Date;  // true ✓
copy.map instanceof Map;    // true ✓

// ⚠️ 복사 불가: 함수, DOM 노드, Symbol
// structuredClone({ fn: () => {} }); // DataCloneError`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "얕은 복사와 깊은 복사의 차이를 설명해주세요.",
    answer: (
      <>
        <strong>얕은 복사(Shallow Copy)</strong>는 객체의 1단계 프로퍼티만 새로
        복사하고, 중첩된 객체는 <strong>참조(reference)를 공유</strong>합니다.
        따라서 중첩 객체를 변경하면 원본에도 영향을 줍니다.
        <br />
        <br />
        <strong>깊은 복사(Deep Copy)</strong>는 중첩된 모든 레벨의 객체를{" "}
        <strong>새로운 메모리에 독립적으로 복사</strong>합니다. 원본과 복사본이
        완전히 분리되어, 한쪽을 변경해도 다른 쪽에 영향을 주지 않습니다.
      </>
    ),
  },
  {
    question:
      "structuredClone과 JSON.parse(JSON.stringify())의 차이점은 무엇인가요?",
    answer: (
      <>
        <InlineCode>JSON.parse(JSON.stringify())</InlineCode>는{" "}
        <InlineCode>Date</InlineCode>, <InlineCode>RegExp</InlineCode>, 함수,{" "}
        <InlineCode>undefined</InlineCode>, <InlineCode>Map</InlineCode>,{" "}
        <InlineCode>Set</InlineCode> 등의 타입을 올바르게 처리하지 못하며, 순환
        참조 시 에러가 발생합니다.
        <br />
        <br />
        <InlineCode>structuredClone</InlineCode>은 Date, Map, Set, ArrayBuffer
        등을 올바르게 복사하고, 순환 참조도 처리합니다. 단,{" "}
        <strong>함수와 DOM 노드는 복사할 수 없습니다</strong>. 모던 브라우저에서
        지원되며, 깊은 복사의 <strong>권장 방식</strong>입니다.
      </>
    ),
  },
  {
    question: "참조 타입과 원시 타입의 차이를 설명해주세요.",
    answer: (
      <>
        <strong>원시 타입</strong>(string, number, boolean, null, undefined,
        Symbol, BigInt)은 값 자체가 변수에 저장되며, 복사 시{" "}
        <strong>값이 복제</strong>됩니다.
        <br />
        <br />
        <strong>참조 타입</strong>(Object, Array, Function, Date 등)은 힙
        메모리에 저장되고, 변수에는 <strong>메모리 주소(참조)</strong>가
        저장됩니다. 따라서 참조 타입을 다른 변수에 할당하면 같은 객체를{" "}
        <strong>공유</strong>하게 되어, 한쪽의 변경이 다른 쪽에도 반영됩니다.
      </>
    ),
  },
];
