export interface BundleModule {
  name: string;
  size: number; // KB
  used: boolean;
  color: string;
}

export interface BundleExample {
  id: string;
  label: string;
  description: string;
  modules: BundleModule[];
  totalSize: number;
  optimizedSize: number;
}

export const BUNDLE_EXAMPLES: BundleExample[] = [
  {
    id: "tree-shaking",
    label: "트리 쉐이킹",
    description: "사용하지 않는 코드를 제거하여 번들 사이즈를 줄입니다.",
    modules: [
      { name: "add()", size: 2, used: true, color: "#00e676" },
      { name: "subtract()", size: 2, used: true, color: "#00e676" },
      { name: "multiply()", size: 3, used: false, color: "#ff2d8a" },
      { name: "divide()", size: 3, used: false, color: "#ff2d8a" },
      { name: "pow()", size: 4, used: false, color: "#ff2d8a" },
      { name: "sqrt()", size: 2, used: false, color: "#ff2d8a" },
    ],
    totalSize: 16,
    optimizedSize: 4,
  },
  {
    id: "code-splitting",
    label: "코드 스플릿팅",
    description: "필요한 코드만 로드하여 초기 로딩 속도를 개선합니다.",
    modules: [
      { name: "main.js", size: 50, used: true, color: "#00e5ff" },
      { name: "vendor.js", size: 120, used: true, color: "#b388ff" },
      { name: "dashboard.js", size: 80, used: false, color: "#ffb800" },
      { name: "settings.js", size: 40, used: false, color: "#ffb800" },
      { name: "analytics.js", size: 60, used: false, color: "#ffb800" },
    ],
    totalSize: 350,
    optimizedSize: 170,
  },
  {
    id: "esm-vs-cjs",
    label: "ESM vs CJS",
    description: "ES Modules는 정적 분석이 가능하여 트리 쉐이킹에 유리합니다.",
    modules: [
      { name: "ESM import", size: 4, used: true, color: "#00e676" },
      { name: "ESM (dead code)", size: 12, used: false, color: "#00e676" },
      { name: "CJS require", size: 16, used: true, color: "#ff2d8a" },
      { name: "CJS (전체 포함)", size: 0, used: false, color: "#ff2d8a" },
    ],
    totalSize: 32,
    optimizedSize: 4,
  },
];
