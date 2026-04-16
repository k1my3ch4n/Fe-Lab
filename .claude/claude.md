## 프로젝트 개요

프론트엔드 면접을 대비하기 위해서 CS 지식과 동작 방법 및 관련 지식을 정리하여 확인할 수 있는 웹 사이트입니다.

## 프로젝트 목표

- 프론트엔드 면접 대비 인터랙티브 학습 플랫폼

- CS 지식의 개념 설명, 동작 원리를 알기 위한 인터랙티브 데모, 코드 예시 제공

- 면접 핵심 질문 및 답변을 확인하고, 관련된 질의응답 진행 가능

## 디렉토리 구조 및 아키텍쳐 환경

- 상태관리 도구로 zustand 사용
- FSD 구조 세팅
- Nextjs 사용 및 vercel 을 이용한 간단배포

## 작업 규칙

### 토큰 절약 규칙

1. 이미 읽은 파일은 읽지 않는다.
2. 하나의 파일에 모든 것을 다 넣지 말고 모듈화한다.
3. 사용자가 이미 설명한 내용을 반복하지 않는다.
4. 많은 부분을 수정해야 한다면, 다시 물어보고 진행한다.
5. 요청이 명확하지 않을 때 추론 및 실행하지 말고 우선 설명을 제대로 이해했는지 말한다.

### 코딩 계획 규칙

1. 진행하는 phase의 계획을 todo.md 에서 확인하고 todo list 순서대로 진행한다.
2. todo.md 의 작업 내용이 명확하지 않은 경우, 설명을 제대로 이해했는지 말한다.
3. 작업이 변경된 경우, todo.md 도 함께 수정한다.

## 코딩 표준

### 변수명

- 콜백 파라미터는 축약하지 않고 의미있는 이름을 사용한다
  - `(r) => r.data` ❌ → `(response) => response.data` ✅
  - `arr.map((i) => i.name)` ❌ → `arr.map((item) => item.name)` ✅
  - `arr.filter((m) => m.active)` ❌ → `arr.filter((membership) => membership.active)` ✅
- 단, 관용적으로 허용되는 단일 문자 (`e` for event, `_` for ignored) 는 예외

### 제어 흐름

- if 문은 항상 중괄호를 사용한다 (한 줄이어도 예외 없음)
  - `if (a) return b` ❌
  - `if (a) { return b }` ✅
- 삼항 연산자는 허용하지만, 중첩은 금지

### 시멘틱 태그 설정

- <div> , <p> 등을 그냥 사용하는게 아닌, 시멘틱 태그를 적극적으로 사용한다.
- 예시

```
<article>, <aside> <details> <header> <footer> <main> <nav> <section> 등
```

## 스킬 목록

- pull-request
- design-prototype
- refactoring
- staging
