"use client";

import { ChatUserMessage } from "@fluxloop-ai/pds-ui/components/chat-user-message";
import type { ContentBlock } from "@fluxloop-ai/pds-ui/types";

const IMAGE_A: ContentBlock = {
  type: "image",
  source: { type: "url", url: "https://picsum.photos/id/7/200" },
};

const IMAGE_B: ContentBlock = {
  type: "image",
  source: { type: "url", url: "https://picsum.photos/id/10/200" },
};

const PDF_MCP: ContentBlock = {
  type: "document",
  source: { type: "url", url: "https://example.com/03-mcp.pdf" },
  title: "03 MCP - Slides.pdf",
};

const PDF_SKILLS: ContentBlock = {
  type: "document",
  source: { type: "url", url: "https://example.com/02-skills.pdf" },
  title: "02 Skills - Slides.pdf",
};

const FILE_MD: ContentBlock = {
  type: "document",
  source: { type: "url", url: "https://example.com/soul.md" },
  title: "soul.md",
};

const MULTILINE_TEXT = "이 코드 블록 formatDate(d) 안 돌아가는데 봐줄래?\n혹시 timezone 이슈일까?";
const LONG_TEXT =
  "어제 디자인 리뷰에서 이야기 나온 부분인데, 챗 메시지 풍선의 최대 너비를 넓은 화면에서도 무한정 늘리는 게 아니라 가독성 한계 안에서 cap 을 두기로 했어. 한 줄에 들어가는 글자 수가 너무 많으면 다음 줄 첫 글자를 찾기 어려워서 시선이 자주 길을 잃거든. 그래서 컨테이너가 충분히 넓을 땐 600px 에서 끊고, 좁을 땐 85% 비율로 따라가도록 하자는 결론이었어.";
const EMPTY_TEXT: ContentBlock = { type: "text", text: "(no message)" };

export function ChatUserMessageDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatUserMessage content="안녕하세요. 오늘 날씨는 어떤가요?" />
      <ChatUserMessage content={MULTILINE_TEXT} />
      <ChatUserMessage content={LONG_TEXT} />
      <ChatUserMessage content={[IMAGE_A, IMAGE_B, { type: "text", text: "그림 여러개" }]} />
      <ChatUserMessage content={[IMAGE_A, EMPTY_TEXT]} />
      <ChatUserMessage content={[PDF_MCP, PDF_SKILLS, IMAGE_B, EMPTY_TEXT]} />
      <ChatUserMessage content={[FILE_MD, { type: "text", text: "이거를 한 번 읽어봐" }]} />
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
        max-width: 400px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
