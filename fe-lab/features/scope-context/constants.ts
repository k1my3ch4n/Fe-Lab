export interface BindingExample {
  id: string;
  label: string;
  code: string;
  thisValue: string;
  explanation: string;
  color: string;
}

export interface ScopeLevel {
  name: string;
  variables: { name: string; value: string }[];
  color: string;
}

export const BINDING_EXAMPLES: BindingExample[] = [
  {
    id: "normal",
    label: "일반 함수",
    code: `const obj = {
  name: 'Kim',
  greet() {
    console.log(this.name);
  }
};

obj.greet();        // 'Kim'
const fn = obj.greet;
fn();               // undefined (strict mode)`,
    thisValue: "호출한 객체 (obj)",
    explanation:
      "일반 함수의 this는 호출 시점에 결정됩니다. 메서드로 호출하면 해당 객체, 단독 호출하면 undefined(strict) 또는 window입니다.",
    color: "#00e5ff",
  },
  {
    id: "arrow",
    label: "화살표 함수",
    code: `const obj = {
  name: 'Kim',
  greet: () => {
    console.log(this.name);
  },
  delayGreet() {
    setTimeout(() => {
      console.log(this.name); // 'Kim'
    }, 100);
  }
};

obj.greet();       // undefined (상위 스코프의 this)
obj.delayGreet();  // 'Kim' (delayGreet의 this를 상속)`,
    thisValue: "렉시컬 스코프의 this (상위)",
    explanation:
      "화살표 함수는 자체 this를 갖지 않고, 선언된 위치의 상위 스코프 this를 그대로 사용합니다. bind/call/apply로도 변경할 수 없습니다.",
    color: "#ff2d8a",
  },
  {
    id: "bind-call-apply",
    label: "bind / call / apply",
    code: `function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const user = { name: 'Kim' };

// call: 즉시 호출, 인자를 개별 전달
introduce.call(user, 'Hello', '!');
// → 'Hello, Kim!'

// apply: 즉시 호출, 인자를 배열로 전달
introduce.apply(user, ['Hi', '.']);
// → 'Hi, Kim.'

// bind: 새 함수 반환, 나중에 호출
const boundFn = introduce.bind(user, 'Hey');
boundFn('~');  // → 'Hey, Kim~'`,
    thisValue: "명시적으로 지정한 객체",
    explanation:
      "call/apply는 즉시 호출하며 this를 지정합니다. bind는 this가 고정된 새 함수를 반환합니다. call은 인자를 개별로, apply는 배열로 받습니다.",
    color: "#ffb800",
  },
  {
    id: "iife",
    label: "IIFE",
    code: `// 즉시 실행 함수 표현식
(function() {
  const secret = 'hidden';
  console.log(secret); // 'hidden'
})();

// console.log(secret); // ReferenceError!

// 모듈 패턴
const module = (function() {
  let count = 0;
  return {
    increment() { return ++count; },
    getCount() { return count; }
  };
})();

module.increment(); // 1
module.getCount();  // 1`,
    thisValue: "window / undefined (strict)",
    explanation:
      "IIFE는 선언과 동시에 실행되는 함수입니다. 전역 스코프 오염을 방지하고, 모듈 패턴으로 캡슐화를 구현할 때 사용됩니다.",
    color: "#b388ff",
  },
];

export const SCOPE_CHAIN_LEVELS: ScopeLevel[] = [
  {
    name: "Global Scope",
    variables: [
      { name: "window", value: "Window" },
      { name: "globalVar", value: "'global'" },
    ],
    color: "#00e5ff",
  },
  {
    name: "Function Scope (outer)",
    variables: [
      { name: "outerVar", value: "'outer'" },
      { name: "this", value: "→ caller" },
    ],
    color: "#ffb800",
  },
  {
    name: "Block Scope (if / for)",
    variables: [
      { name: "blockVar", value: "'block'" },
      { name: "let/const", value: "블록 내 한정" },
    ],
    color: "#ff2d8a",
  },
  {
    name: "Function Scope (inner)",
    variables: [
      { name: "innerVar", value: "'inner'" },
      { name: "[[Scope]]", value: "→ outer → global" },
    ],
    color: "#b388ff",
  },
];
