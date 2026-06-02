"use client";

import {
  ChatCircle,
  Copy,
  Envelope,
  Link,
  Pencil,
  Plus,
  ShareNetwork,
  Trash,
} from "@fluxloop-ai/pds-icons/icons";
import { Button } from "@fluxloop-ai/pds-ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { useState } from "react";

export function DropdownBasicDemo() {
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
          <DropdownMenuItem>
            <Plus />
            새로 만들기
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            복제
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil />
            이름 편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShareNetwork />
              공유
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Link />
                링크 복사
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Envelope />
                이메일
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ChatCircle />
                슬랙
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <Trash />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownCheckDemo() {
  const [panel, setPanel] = useState(true);
  const [ruler, setRuler] = useState(false);
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">보기 옵션</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>보기</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={panel} onCheckedChange={setPanel}>
            사이드 패널
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={ruler} onCheckedChange={setRuler}>
            룰러 표시
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownPlacementDemo() {
  const items = (
    <>
      <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
      <DropdownMenuItem>
        <Plus />
        새로 만들기
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Copy />
        복제
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled>
        <Trash />
        삭제
      </DropdownMenuItem>
    </>
  );

  return (
    <div className="pds-dd-card pds-dd-row">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">align=&quot;start&quot;</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">{items}</DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">align=&quot;center&quot;</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">{items}</DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">align=&quot;end&quot;</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">{items}</DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">side=&quot;right&quot;</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          {items}
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownSizeDemo() {
  return (
    <div className="pds-dd-card pds-dd-row">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted" size="sm">
            sm 메뉴
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent size="sm">
          <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
          <DropdownMenuItem>
            <Plus />
            새로 만들기
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            복제
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil />
            이름 편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <Trash />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">md 메뉴</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent size="md">
          <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
          <DropdownMenuItem>
            <Plus />
            새로 만들기
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            복제
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil />
            이름 편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <Trash />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownRadioDemo() {
  const [pos, setPos] = useState("bottom");
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="frosted">패널 위치: {pos}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>패널 위치</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={pos} onValueChange={setPos}>
            <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">하단</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">우측</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-dd-card {
        padding: 24px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-dd-row {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
    `}</style>
  );
}
