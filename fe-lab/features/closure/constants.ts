export interface ScopeBlock {
  name: string;
  variables: { name: string; value: string }[];
  color: string;
}

export const CLOSURE_EXAMPLES = [
  {
    id: "counter",
    label: "카운터",
    code: `function createCounter() {
  let count = 0;        // 외부 함수의 지역 변수
  return function() {   // 클로저: count를 기억
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3`,
    scopes: [
      {
        name: "Global Scope",
        variables: [{ name: "counter", value: "ƒ (closure)" }],
        color: "#00e5ff",
      },
      {
        name: "createCounter Scope",
        variables: [{ name: "count", value: "0" }],
        color: "#b388ff",
      },
      {
        name: "Inner Function (Closure)",
        variables: [{ name: "[[Scope]]", value: "→ count" }],
        color: "#00e676",
      },
    ] as ScopeBlock[],
  },
  {
    id: "private",
    label: "프라이빗 변수",
    code: `function createWallet(initial) {
  let balance = initial;  // 외부에서 접근 불가

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const wallet = createWallet(1000);
wallet.deposit(500);    // 1500
wallet.getBalance();    // 1500
// wallet.balance → undefined (접근 불가!)`,
    scopes: [
      {
        name: "Global Scope",
        variables: [{ name: "wallet", value: "{ deposit, getBalance }" }],
        color: "#00e5ff",
      },
      {
        name: "createWallet Scope",
        variables: [
          { name: "balance", value: "1000" },
          { name: "initial", value: "1000" },
        ],
        color: "#b388ff",
      },
      {
        name: "deposit / getBalance (Closures)",
        variables: [{ name: "[[Scope]]", value: "→ balance" }],
        color: "#00e676",
      },
    ] as ScopeBlock[],
  },
  {
    id: "loop",
    label: "루프 문제",
    code: `// ❌ 문제: 모두 3을 출력
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 3, 3, 3

// ✅ 해결 1: IIFE로 클로저 생성
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// 0, 1, 2

// ✅ 해결 2: let 사용 (블록 스코프)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 0, 1, 2`,
    scopes: [
      {
        name: "Global Scope",
        variables: [{ name: "i (var)", value: "3 (루프 종료 후)" }],
        color: "#00e5ff",
      },
      {
        name: "IIFE Scope (j=0)",
        variables: [{ name: "j", value: "0" }],
        color: "#ffb800",
      },
      {
        name: "IIFE Scope (j=1)",
        variables: [{ name: "j", value: "1" }],
        color: "#ff2d8a",
      },
      {
        name: "IIFE Scope (j=2)",
        variables: [{ name: "j", value: "2" }],
        color: "#b388ff",
      },
    ] as ScopeBlock[],
  },
];
