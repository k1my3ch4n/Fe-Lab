import type { DemoExample } from "./types";

export const DEMO_EXAMPLES: DemoExample[] = [
  {
    id: "currying",
    label: "커링",
    code: `// 커링: 인자를 하나씩 받는 함수 체인
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);  // a = 2 고정
const triple = multiply(3);  // a = 3 고정

double(5);  // 10
triple(5);  // 15

// 화살표 함수 버전
const multiply = a => b => a * b;`,
    steps: [
      {
        args: ["a = 2"],
        result: "(b) => 2 * b",
        description: "첫 번째 인자 적용 → 새로운 함수 반환",
      },
      {
        args: ["a = 2", "b = 5"],
        result: "10",
        description: "두 번째 인자 적용 → 최종 결과",
      },
    ],
    color: "#00e5ff",
  },
  {
    id: "partial",
    label: "부분 적용",
    code: `// 부분 적용: 일부 인자를 미리 고정
function createLogger(level) {
  return function(module) {
    return function(message) {
      console.log(\`[\${level}][\${module}] \${message}\`);
    };
  };
}

const errorLog = createLogger("ERROR");
const apiError = errorLog("API");

apiError("요청 실패");
// [ERROR][API] 요청 실패

apiError("타임아웃");
// [ERROR][API] 타임아웃`,
    steps: [
      {
        args: ['level = "ERROR"'],
        result: "(module) => ...",
        description: "레벨 고정 → 모듈 함수 반환",
      },
      {
        args: ['level = "ERROR"', 'module = "API"'],
        result: "(message) => ...",
        description: "모듈 고정 → 메시지 함수 반환",
      },
      {
        args: ['level = "ERROR"', 'module = "API"', 'message = "요청 실패"'],
        result: "[ERROR][API] 요청 실패",
        description: "모든 인자 적용 → 최종 실행",
      },
    ],
    color: "#b388ff",
  },
  {
    id: "pipe",
    label: "pipe / compose",
    code: `// pipe: 왼쪽에서 오른쪽으로 실행
const pipe = (...fns) =>
  (x) => fns.reduce((v, f) => f(v), x);

// compose: 오른쪽에서 왼쪽으로 실행
const compose = (...fns) =>
  (x) => fns.reduceRight((v, f) => f(v), x);

// 사용 예
const add10 = x => x + 10;
const multiply2 = x => x * 2;
const toString = x => \`결과: \${x}\`;

const process = pipe(add10, multiply2, toString);
process(5);
// 5 → 15 → 30 → "결과: 30"`,
    steps: [
      { args: ["x = 5"], result: "5", description: "초기값" },
      { args: ["add10(5)"], result: "15", description: "5 + 10 = 15" },
      { args: ["multiply2(15)"], result: "30", description: "15 * 2 = 30" },
      {
        args: ["toString(30)"],
        result: '"결과: 30"',
        description: "최종 문자열 변환",
      },
    ],
    color: "#00e676",
  },
  {
    id: "practical",
    label: "실전 활용",
    code: `// 데이터 파이프라인
const processUsers = pipe(
  filterActive,
  sortByName,
  take(10),
  formatForUI
);

// 이벤트 핸들러 합성
const handleSubmit = pipe(
  preventDefault,
  extractFormData,
  validate,
  submitToAPI
);

// 미들웨어 패턴
const withAuth = (handler) => (req, res) => {
  if (!req.user) return res.status(401);
  return handler(req, res);
};

const withLogging = (handler) => (req, res) => {
  console.log(\`\${req.method} \${req.url}\`);
  return handler(req, res);
};

const route = compose(withAuth, withLogging)(handler);`,
    steps: [
      {
        args: ["users"],
        result: "filterActive(users)",
        description: "활성 사용자 필터",
      },
      {
        args: ["filtered"],
        result: "sortByName(filtered)",
        description: "이름순 정렬",
      },
      {
        args: ["sorted"],
        result: "take(10)(sorted)",
        description: "상위 10명 추출",
      },
      {
        args: ["top10"],
        result: "formatForUI(top10)",
        description: "UI용 데이터 포맷",
      },
    ],
    color: "#ffb800",
  },
];

export const TABS = DEMO_EXAMPLES.map((x) => ({ id: x.id, label: x.label }));
