import type { CopyMethod, ObjectNode } from "./types";

export const COPY_METHODS: CopyMethod[] = [
  {
    id: "spread",
    label: "Spread / assign",
    code: `const original = {
  name: 'Kim',
  address: { city: 'Seoul' }
};

// Spread 연산자 (얕은 복사)
const copy1 = { ...original };

// Object.assign (얕은 복사)
const copy2 = Object.assign({}, original);

copy1.name = 'Lee';           // 원본 영향 없음 ✓
copy1.address.city = 'Busan'; // 원본도 변경됨 ✗

console.log(original.address.city); // 'Busan' ← 문제!`,
    description:
      "1단계만 복사합니다. 중첩 객체는 참조를 공유하므로, 중첩된 값을 변경하면 원본에도 영향을 줍니다.",
    isDeep: false,
    color: "#ffb800",
  },
  {
    id: "json",
    label: "JSON 방식",
    code: `const original = {
  name: 'Kim',
  address: { city: 'Seoul' },
  date: new Date(),
  regex: /test/g,
  fn: () => 'hello',
};

const copy = JSON.parse(JSON.stringify(original));

copy.address.city = 'Busan';
console.log(original.address.city); // 'Seoul' ✓

// ⚠️ 주의: 일부 타입이 소실됨
console.log(copy.date);  // string (Date 객체 아님)
console.log(copy.regex); // {} (정규식 소실)
console.log(copy.fn);    // undefined (함수 소실)`,
    description:
      "깊은 복사를 수행하지만, Date, RegExp, 함수, undefined, Symbol, Map, Set 등은 올바르게 복사되지 않습니다.",
    isDeep: true,
    color: "#ff2d8a",
  },
  {
    id: "structuredClone",
    label: "structuredClone",
    code: `const original = {
  name: 'Kim',
  address: { city: 'Seoul' },
  date: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([['key', 'value']]),
  buffer: new ArrayBuffer(8),
};

const copy = structuredClone(original);

copy.address.city = 'Busan';
console.log(original.address.city); // 'Seoul' ✓
console.log(copy.date instanceof Date);  // true ✓
console.log(copy.set instanceof Set);    // true ✓

// ⚠️ 함수, DOM 노드는 복사 불가
// structuredClone({ fn: () => {} }); // Error!`,
    description:
      "네이티브 깊은 복사 API입니다. Date, Map, Set, ArrayBuffer 등을 올바르게 복사합니다. 단, 함수와 DOM 노드는 복사할 수 없습니다.",
    isDeep: true,
    color: "#00e676",
  },
];

export const TABS = COPY_METHODS.map((x) => ({ id: x.id, label: x.label }));

export const ORIGINAL_OBJECT: ObjectNode[] = [
  { key: "name", value: "'Kim'", isReference: false, color: "#00e5ff" },
  { key: "age", value: "25", isReference: false, color: "#00e5ff" },
  {
    key: "address",
    value: "{ city: 'Seoul' }",
    isReference: true,
    color: "#b388ff",
  },
  {
    key: "hobbies",
    value: "['coding', 'music']",
    isReference: true,
    color: "#ff2d8a",
  },
];
