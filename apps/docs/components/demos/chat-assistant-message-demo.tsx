"use client";

import { renderMarkdown } from "@fluxloop-ai/pds-markdown";
import { ChatAssistantMessage } from "@fluxloop-ai/pds-ui/components/chat-assistant-message";
import { ChatUserMessage } from "@fluxloop-ai/pds-ui/components/chat-user-message";

const USER_QUESTION =
  "Anthropic SDK 로 스트리밍 응답 받는 방법 알려줘. `messages.stream()` 이랑 `create({ stream: true })` 차이도 궁금해.";

const ASSISTANT_REPLY = `\`messages.stream()\` 은 헬퍼라서 가장 흔한 케이스에 적합하고, \`create({ stream: true })\` 는 raw SSE iterator 를 직접 다루고 싶을 때 쓰는 저수준 API 입니다. 아래에 차이와 실제 핸들링 패턴을 정리해뒀어요.

---

# Anthropic Messages API 스트리밍 가이드

## 두 인터페이스의 차이

\`messages.stream()\` 은 이벤트 listener 와 자동 누적된 최종 메시지를 제공해서 코드가 짧아집니다. \`create({ stream: true })\` 는 raw SSE iterator 를 돌려주는 ~~저수준~~ *저수준* API 로, 직접 이벤트를 파싱하고 싶을 때 씁니다.

### 권장 패턴

\`\`\`ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const stream = client.messages.stream({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  messages: [{ role: "user", content: "안녕" }],
});

stream.on("text", (delta) => process.stdout.write(delta));
const final = await stream.finalMessage();
\`\`\`

### 의존성 설치

\`\`\`bash
pnpm add @anthropic-ai/sdk
export ANTHROPIC_API_KEY=sk-ant-...
\`\`\`

## 이벤트 타입 정리

| 이벤트 | 페이즈 | 의미 | 빈도 | 처리 우선순위 |
|:--|:--|:--|--:|:--|
| \`message_start\` | init | 응답 시작 / 메타데이터 | 1회 | 메시지 ID·모델 정보 저장 |
| \`content_block_delta\` | stream | 텍스트 / tool input chunk | N회 | UI 에 즉시 append |
| \`content_block_stop\` | stream | 블록 1개 종료 | 블록 수 | 누적 버퍼 flush |
| \`message_delta\` | finalize | usage / stop_reason 업데이트 | 1~2회 | 토큰 사용량 기록 |
| \`message_stop\` | finalize | 응답 종료 | 1회 | 스트림 close, abort listener 해제 |

## 핵심 포인트

- 헬퍼는 \`messages.stream()\`, 저수준은 \`create({ stream: true })\`
- 이벤트는 init / stream / finalize 세 페이즈로 흐른다
- abort 와 timeout 은 별도 레이어로 다룬다

## 진행 체크리스트

- [x] SDK 설치
- [x] 환경변수 \`ANTHROPIC_API_KEY\` 설정
- [ ] 스트림 응답을 클라이언트로 forward
- [ ] error / abort 처리

## 권장 진행 순서

1. 단순 텍스트 스트리밍부터 동작 확인
2. tool use 가 섞인 응답 처리
   1. \`tool_use\` 블록 누적
   2. tool result 를 다음 턴에 포함
3. 취소 시그널(\`AbortController\`) 연결
   - 클라이언트에서 끊겼을 때 서버 stream도 함께 abort
   - timeout 별도로 둘 것

## 주의

> 네트워크 레이어에서 **buffering** 이 끼면 스트림이 큰 chunk 단위로 끊겨 보입니다. CDN/프록시의 buffering 옵션을 꺼야 합니다.
>
> > Vercel Edge Runtime 은 기본 통과지만, Node Serverless 환경에서는 응답 헤더에 \`Cache-Control: no-transform\` 을 명시하는 게 안전합니다.

상태 페이지는 https://status.anthropic.com 에서도 실시간으로 확인 가능합니다.

---

자세한 레퍼런스는 [Anthropic Streaming docs](https://docs.anthropic.com/en/api/messages-streaming) 를 참고하세요.`;

export function ChatAssistantMessageDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatUserMessage content={USER_QUESTION} />
      <ChatAssistantMessage content={ASSISTANT_REPLY} renderMarkdown={renderMarkdown} />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-chat-demo-card {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
        margin: 16px 0;
        max-width: 400px;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
