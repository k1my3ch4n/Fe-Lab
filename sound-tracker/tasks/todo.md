# AI Action Tracker — Todo

## Phase 1: 프로젝트 초기 세팅
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 설치 및 설정
- [ ] Zustand, Groq SDK 패키지 설치
- [ ] `manifest.json` 작성 (Side Panel, Popup 권한 포함)
- [ ] `vite.config.ts` 크롬 익스텐션 빌드 설정
- [ ] FSD 디렉토리 구조 스캐폴딩

## Phase 2: shared 레이어
- [ ] `shared/api` — Groq API 클라이언트 (Whisper STT, Llama 3 호출)
- [ ] `shared/lib` — Web Audio API 헬퍼 (MediaRecorder 래퍼, chunk 처리)
- [ ] `shared/ui` — 기본 컴포넌트 (Button, Badge)

## Phase 3: entities 레이어
- [ ] `entities/action-item/model` — ActionItem 타입 정의 + Zustand store
- [ ] `entities/action-item/ui` — 기본 ActionItem 카드 컴포넌트
- [ ] `entities/audio-stream/model` — 녹음 상태 store (idle / recording / processing)

## Phase 4: features 레이어
- [ ] `features/record-audio` — 마이크 권한 요청, 녹음 시작/중지, chunk 스트리밍
- [ ] `features/extract-action-item` — chunk → Whisper STT → Llama 3 파싱 → store 저장

## Phase 5: widgets 레이어
- [ ] `widgets/action-item-card-list` — ActionItem 목록 렌더링
- [ ] `widgets/audio-visualizer` — 실시간 음성 파형 시각화

## Phase 6: pages 레이어
- [ ] `pages/sidepanel` — 메인 대시보드 (Visualizer + CardList + 녹음 컨트롤)
- [ ] `pages/popup` — 간단한 상태 표시 및 녹음 토글

## Phase 7: 통합 및 검증
- [ ] 발화 → 카드 생성 E2E 흐름 확인 (목표: 2초 이내)
- [ ] 크롬 익스텐션 로컬 로드 테스트
- [ ] 엣지 케이스 처리 (마이크 권한 거부, API 오류)
