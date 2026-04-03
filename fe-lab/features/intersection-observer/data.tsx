import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "기본 사용법",
    code: `// Intersection Observer 기본 사용법
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('요소가 뷰포트에 진입:', entry.target);
        console.log('교차 비율:', entry.intersectionRatio);
      }
    });
  },
  {
    root: null,         // 뷰포트 기준
    rootMargin: '0px',  // 감지 영역 확장/축소
    threshold: 0.5      // 50% 이상 보일 때 트리거
  }
);

// 관찰 시작
const target = document.querySelector('.target');
observer.observe(target);

// 관찰 중단
observer.unobserve(target);

// 모든 관찰 중단
observer.disconnect();`,
  },
  {
    title: "무한 스크롤 구현",
    code: `function useInfiniteScroll(loadMore: () => void) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return sentinelRef;
}

// 사용 예시
function Feed() {
  const sentinelRef = useInfiniteScroll(fetchNextPage);

  return (
    <div>
      {items.map(item => <Card key={item.id} {...item} />)}
      <div ref={sentinelRef} /> {/* 센티널 요소 */}
    </div>
  );
}`,
  },
  {
    title: "이미지 Lazy Loading",
    code: `function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // data-src를 src로 이동
          img.src = img.dataset.src || '';
          img.onload = () => setIsLoaded(true);
          observer.unobserve(img);
        }
      },
      { rootMargin: '200px' } // 200px 전에 미리 로딩
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={isLoaded ? 'loaded' : 'placeholder'}
    />
  );
}

// 네이티브 lazy loading (대안)
<img src="image.jpg" loading="lazy" alt="설명" />`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Intersection Observer란 무엇인가요?",
    answer: (
      <>
        Intersection Observer는{" "}
        <strong>
          대상 요소와 상위 요소 또는 뷰포트 간의 교차 영역 변화를 비동기적으로
          관찰
        </strong>
        하는 Web API입니다. <InlineCode>root</InlineCode>(감지 기준),{" "}
        <InlineCode>rootMargin</InlineCode>(감지 영역 확장),{" "}
        <InlineCode>threshold</InlineCode>(트리거 비율)를 옵션으로 설정할 수
        있습니다. 콜백은 메인 스레드와 별도로 비동기 실행되어 성능에 영향을 주지
        않습니다.
      </>
    ),
  },
  {
    question: "scroll 이벤트 대비 Intersection Observer의 장점은 무엇인가요?",
    answer: (
      <>
        1. <strong>성능</strong> — scroll 이벤트는 매 프레임마다 발생하여{" "}
        <InlineCode>getBoundingClientRect()</InlineCode> 호출 시 리플로우를
        유발하지만, IO는 브라우저가 최적화하여 비동기로 처리합니다.
        <br />
        2. <strong>throttle/debounce 불필요</strong> — 자체적으로 최적화된
        타이밍으로 콜백을 호출합니다.
        <br />
        3. <strong>선언적 API</strong> — observe/unobserve로 간단하게 관리할 수
        있습니다.
        <br />
        4. <strong>정확한 교차 비율</strong> — threshold 옵션으로 정확한 가시성
        비율을 감지합니다.
      </>
    ),
  },
  {
    question:
      "Intersection Observer를 활용한 lazy loading 구현 방법을 설명해주세요.",
    answer: (
      <>
        1. 이미지에 <InlineCode>data-src</InlineCode>에 실제 URL을 저장하고{" "}
        <InlineCode>src</InlineCode>는 placeholder로 설정합니다.
        <br />
        2. IO로 요소를 관찰하다가 뷰포트에 진입하면{" "}
        <InlineCode>data-src</InlineCode>를 <InlineCode>src</InlineCode>로
        복사합니다.
        <br />
        3. 로딩 완료 후 <InlineCode>unobserve()</InlineCode>로 감시를
        해제합니다.
        <br />
        4. <InlineCode>rootMargin: &apos;200px&apos;</InlineCode>으로 미리
        로딩하면 UX가 개선됩니다.
        <br />
        <br />
        대안으로 네이티브 <InlineCode>loading=&quot;lazy&quot;</InlineCode>{" "}
        속성도 사용 가능하지만, 커스텀 로딩 UI나 애니메이션이 필요할 때는 IO가
        더 적합합니다.
      </>
    ),
  },
];
