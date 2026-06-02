"use client";

import { ChatAssistantMessage } from "@fluxloop-ai/pds-ui/components/chat-assistant-message";
import { ChatLoadingDots } from "@fluxloop-ai/pds-ui/components/chat-loading-dots";
import { ChatUserMessage } from "@fluxloop-ai/pds-ui/components/chat-user-message";
import { useEffect, useState } from "react";

const USER_QUESTION = "이건 어떻게 하는 거야?";
const ASSISTANT_REPLY = `보통은 세 단계로 나눠서 진행해요.
먼저 어떤 맥락에서 이 작업이 필요한지 확인하고, 그 다음 가능한 옵션들을 비교해요.
마지막으로 가장 잘 맞는 한 가지를 골라서 적용하는 식이에요. 처음에는 시간이 좀 걸려도, 한 번 흐름이 잡히면 다음부터는 훨씬 빠르게 처리할 수 있어요.`;

const PRE_TYPING_DELAY = 2600;
const TYPING_INTERVAL = 32;
const POST_DONE_HOLD = 3200;
const RESET_HOLD = 600;

type Phase = "idle" | "typing" | "done" | "reset";

export function ChatLoadingDotsDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");

  useEffect(() => {
    if (phase === "idle") {
      const t = setTimeout(() => setPhase("typing"), PRE_TYPING_DELAY);
      return () => clearTimeout(t);
    }
    if (phase === "typing") {
      if (text.length < ASSISTANT_REPLY.length) {
        const t = setTimeout(
          () => setText(ASSISTANT_REPLY.slice(0, text.length + 1)),
          TYPING_INTERVAL,
        );
        return () => clearTimeout(t);
      }
      setPhase("done");
      return;
    }
    if (phase === "done") {
      const t = setTimeout(() => setPhase("reset"), POST_DONE_HOLD);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setText("");
      setPhase("idle");
    }, RESET_HOLD);
    return () => clearTimeout(t);
  }, [phase, text]);

  const showDot = phase === "idle" || phase === "typing";

  return (
    <div className="pds-chat-demo-card">
      <div className="pds-chat-thread">
        <ChatUserMessage content={USER_QUESTION} />
        <ChatAssistantMessage
          content={text}
          renderMarkdown={(t) => (
            <span style={{ whiteSpace: "pre-wrap" }}>
              {t}
              {showDot ? <ChatLoadingDots /> : null}
            </span>
          )}
        />
      </div>

      <footer className="pds-chat-demo-caption">
        <span className={phase === "idle" ? "is-active" : ""}>① 응답 대기 (placeholder)</span>
        <span aria-hidden="true">→</span>
        <span className={phase === "typing" ? "is-active" : ""}>
          ② 타이핑 (텍스트 + trailing dot)
        </span>
        <span aria-hidden="true">→</span>
        <span className={phase === "done" ? "is-active" : ""}>③ 완료 (dot 사라짐)</span>
      </footer>

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
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-chat-thread {
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: 220px;
        overflow: hidden;
      }
      .pds-chat-demo-caption {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        font-size: var(--text-caption1);
        color: var(--pds-label-assistive);
      }
      .pds-chat-demo-caption .is-active {
        color: var(--pds-primary-normal);
        font-weight: var(--pds-font-weight-semibold);
      }
    `}</style>
  );
}
