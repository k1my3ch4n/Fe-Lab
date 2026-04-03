import type { LeakPattern } from "./types";

export const LEAK_PATTERNS: LeakPattern[] = [
  {
    id: "event-listener",
    label: "이벤트 리스너",
    code: `// ❌ 메모리 릭: 리스너 미해제
function setupHandler() {
  const data = new Array(10000).fill('★');

  const handler = () => {
    console.log(data.length); // 클로저로 data 참조 유지
  };

  document.addEventListener('click', handler);
  // 컴포넌트가 언마운트되어도 handler와 data는 GC 대상 아님!
}

// ✅ 해결: cleanup 함수로 해제
function setupHandler() {
  const data = new Array(10000).fill('★');
  const handler = () => console.log(data.length);

  document.addEventListener('click', handler);

  return () => {
    document.removeEventListener('click', handler);
    // handler 해제 → data도 GC 가능
  };
}`,
    description:
      "이벤트 리스너를 등록하고 해제하지 않으면, 핸들러와 그 클로저가 참조하는 모든 변수가 메모리에 남습니다.",
    severity: "high",
    color: "#ff2d8a",
  },
  {
    id: "closure-leak",
    label: "클로저 참조",
    code: `// ❌ 메모리 릭: 불필요한 클로저 참조
let theThing = null;

function replaceThing() {
  const originalThing = theThing; // 이전 값 참조
  const unused = function() {     // 사용하지 않는 클로저
    if (originalThing) {          // originalThing 참조 유지!
      console.log('hi');
    }
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod() {
      // unused와 같은 스코프 → originalThing 참조 유지
    }
  };
}

// replaceThing()을 반복 호출하면 메모리 계속 증가!

// ✅ 해결: 참조 명시적 해제
function replaceThing() {
  const originalThing = theThing;
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod() { /* ... */ }
  };
  // originalThing은 함수 종료 후 GC 가능
}`,
    description:
      "같은 스코프의 클로저들은 변수 객체를 공유합니다. 사용하지 않는 클로저라도 다른 클로저가 참조하는 변수를 유지시킬 수 있습니다.",
    severity: "high",
    color: "#ffb800",
  },
  {
    id: "detached-dom",
    label: "분리된 DOM",
    code: `// ❌ 메모리 릭: DOM 참조 유지
const elements = {};

function createElement() {
  const div = document.createElement('div');
  div.id = 'myDiv';
  document.body.appendChild(div);
  elements.myDiv = div; // JS에서 참조 유지
}

function removeElement() {
  const div = document.getElementById('myDiv');
  document.body.removeChild(div);
  // elements.myDiv가 여전히 참조 → GC 불가!
}

// ✅ 해결: JS 참조도 함께 제거
function removeElement() {
  const div = document.getElementById('myDiv');
  document.body.removeChild(div);
  delete elements.myDiv; // 참조 해제 → GC 가능
}

// ✅ 또는 WeakRef 사용
const elements = new Map();
elements.set('myDiv', new WeakRef(div));`,
    description:
      "DOM 노드를 제거해도 JavaScript에서 참조를 유지하면 가비지 컬렉션 대상이 되지 않습니다 (Detached DOM Tree).",
    severity: "medium",
    color: "#b388ff",
  },
];

export const TABS = LEAK_PATTERNS.map((x) => ({ id: x.id, label: x.label }));

export const SEVERITY_COLORS = {
  high: "#ff2d8a",
  medium: "#ffb800",
  low: "#00e676",
};

export const GC_PHASES = [
  {
    name: "Mark",
    description: "루트에서 도달 가능한 객체를 마킹",
    color: "#00e5ff",
  },
  {
    name: "Sweep",
    description: "마킹되지 않은 객체의 메모리를 해제",
    color: "#ff2d8a",
  },
  {
    name: "Compact",
    description: "메모리 단편화를 줄이기 위해 압축 (선택적)",
    color: "#00e676",
  },
];
