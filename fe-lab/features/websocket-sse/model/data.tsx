import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "WebSocket 기본 사용",
    code: `// WebSocket 클라이언트 연결
const ws = new WebSocket('wss://api.example.com/chat');

// 연결 성공
ws.onopen = () => {
  console.log('연결됨!');
  ws.send(JSON.stringify({
    type: 'join',
    room: 'chat-1'
  }));
};

// 메시지 수신
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('받은 메시지:', data);
};

// 연결 종료
ws.onclose = (event) => {
  console.log(\`연결 종료: \${event.code} \${event.reason}\`);
};

// 메시지 전송 (양방향!)
ws.send(JSON.stringify({ type: 'msg', text: '안녕!' }));`,
  },
  {
    title: "SSE (EventSource) 사용",
    code: `// SSE 클라이언트 — 서버에서 클라이언트로 단방향 스트리밍
const source = new EventSource('/api/events');

// 기본 메시지 수신
source.onmessage = (event) => {
  console.log('데이터:', event.data);
};

// 특정 이벤트 타입 수신
source.addEventListener('notification', (event) => {
  const data = JSON.parse(event.data);
  showNotification(data.title, data.body);
});

source.addEventListener('price', (event) => {
  const price = JSON.parse(event.data);
  updatePriceUI(price);
});

// 에러 처리 (자동 재연결 내장!)
source.onerror = () => {
  console.log('연결 끊김 — 자동 재연결 시도 중...');
};

// 서버 측 (Node.js Express)
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 이벤트 전송
  res.write('event: notification\\n');
  res.write('data: {"title":"알림","body":"새 메시지"}\\n\\n');
});`,
  },
  {
    title: "재연결과 에러 처리",
    code: `// WebSocket: 직접 재연결 로직 구현 필요
function createReconnectingWS(url, maxRetries = 5) {
  let retries = 0;
  let ws;

  function connect() {
    ws = new WebSocket(url);

    ws.onopen = () => {
      retries = 0;  // 연결 성공 시 리셋
      console.log('연결 성공!');
    };

    ws.onclose = () => {
      if (retries < maxRetries) {
        const delay = Math.min(1000 * 2 ** retries, 30000);
        console.log(\`\${delay}ms 후 재연결... (\${retries + 1}/\${maxRetries})\`);
        setTimeout(connect, delay);
        retries++;
      }
    };
  }

  connect();
  return { getWs: () => ws };
}

// SSE: 자동 재연결이 내장되어 있음!
const source = new EventSource('/events');
// 끊기면 브라우저가 알아서 재연결 시도
// Last-Event-ID 헤더로 마지막 수신 이벤트 추적

// 수동 종료만 필요
source.close();`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "WebSocket과 SSE의 핵심 차이점은 무엇인가요?",
    answer: (
      <>
        <strong>WebSocket</strong>은 <InlineCode>ws://</InlineCode> 프로토콜을
        사용하는 <strong>양방향(Full-Duplex) 통신</strong>입니다. 클라이언트와
        서버가 자유롭게 메시지를 주고받을 수 있습니다.
        <br />
        <br />
        <strong>SSE</strong>는 HTTP 기반의{" "}
        <strong>단방향(서버→클라이언트) 스트리밍</strong>입니다.{" "}
        <InlineCode>EventSource</InlineCode> API로 서버가 보내는 이벤트를
        수신합니다. SSE는 자동 재연결이 내장되어 있고, 기존 HTTP 인프라를 그대로
        활용할 수 있어 구현이 간단합니다. 반면 WebSocket은 양방향 통신이
        가능하지만 직접 재연결 로직을 구현해야 합니다.
      </>
    ),
  },
  {
    question: "WebSocket과 SSE를 각각 언제 사용하나요?",
    answer: (
      <>
        <strong>WebSocket</strong>: 채팅, 실시간 게임, 공동 편집 등{" "}
        <strong>클라이언트도 서버에 빈번하게 데이터를 보내야 하는</strong>{" "}
        경우에 적합합니다.
        <br />
        <br />
        <strong>SSE</strong>: 실시간 알림, 주식 시세, AI 응답 스트리밍 등{" "}
        <strong>서버에서 클라이언트로 일방적으로 데이터를 푸시하는</strong>{" "}
        경우에 적합합니다. ChatGPT의 응답 스트리밍도 SSE를 사용합니다.
        <br />
        <br />
        선택 기준: 클라이언트가 서버에 자주 데이터를 보내야 하면 WebSocket,
        서버의 이벤트를 수신만 하면 SSE를 선택합니다.
      </>
    ),
  },
  {
    question: "Long Polling과 WebSocket/SSE의 차이를 설명해주세요.",
    answer: (
      <>
        <strong>Long Polling</strong>은 클라이언트가 HTTP 요청을 보내고, 서버가
        새 데이터가 있을 때까지 <strong>응답을 보류</strong>하는 방식입니다.
        데이터가 오면 응답 후 클라이언트가 즉시 다시 요청합니다.
        <br />
        <br />
        문제점: 매 응답마다 <strong>HTTP 헤더 오버헤드</strong>가 발생하고,
        서버가 대기 연결을 유지해야 하므로 리소스가 낭비됩니다.
        <br />
        <br />
        WebSocket/SSE는 <strong>하나의 연결을 유지</strong>하며 데이터를
        주고받으므로 헤더 오버헤드가 없고 지연 시간이 안정적입니다. Long
        Polling은 WebSocket/SSE를 사용할 수 없는 환경에서의{" "}
        <strong>폴백(Fallback)</strong> 용도로 사용합니다.
      </>
    ),
  },
];
