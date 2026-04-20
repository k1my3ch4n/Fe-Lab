import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "HTTPS 서버 설정 (Node.js)",
    code: `const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS!');
}).listen(443);`,
  },
  {
    title: "HTTP/2 서버 푸시",
    code: `const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
});

server.on('stream', (stream, headers) => {
  // 서버 푸시: HTML 요청 시 CSS도 함께 전송
  if (headers[':path'] === '/') {
    stream.pushStream(
      { ':path': '/style.css' },
      (err, pushStream) => {
        pushStream.respond({ ':status': 200 });
        pushStream.end(css);
      }
    );
    stream.respond({ ':status': 200 });
    stream.end(html);
  }
});`,
  },
  {
    title: "Keep-Alive 헤더 설정",
    code: `// HTTP/1.1 Keep-Alive 설정
// 요청 헤더
Connection: keep-alive
Keep-Alive: timeout=5, max=100

// 응답 헤더
Connection: keep-alive
Keep-Alive: timeout=5, max=100

// Node.js에서 설정
const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=100');
  res.end('OK');
});

// Keep-Alive: 같은 TCP 연결을 재사용하여
// 핸드셰이크 비용을 절감`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "HTTP와 HTTPS의 차이점은 무엇인가요?",
    answer: (
      <>
        HTTPS는 HTTP에 <strong>TLS(Transport Layer Security)</strong> 암호화
        계층을 추가한 프로토콜입니다. HTTP는 포트 80, HTTPS는 포트 443을
        사용합니다. HTTPS는 <strong>기밀성</strong>(데이터 암호화),{" "}
        <strong>무결성</strong>(변조 방지),
        <strong>인증</strong>(서버 신원 확인)을 제공합니다. Google은 HTTPS를 SEO
        랭킹 요소로 사용하며, 최신 브라우저는 HTTP 사이트에 &quot;안전하지
        않음&quot; 경고를 표시합니다.
      </>
    ),
  },
  {
    question: "HTTP/3의 QUIC 프로토콜이란 무엇인가요?",
    answer: (
      <>
        QUIC은 Google이 개발한 <strong>UDP 기반 전송 프로토콜</strong>입니다.
        TCP의 Head-of-Line 블로킹 문제를 해결하며, TLS 1.3이 내장되어
        <strong>0-RTT 연결</strong>이 가능합니다. 각 스트림이 독립적이므로
        하나의 패킷 손실이 다른 스트림에 영향을 주지 않습니다. HTTP/3는 QUIC
        위에서 동작하며, <InlineCode size="md">HTTP/2</InlineCode>의 멀티플렉싱
        장점을 유지하면서 연결 설정 시간을 대폭 줄입니다.
      </>
    ),
  },
  {
    question: "Keep-Alive 연결의 장점은 무엇인가요?",
    answer: (
      <>
        Keep-Alive는 <strong>하나의 TCP 연결을 여러 HTTP 요청에 재사용</strong>
        합니다. 매 요청마다 3-way handshake를 하지 않으므로{" "}
        <strong>연결 설정 비용이 절감</strong>됩니다. HTTP/1.1에서는 기본적으로
        활성화되며, <InlineCode size="md">Connection: keep-alive</InlineCode>{" "}
        헤더로 제어합니다.
        <InlineCode size="md">timeout</InlineCode>과{" "}
        <InlineCode size="md">max</InlineCode>
        파라미터로 유휴 시간과 최대 요청 수를 설정할 수 있습니다.
      </>
    ),
  },
  {
    question: "브라우저가 도메인마다 동시 연결 수를 제한하는 이유는?",
    answer: (
      <>
        서버 과부하를 방지하고 공정한 리소스 분배를 위해{" "}
        <strong>도메인당 보통 6개</strong>의 동시 TCP 연결로 제한합니다.
        HTTP/1.1에서는 이 제한을 우회하기 위해 <strong>도메인 샤딩</strong>(여러
        서브도메인 사용)을 활용했습니다. HTTP/2에서는 멀티플렉싱으로 하나의
        연결에서 다수의 요청을 동시 처리하므로 이 제한이 사실상 해소됩니다.
      </>
    ),
  },
];
