export interface QueueItem {
  label: string;
  color: string;
}

export interface Step {
  description: string;
  callStack: QueueItem[];
  microtaskQueue: QueueItem[];
  taskQueue: QueueItem[];
  console: string[];
}

export interface Scenario {
  id: string;
  label: string;
  code: string;
  steps: Step[];
}

const COLORS = {
  global: "#00e5ff",
  sync: "#00e5ff",
  promise: "#b388ff",
  then: "#b388ff",
  timeout: "#ffb800",
  callback: "#ffb800",
  log: "#00e676",
  queueMicrotask: "#b388ff",
  anonymous: "#ff2d8a",
};

export const EVENT_LOOP_SCENARIOS: Scenario[] = [
  {
    id: "basic",
    label: "기본 실행 순서",
    code: `console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");`,
    steps: [
      {
        description:
          "스크립트 실행 시작 — 전역 실행 컨텍스트가 콜 스택에 푸시됩니다.",
        callStack: [{ label: "전역 실행 컨텍스트", color: COLORS.global }],
        microtaskQueue: [],
        taskQueue: [],
        console: [],
      },
      {
        description: 'console.log("1") 실행 — 동기 코드이므로 즉시 실행됩니다.',
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: 'console.log("1")', color: COLORS.log },
        ],
        microtaskQueue: [],
        taskQueue: [],
        console: ["1"],
      },
      {
        description:
          "setTimeout 호출 — 콜백을 Web API에 등록하고, 0ms 후 태스크 큐에 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "setTimeout(cb, 0)", color: COLORS.timeout },
        ],
        microtaskQueue: [],
        taskQueue: [{ label: 'cb: log("2")', color: COLORS.callback }],
        console: ["1"],
      },
      {
        description:
          "Promise.resolve().then() — 마이크로태스크 큐에 콜백이 등록됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "Promise.then(cb)", color: COLORS.promise },
        ],
        microtaskQueue: [{ label: 'cb: log("3")', color: COLORS.then }],
        taskQueue: [{ label: 'cb: log("2")', color: COLORS.callback }],
        console: ["1"],
      },
      {
        description: 'console.log("4") 실행 — 동기 코드이므로 즉시 실행됩니다.',
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: 'console.log("4")', color: COLORS.log },
        ],
        microtaskQueue: [{ label: 'cb: log("3")', color: COLORS.then }],
        taskQueue: [{ label: 'cb: log("2")', color: COLORS.callback }],
        console: ["1", "4"],
      },
      {
        description:
          "전역 컨텍스트 종료 — 콜 스택이 비었으므로 마이크로태스크 큐를 확인합니다.",
        callStack: [],
        microtaskQueue: [{ label: 'cb: log("3")', color: COLORS.then }],
        taskQueue: [{ label: 'cb: log("2")', color: COLORS.callback }],
        console: ["1", "4"],
      },
      {
        description:
          "마이크로태스크 실행 — Promise.then 콜백이 먼저 실행됩니다. (마이크로태스크 > 태스크)",
        callStack: [{ label: 'cb: log("3")', color: COLORS.then }],
        microtaskQueue: [],
        taskQueue: [{ label: 'cb: log("2")', color: COLORS.callback }],
        console: ["1", "4", "3"],
      },
      {
        description:
          "태스크 큐 실행 — setTimeout 콜백이 마지막으로 실행됩니다.",
        callStack: [{ label: 'cb: log("2")', color: COLORS.callback }],
        microtaskQueue: [],
        taskQueue: [],
        console: ["1", "4", "3", "2"],
      },
      {
        description:
          "완료! 최종 출력 순서: 1 → 4 → 3 → 2. 동기 → 마이크로태스크 → 매크로태스크 순입니다.",
        callStack: [],
        microtaskQueue: [],
        taskQueue: [],
        console: ["1", "4", "3", "2"],
      },
    ],
  },
  {
    id: "timeout-vs-promise",
    label: "setTimeout vs Promise",
    code: `setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => {
    console.log("promise inside timeout");
  });
}, 0);

setTimeout(() => {
  console.log("timeout 2");
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
});

console.log("sync");`,
    steps: [
      {
        description:
          "스크립트 실행 시작 — 전역 실행 컨텍스트가 콜 스택에 올라갑니다.",
        callStack: [{ label: "전역 실행 컨텍스트", color: COLORS.global }],
        microtaskQueue: [],
        taskQueue: [],
        console: [],
      },
      {
        description: "첫 번째 setTimeout 등록 — 콜백이 태스크 큐에 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "setTimeout(cb1, 0)", color: COLORS.timeout },
        ],
        microtaskQueue: [],
        taskQueue: [{ label: "cb1: timeout 1", color: COLORS.callback }],
        console: [],
      },
      {
        description:
          "두 번째 setTimeout 등록 — 두 번째 콜백도 태스크 큐에 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "setTimeout(cb2, 0)", color: COLORS.timeout },
        ],
        microtaskQueue: [],
        taskQueue: [
          { label: "cb1: timeout 1", color: COLORS.callback },
          { label: "cb2: timeout 2", color: COLORS.callback },
        ],
        console: [],
      },
      {
        description:
          "Promise.then 등록 — 마이크로태스크 큐에 콜백이 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "Promise.then(cb)", color: COLORS.promise },
        ],
        microtaskQueue: [{ label: "cb: promise 1", color: COLORS.then }],
        taskQueue: [
          { label: "cb1: timeout 1", color: COLORS.callback },
          { label: "cb2: timeout 2", color: COLORS.callback },
        ],
        console: [],
      },
      {
        description: 'console.log("sync") 실행 — 동기 코드가 즉시 실행됩니다.',
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: 'console.log("sync")', color: COLORS.log },
        ],
        microtaskQueue: [{ label: "cb: promise 1", color: COLORS.then }],
        taskQueue: [
          { label: "cb1: timeout 1", color: COLORS.callback },
          { label: "cb2: timeout 2", color: COLORS.callback },
        ],
        console: ["sync"],
      },
      {
        description:
          '전역 종료 → 마이크로태스크 실행 — "promise 1"이 출력됩니다.',
        callStack: [{ label: "cb: promise 1", color: COLORS.then }],
        microtaskQueue: [],
        taskQueue: [
          { label: "cb1: timeout 1", color: COLORS.callback },
          { label: "cb2: timeout 2", color: COLORS.callback },
        ],
        console: ["sync", "promise 1"],
      },
      {
        description:
          '첫 번째 태스크 실행 — "timeout 1" 출력 후, 내부 Promise.then이 마이크로태스크 큐에 등록됩니다.',
        callStack: [{ label: "cb1: timeout 1", color: COLORS.callback }],
        microtaskQueue: [{ label: "cb: promise inside", color: COLORS.then }],
        taskQueue: [{ label: "cb2: timeout 2", color: COLORS.callback }],
        console: ["sync", "promise 1", "timeout 1"],
      },
      {
        description:
          '태스크 사이 마이크로태스크 실행 — "promise inside timeout"이 timeout 2보다 먼저 실행됩니다!',
        callStack: [{ label: "cb: promise inside", color: COLORS.then }],
        microtaskQueue: [],
        taskQueue: [{ label: "cb2: timeout 2", color: COLORS.callback }],
        console: ["sync", "promise 1", "timeout 1", "promise inside timeout"],
      },
      {
        description:
          '두 번째 태스크 실행 — "timeout 2"가 마지막으로 출력됩니다.',
        callStack: [{ label: "cb2: timeout 2", color: COLORS.callback }],
        microtaskQueue: [],
        taskQueue: [],
        console: [
          "sync",
          "promise 1",
          "timeout 1",
          "promise inside timeout",
          "timeout 2",
        ],
      },
      {
        description:
          "완료! 핵심: 각 매크로태스크 사이에 마이크로태스크 큐가 완전히 비워집니다.",
        callStack: [],
        microtaskQueue: [],
        taskQueue: [],
        console: [
          "sync",
          "promise 1",
          "timeout 1",
          "promise inside timeout",
          "timeout 2",
        ],
      },
    ],
  },
  {
    id: "complex",
    label: "복합 예제",
    code: `console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("promise 2");
  });

queueMicrotask(() => {
  console.log("microtask");
});

console.log("end");`,
    steps: [
      {
        description: "스크립트 시작 — 전역 컨텍스트가 콜 스택에 올라갑니다.",
        callStack: [{ label: "전역 실행 컨텍스트", color: COLORS.global }],
        microtaskQueue: [],
        taskQueue: [],
        console: [],
      },
      {
        description: 'console.log("start") — 동기 코드 즉시 실행.',
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: 'console.log("start")', color: COLORS.log },
        ],
        microtaskQueue: [],
        taskQueue: [],
        console: ["start"],
      },
      {
        description: "setTimeout 등록 — 콜백이 태스크 큐에 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "setTimeout(cb, 0)", color: COLORS.timeout },
        ],
        microtaskQueue: [],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start"],
      },
      {
        description:
          "Promise 체인 등록 — 첫 번째 .then 콜백이 마이크로태스크 큐에 추가됩니다.",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "Promise.then(cb)", color: COLORS.promise },
        ],
        microtaskQueue: [{ label: "cb: promise 1", color: COLORS.then }],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start"],
      },
      {
        description:
          "queueMicrotask 등록 — 마이크로태스크 큐에 추가됩니다. (Promise.then과 같은 큐!)",
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: "queueMicrotask(cb)", color: COLORS.queueMicrotask },
        ],
        microtaskQueue: [
          { label: "cb: promise 1", color: COLORS.then },
          { label: "cb: microtask", color: COLORS.queueMicrotask },
        ],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start"],
      },
      {
        description: 'console.log("end") — 동기 코드 즉시 실행.',
        callStack: [
          { label: "전역 실행 컨텍스트", color: COLORS.global },
          { label: 'console.log("end")', color: COLORS.log },
        ],
        microtaskQueue: [
          { label: "cb: promise 1", color: COLORS.then },
          { label: "cb: microtask", color: COLORS.queueMicrotask },
        ],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start", "end"],
      },
      {
        description:
          '전역 종료 → 마이크로태스크 실행 시작. "promise 1" 출력, return Promise.resolve()로 promise 2가 큐에 등록.',
        callStack: [{ label: "cb: promise 1", color: COLORS.then }],
        microtaskQueue: [
          { label: "cb: microtask", color: COLORS.queueMicrotask },
          { label: "cb: promise 2", color: COLORS.then },
        ],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start", "end", "promise 1"],
      },
      {
        description:
          'queueMicrotask 콜백 실행 — "microtask" 출력. 마이크로태스크는 FIFO 순서로 실행됩니다.',
        callStack: [{ label: "cb: microtask", color: COLORS.queueMicrotask }],
        microtaskQueue: [{ label: "cb: promise 2", color: COLORS.then }],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start", "end", "promise 1", "microtask"],
      },
      {
        description:
          "promise 2 실행 — 마이크로태스크 큐가 완전히 비워질 때까지 계속 실행됩니다.",
        callStack: [{ label: "cb: promise 2", color: COLORS.then }],
        microtaskQueue: [],
        taskQueue: [{ label: "cb: timeout", color: COLORS.callback }],
        console: ["start", "end", "promise 1", "microtask", "promise 2"],
      },
      {
        description: '태스크 큐 실행 — "timeout"이 마지막으로 출력됩니다.',
        callStack: [{ label: "cb: timeout", color: COLORS.callback }],
        microtaskQueue: [],
        taskQueue: [],
        console: [
          "start",
          "end",
          "promise 1",
          "microtask",
          "promise 2",
          "timeout",
        ],
      },
      {
        description:
          "완료! queueMicrotask와 Promise.then은 같은 마이크로태스크 큐를 공유합니다.",
        callStack: [],
        microtaskQueue: [],
        taskQueue: [],
        console: [
          "start",
          "end",
          "promise 1",
          "microtask",
          "promise 2",
          "timeout",
        ],
      },
    ],
  },
];
