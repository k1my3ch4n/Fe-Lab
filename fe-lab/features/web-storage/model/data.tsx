import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "localStorage CRUD",
    code: `// 저장
localStorage.setItem('user', JSON.stringify({
  name: '김개발',
  theme: 'dark'
}));

// 조회
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.name); // '김개발'

// 수정
user.theme = 'light';
localStorage.setItem('user', JSON.stringify(user));

// 삭제
localStorage.removeItem('user');

// 전체 삭제
localStorage.clear();

// 저장된 항목 수
console.log(localStorage.length);

// 키 순회
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}`,
  },
  {
    title: "sessionStorage 활용",
    code: `// sessionStorage — 탭/세션 단위 임시 저장
// 폼 입력값 임시 저장 (새로고침 시 복원)
function saveFormDraft(formData: Record<string, string>) {
  sessionStorage.setItem('formDraft', JSON.stringify(formData));
}

function loadFormDraft() {
  const draft = sessionStorage.getItem('formDraft');
  return draft ? JSON.parse(draft) : null;
}

// 페이지 방문 기록 (탭 내에서만 유지)
function trackPageVisit(page: string) {
  const visits = JSON.parse(
    sessionStorage.getItem('visits') || '[]'
  );
  visits.push({ page, time: Date.now() });
  sessionStorage.setItem('visits', JSON.stringify(visits));
}

// 탭 종료 시 자동 삭제됨 — 따로 cleanup 불필요`,
  },
  {
    title: "IndexedDB 기본",
    code: `// IndexedDB — 대용량 구조화 데이터 비동기 저장
function openDB(name: string, version = 1) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// CRUD 작업
async function addItem(db: IDBDatabase, item: object) {
  const tx = db.transaction('items', 'readwrite');
  tx.objectStore('items').add(item);
  return new Promise(resolve => {
    tx.oncomplete = resolve;
  });
}

async function getItem(db: IDBDatabase, id: string) {
  const tx = db.transaction('items', 'readonly');
  const request = tx.objectStore('items').get(id);
  return new Promise(resolve => {
    request.onsuccess = () => resolve(request.result);
  });
}

// 사용 예시
const db = await openDB('myApp');
await addItem(db, { id: '1', name: '할 일', done: false });
const item = await getItem(db, '1');`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "localStorage와 sessionStorage의 차이점은 무엇인가요?",
    answer: (
      <>
        <strong>수명</strong>: <InlineCode>localStorage</InlineCode>는
        명시적으로 삭제하지 않는 한 영구적으로 유지되고,{" "}
        <InlineCode>sessionStorage</InlineCode>는 탭/세션 종료 시 자동
        삭제됩니다.
        <br />
        <strong>공유 범위</strong>: <InlineCode>localStorage</InlineCode>는 같은
        출처(origin)의 모든 탭에서 공유되고,{" "}
        <InlineCode>sessionStorage</InlineCode>는 해당 탭에서만 접근 가능합니다.
        <br />
        <strong>공통점</strong>: 둘 다 동기 API이며, 문자열만 저장 가능하고, 약
        5~10MB의 용량 제한이 있습니다.
      </>
    ),
  },
  {
    question: "Web Storage의 용량 제한과 초과 시 어떻게 되나요?",
    answer: (
      <>
        <InlineCode>localStorage</InlineCode>와{" "}
        <InlineCode>sessionStorage</InlineCode>는 브라우저별로 약{" "}
        <strong>5~10MB</strong>의 용량 제한이 있습니다. 초과 시{" "}
        <InlineCode>QuotaExceededError</InlineCode> 예외가 발생합니다.{" "}
        <InlineCode>IndexedDB</InlineCode>는 수백 MB에서 디스크 공간의 일정
        비율까지 사용 가능합니다. 대용량 데이터가 필요하면 IndexedDB를, 간단한
        키-값은 localStorage를 사용하는 것이 적합합니다.
      </>
    ),
  },
  {
    question: "Web Storage 사용 시 보안 고려사항은 무엇인가요?",
    answer: (
      <>
        1. <strong>XSS 취약점</strong> — JavaScript로 직접 접근 가능하므로 XSS
        공격 시 모든 데이터가 노출됩니다. 민감한 데이터(토큰, 비밀번호)는
        저장하지 않아야 합니다.
        <br />
        2. <strong>동일 출처 정책</strong> — 같은 origin에서만 접근 가능하지만,
        서브도메인 간 공유는 불가합니다.
        <br />
        3. <strong>암호화 없음</strong> — 평문으로 저장되므로 개발자 도구에서
        누구나 읽을 수 있습니다.
        <br />
        4. <strong>대안</strong> — 인증 토큰은 <InlineCode>HttpOnly</InlineCode>{" "}
        쿠키에 저장하는 것이 더 안전합니다.
      </>
    ),
  },
];
