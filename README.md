# Fe-Lab

프론트엔드 면접 대비를 위한 인터랙티브 학습 플랫폼입니다.
CS 지식의 개념 설명, 동작 원리 데모, 코드 예시, 면접 핵심 Q&A를 제공합니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Syntax Highlight | Shiki, react-syntax-highlighter |
| Architecture | FSD (Feature-Sliced Design) |
| Deploy | Vercel |

## 시작하기

```bash
cd fe-lab
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## 폴더 구조

FSD(Feature-Sliced Design) 아키텍처를 기반으로 구성되어 있습니다.

```
fe-lab/
├── app/                    # Next.js App Router (pages, layout)
│   └── topics/             # 각 CS 토픽 페이지
├── widgets/                # 독립적인 UI 블록
│   ├── sidebar/
│   └── topbar/
├── features/               # 비즈니스 기능 단위
├── entities/               # 도메인 엔티티
│   └── topic/
└── shared/                 # 공통 유틸·훅·컴포넌트
    ├── config/
    ├── hooks/
    ├── lib/
    ├── stores/
    └── ui/
```

## 다루는 CS 토픽

### JavaScript / TypeScript
| 토픽 | 설명 |
|------|------|
| Closure | 클로저의 개념과 활용 |
| Prototype Chain | 프로토타입 체인과 상속 |
| Scope & Context | 스코프와 실행 컨텍스트 |
| Promise | 비동기 처리와 Promise |
| Event Loop | 이벤트 루프 동작 원리 |
| Currying & Composition | 함수형 프로그래밍 기법 |
| Debounce & Throttle | 성능 최적화 기법 |
| Deep & Shallow Copy | 깊은 복사와 얕은 복사 |
| Generics | TypeScript 제네릭 |
| Type Guard | TypeScript 타입 가드 |
| Memory Management | 메모리 관리와 GC |

### React
| 토픽 | 설명 |
|------|------|
| Hooks & Lifecycle | React 훅과 생명주기 |
| Virtual DOM | 가상 DOM 동작 원리 |
| Reconciliation | 재조정 알고리즘 |
| React Memo | 메모이제이션 최적화 |
| useRef | useRef 활용법 |
| State Management | 상태 관리 패턴 |
| Server Components | React Server Components |
| Suspense & Error Boundary | 비동기 UI 처리 |
| Rendering Patterns | 렌더링 패턴 비교 |

### 브라우저 / 웹 성능
| 토픽 | 설명 |
|------|------|
| Event Bubbling | 이벤트 버블링과 캡처링 |
| Rendering Pipeline | 브라우저 렌더링 파이프라인 |
| Critical Rendering Path | 크리티컬 렌더링 패스 |
| Reflow & Repaint | 리플로우와 리페인트 |
| Intersection Observer | IntersectionObserver API |
| Web Worker | 웹 워커 활용 |
| Web Storage | localStorage / sessionStorage |

### 네트워크 / 보안
| 토픽 | 설명 |
|------|------|
| HTTP Protocol | HTTP 프로토콜 기초 |
| HTTP Cache | 브라우저 캐싱 전략 |
| CORS | Cross-Origin Resource Sharing |
| Cookie & Session | 쿠키와 세션 인증 |
| Auth Strategy | 인증 전략 비교 |
| WebSocket & SSE | 실시간 통신 방식 |
| XSS & CSRF | 웹 보안 취약점 |
| GraphQL & REST | API 설계 패턴 |
| CDN | CDN 동작 원리 |
| Network Debugging | 네트워크 디버깅 |

### CSS / 레이아웃
| 토픽 | 설명 |
|------|------|
| Flexbox & Grid | CSS 레이아웃 시스템 |
| Responsive Design | 반응형 디자인 |
| Web Accessibility | 웹 접근성 |

### 개발 도구 / 환경
| 토픽 | 설명 |
|------|------|
| Module Bundling | 번들러 동작 원리 |

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```
