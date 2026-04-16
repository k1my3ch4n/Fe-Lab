import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "REST 엔드포인트 vs GraphQL 쿼리",
    code: `// REST: 여러 엔드포인트
GET /api/users/1
GET /api/users/1/posts
GET /api/users/1/followers
DELETE /api/posts/42

// GraphQL: 단일 엔드포인트
POST /graphql
{
  "query": \`
    query GetUser($id: ID!) {
      user(id: $id) {
        name
        email
        posts { title, createdAt }
        followers { name }
      }
    }
  \`,
  "variables": { "id": "1" }
}`,
  },
  {
    title: "GraphQL Mutation",
    code: `// GraphQL Mutation (데이터 변경)
mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    author {
      name
    }
  }
}

// 변수
{
  "input": {
    "title": "GraphQL 입문",
    "content": "GraphQL은 API 쿼리 언어입니다.",
    "authorId": "1"
  }
}

// 응답 — 생성된 데이터를 즉시 반환
{
  "data": {
    "createPost": {
      "id": "42",
      "title": "GraphQL 입문",
      "author": { "name": "Kim" }
    }
  }
}`,
  },
  {
    title: "GraphQL Subscription (실시간)",
    code: `// GraphQL Subscription — WebSocket 기반 실시간 데이터
subscription OnNewMessage($roomId: ID!) {
  messageAdded(roomId: $roomId) {
    id
    text
    sender {
      name
      avatar
    }
    createdAt
  }
}

// 클라이언트 (Apollo Client)
const { data, loading } = useSubscription(
  ON_NEW_MESSAGE,
  { variables: { roomId: '1' } }
);

// 서버 (Apollo Server)
const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: (_, { roomId }) =>
        pubsub.asyncIterator(\`ROOM_\${roomId}\`),
    },
  },
};`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "GraphQL과 REST API의 차이점은 무엇인가요?",
    answer: (
      <>
        REST는 <strong>리소스 기반 URL</strong>과 HTTP 메서드로 CRUD를 수행하며,
        서버가 응답 구조를 결정합니다. GraphQL은{" "}
        <strong>단일 엔드포인트</strong>에서 클라이언트가 필요한 데이터 구조를
        쿼리로 지정합니다. REST는 Over-fetching/Under-fetching 문제가 있지만
        HTTP 캐싱이 용이하고, GraphQL은 정확한 데이터만 받지만 캐싱에 추가
        전략이 필요합니다.
      </>
    ),
  },
  {
    question: "GraphQL의 장단점을 설명해주세요.",
    answer: (
      <>
        <strong>장점:</strong> 1. 필요한 데이터만 요청 (네트워크 효율) 2. 스키마
        기반 타입 시스템으로 자동 문서화 3. 단일 요청으로 관련 데이터 조회 4.{" "}
        <InlineCode size="md">Subscription</InlineCode>으로 실시간 기능 내장.
        <br />
        <br />
        <strong>단점:</strong> 1. 학습 곡선이 높음 2. HTTP 캐싱 활용 어려움 3.
        파일 업로드 처리 복잡 4. N+1 문제 발생 가능 (DataLoader로 해결).
      </>
    ),
  },
  {
    question: "GraphQL의 N+1 문제란 무엇인가요?",
    answer: (
      <>
        중첩된 관계를 조회할 때 부모 N개에 대해 각각 자식 쿼리가 실행되어
        <strong>총 N+1번</strong>의 데이터베이스 조회가 발생하는 문제입니다.
        예를 들어 10명의 사용자와 각각의 게시글을 조회하면 1(users) + 10(posts)
        = 11번 쿼리가 실행됩니다.
        <InlineCode size="md">DataLoader</InlineCode>를 사용하면 동일 틱에서
        발생하는 요청을 배치 처리하여 2번의 쿼리로 줄일 수 있습니다.
      </>
    ),
  },
];
