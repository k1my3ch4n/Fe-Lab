import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "리플로우 최적화",
    code: `// ❌ 리플로우가 여러 번 발생
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';

// ✅ cssText로 한 번에 변경 (리플로우 1회)
element.style.cssText = \`
  width: 100px;
  height: 200px;
  margin: 10px;
\`;

// ✅ 클래스로 일괄 변경 (리플로우 1회)
element.classList.add('new-layout');

// ✅ DocumentFragment 활용
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
list.appendChild(fragment); // DOM 조작 1회`,
  },
  {
    title: "requestAnimationFrame 활용",
    code: `// ❌ 강제 동기 레이아웃 (Layout Thrashing)
elements.forEach(el => {
  const height = el.offsetHeight;   // 강제 리플로우
  el.style.height = height * 2 + 'px'; // 스타일 변경
});

// ✅ 읽기/쓰기 분리 + rAF 활용
const heights = elements.map(el => el.offsetHeight);

requestAnimationFrame(() => {
  elements.forEach((el, i) => {
    el.style.height = heights[i] * 2 + 'px';
  });
});

// ✅ 애니메이션에 rAF 사용
function animate() {
  element.style.transform = \`translateX(\${x}px)\`;
  x += 2;
  if (x < 300) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`,
  },
  {
    title: "will-change와 레이어 승격",
    code: `/* ✅ will-change로 GPU 레이어 승격 */
.animated-element {
  will-change: transform, opacity;
  /* 브라우저가 별도 컴포지트 레이어를 생성
     → transform/opacity 변경 시
     리플로우/리페인트 없이 GPU에서 처리 */
}

/* ⚠️ 남용 주의: 메모리 소비 증가 */
.dont-do-this {
  will-change: all; /* 너무 광범위 */
}

/* ✅ 필요할 때만 적용 */
.card:hover {
  will-change: transform;
}
.card {
  transition: transform 0.3s ease;
}

/* ✅ contain으로 리플로우 범위 제한 */
.isolated-widget {
  contain: layout paint;
  /* 내부 변경이 외부에 영향을 주지 않음 */
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "리플로우(Reflow)와 리페인트(Repaint)의 차이는 무엇인가요?",
    answer: (
      <>
        <strong>리플로우</strong>는 요소의 기하학적 속성(위치, 크기)이 변경될 때
        레이아웃을 다시 계산하는 과정입니다. <InlineCode>width</InlineCode>,{" "}
        <InlineCode>height</InlineCode>, <InlineCode>margin</InlineCode>,{" "}
        <InlineCode>padding</InlineCode> 등이 트리거합니다.
        <br />
        <br />
        <strong>리페인트</strong>는 시각적 속성(색상, 배경)만 변경될 때 다시
        그리는 과정입니다. <InlineCode>color</InlineCode>,{" "}
        <InlineCode>background-color</InlineCode>,{" "}
        <InlineCode>box-shadow</InlineCode> 등이 트리거합니다. 리플로우는 항상
        리페인트를 수반하지만, 리페인트는 리플로우 없이 발생할 수 있습니다.
      </>
    ),
  },
  {
    question: "브라우저 렌더링 성능을 최적화하는 방법을 설명해주세요.",
    answer: (
      <>
        1. <strong>DOM 조작 최소화</strong> —{" "}
        <InlineCode>DocumentFragment</InlineCode>나{" "}
        <InlineCode>cssText</InlineCode>로 일괄 처리 2.{" "}
        <strong>강제 동기 레이아웃 방지</strong> — 읽기/쓰기를 분리하고{" "}
        <InlineCode>requestAnimationFrame</InlineCode>을 활용 3.{" "}
        <strong>컴포지트 속성 사용</strong> — <InlineCode>transform</InlineCode>
        과 <InlineCode>opacity</InlineCode>로 애니메이션 처리 4.{" "}
        <strong>will-change</strong>로 필요한 요소만 GPU 레이어로 승격 5.{" "}
        <InlineCode>contain</InlineCode> 속성으로 리플로우 범위를 제한
      </>
    ),
  },
  {
    question:
      "transform이 top/left보다 애니메이션 성능이 좋은 이유는 무엇인가요?",
    answer: (
      <>
        <InlineCode>top</InlineCode>/<InlineCode>left</InlineCode>는{" "}
        <strong>레이아웃 속성</strong>이므로 변경 시 리플로우 → 리페인트 →
        컴포지트 전체 파이프라인을 실행합니다.
        <br />
        <br />
        반면 <InlineCode>transform</InlineCode>은{" "}
        <strong>컴포지터 레이어</strong>에서 처리되어 Layout과 Paint 단계를
        완전히 건너뜁니다. GPU가 별도 레이어를 직접 이동/회전/확대하므로 메인
        스레드를 차단하지 않아 60fps를 안정적으로 유지할 수 있습니다.{" "}
        <InlineCode>opacity</InlineCode>도 같은 원리로 최적화됩니다.
      </>
    ),
  },
  {
    question: "웹 렌더링 성능 최적화를 위한 종합적인 기법을 설명해주세요.",
    answer: (
      <>
        1. <strong>DOM 조작 최소화</strong> — DocumentFragment 활용, 배치
        업데이트 2. <strong>강제 동기 레이아웃 회피</strong> — 읽기/쓰기 분리 (
        <InlineCode>offsetHeight</InlineCode> 읽기 후 스타일 변경) 3.{" "}
        <strong>합성 속성 사용</strong> — <InlineCode>transform</InlineCode>,{" "}
        <InlineCode>opacity</InlineCode>로 애니메이션 4.{" "}
        <strong>레이어 관리</strong> — <InlineCode>will-change</InlineCode>,{" "}
        <InlineCode>contain</InlineCode>으로 격리 5.{" "}
        <strong>가상 스크롤링</strong> — 대량 리스트 렌더링 시 화면 밖 요소 제거{" "}
        6. <strong>디바운스/쓰로틀</strong> — scroll, resize 이벤트 핸들링
        최적화 7. <InlineCode>requestAnimationFrame</InlineCode> — 프레임 단위
        작업 스케줄링
      </>
    ),
  },
  {
    question: "will-change 속성의 사용법과 주의사항은 무엇인가요?",
    answer: (
      <>
        <InlineCode>will-change</InlineCode>는 브라우저에{" "}
        <strong>어떤 속성이 변경될 예정인지 힌트</strong>를 줍니다. 브라우저는
        해당 요소를 별도 레이어로 승격시켜 GPU 가속을 준비합니다.
        <br />
        <br />
        <strong>사용법</strong>: 애니메이션 직전{" "}
        <InlineCode>will-change: transform</InlineCode> 설정, 완료 후 제거.
        <br />
        <br />
        <strong>주의사항</strong>: 1. <strong>남용 금지</strong> — 모든 요소에
        적용하면 메모리 과다 사용 (레이어마다 GPU 메모리 소비) 2.{" "}
        <strong>정적 선언 지양</strong> — CSS에 항상 두지 말고, JS로 동적
        적용/해제 3. 이미 합성 속성(<InlineCode>transform</InlineCode>)을 사용
        중이면 중복 불필요 4. 모바일 기기는 GPU 메모리가 제한적이므로 특히 주의
      </>
    ),
  },
];
