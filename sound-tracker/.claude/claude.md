## 프로젝트 개요

- 프로젝트 명: AI Action Tracker (가제)

- 기술 스택: React, Vite, Tailwind CSS, TypeScript, Zustand, Groq API (Whisper & Llama 3)

- 아키텍처: Feature-Sliced Design (FSD)

- 형태: 크롬 익스텐션 (Side Panel 및 Popup 활용)

- 핵심 기능: 사용자의 음성을 실시간으로 캡처하여 Groq API를 통해 STT(음성-텍스트 변환)를 수행하고, LLM이 회의 내용 중 'Action Item(할 일)'을 추출하여 대시보드에 시각화.

## 프로젝트 목표

- 실시간성 확보: Groq API의 초고속 추론 성능을 활용하여 발화 후 2초 이내에 액션 아이템 카드 생성.

- 사용자 편의성: 크롬 사이드 패널을 활용해 웹 서핑이나 화상 회의 중에도 끊김 없는 UX 제공.

기술적 도전:

- Web Audio API를 이용한 효율적인 스트리밍 데이터 처리.

- FSD 구조를 적용한 확장 가능하고 깔끔한 프론트엔드 코드베이스 구축.

- Zustand를 통한 실시간 음성 상태 및 추출된 데이터 관리.

## 디렉토리 구조 및 아키텍쳐 환경

Vite 기반의 크롬 익스텐션 구조에 FSD(Feature-Sliced Design)를 접목한 구조입니다.

```
/
├── public/                # 익스텐션 아이콘, 정적 자산
├── src/
│   ├── app/               # 애플리케이션 진입점 (Provider, 전역 스타일)
│   ├── processes/         # (선택) 워크플로우 관련 로직
│   ├── pages/             # 익스텐션 페이지 (SidePanel, Popup, Options)
│   │   ├── sidepanel/
│   │   └── popup/
│   ├── widgets/           # 독립적인 큰 UI 블록 (ActionItemCardList, AudioVisualizer 등)
│   ├── features/          # 사용자 상호작용 로직 (StartRecording, ExportToMarkdown 등)
│   │   ├── record-audio/
│   │   └── extract-action-item/
│   ├── entities/          # 비즈니스 엔티티 (ActionItem, UserData)
│   │   ├── action-item/
│   │   │   ├── model/     # Zustand store, types
│   │   │   └── ui/        # 기본 카드 UI
│   │   └── audio-stream/
│   ├── shared/            # 재사용 유틸리티, API 인스턴스, 공통 UI
│   │   ├── api/           # Groq API 호출 로직
│   │   ├── lib/           # Web Audio API 헬퍼, 유틸 함수
│   │   └── ui/            # 버튼, 입력창 등 기본 컴포넌트
│   ├── manifest.json      # 익스텐션 설정 파일
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
└── package.json
```
