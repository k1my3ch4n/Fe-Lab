import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "DOM 접근",
    code: `import { useRef, useEffect } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);

  const handlePlay = () => videoRef.current.play();
  const handlePause = () => videoRef.current.pause();

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={handlePlay}>재생</button>
      <button onClick={handlePause}>일시정지</button>
    </div>
  );
}

// 여러 요소에 ref 배열 사용
function ItemList({ items }) {
  const itemsRef = useRef(new Map());

  const scrollToItem = (id) => {
    itemsRef.current.get(id)?.scrollIntoView({
      behavior: 'smooth', block: 'nearest'
    });
  };

  return items.map(item => (
    <div key={item.id}
      ref={(node) => {
        if (node) itemsRef.current.set(item.id, node);
        else itemsRef.current.delete(item.id);
      }}
    >
      {item.name}
    </div>
  ));
}`,
  },
  {
    title: "이전 값 저장",
    code: `import { useRef, useEffect } from 'react';

// 커스텀 훅: 이전 렌더링의 값을 기억
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function PriceDisplay({ price }) {
  const prevPrice = usePrevious(price);
  const diff = prevPrice !== undefined ? price - prevPrice : 0;

  return (
    <div>
      <span>{price}원</span>
      {diff > 0 && <span style={{ color: 'red' }}>▲ +{diff}</span>}
      {diff < 0 && <span style={{ color: 'blue' }}>▼ {diff}</span>}
    </div>
  );
}`,
  },
  {
    title: "리렌더링 없는 값 관리",
    code: `import { useRef, useEffect, useState } from 'react';

// 타이머 ID 저장 — 리렌더링 불필요
function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // 중복 방지
    intervalRef.current = setInterval(() => {
      setTime(t => t + 10);
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <span>{(time / 1000).toFixed(2)}초</span>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
    </div>
  );
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "useRef의 동작 원리를 설명해주세요.",
    answer: (
      <>
        <InlineCode>useRef</InlineCode>는{" "}
        <InlineCode>{`{ current: initialValue }`}</InlineCode> 객체를
        반환합니다. 이 객체는{" "}
        <strong>컴포넌트의 전체 생명주기 동안 유지</strong>되며,
        <InlineCode>.current</InlineCode> 속성을 변경해도{" "}
        <strong>리렌더링이 발생하지 않습니다</strong>. React는 매 렌더링마다
        동일한 ref 객체를 반환하므로, 렌더링 사이에 값을 유지하는 데 적합합니다.
      </>
    ),
  },
  {
    question: "useRef와 useState의 차이점은?",
    answer: (
      <>
        <strong>useState</strong>: 값 변경 시 리렌더링을 트리거합니다. UI에
        표시되는 상태에 사용합니다.
        <strong> useRef</strong>: 값 변경 시 리렌더링이 발생하지 않습니다. DOM
        참조, 타이머 ID, 이전 값 저장 등 <strong>렌더링과 무관한 값</strong>을
        관리할 때 사용합니다.
        <br />
        <br />
        핵심 차이: <InlineCode>useState</InlineCode>의 setter는 비동기적으로
        상태를 업데이트하고 리렌더링을 예약하지만,
        <InlineCode>useRef</InlineCode>의 <InlineCode>.current</InlineCode>{" "}
        변경은 즉시 반영되며 리렌더링하지 않습니다.
      </>
    ),
  },
  {
    question: "useRef를 사용하는 대표적인 경우를 설명해주세요.",
    answer: (
      <>
        1. <strong>DOM 요소 접근</strong> — input 포커스, 스크롤, 비디오 제어 등{" "}
        2. <strong>타이머/인터벌 ID 저장</strong> — clearInterval/clearTimeout에
        필요한 ID 3. <strong>이전 렌더링 값 저장</strong> — usePrevious 커스텀
        훅 4. <strong>렌더링과 무관한 가변 값</strong> — 마운트 여부 추적, 렌더
        횟수 카운팅 5. <strong>외부 라이브러리 인스턴스 저장</strong> — 차트, 맵
        등의 인스턴스 참조
      </>
    ),
  },
];
