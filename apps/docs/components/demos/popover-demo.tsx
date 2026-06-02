"use client";

import { Info } from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui/components/button";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";
import { Input } from "@tendtoyj/cds-ui/components/input";
import {
  Popover,
  PopoverActionArea,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTitleRow,
  PopoverTrigger,
} from "@tendtoyj/cds-ui/components/popover";

export function PopoverNormalDemo() {
  return (
    <div className="cds-demo-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outlined">정보 보기</Button>
        </PopoverTrigger>
        <PopoverContent size="md">
          <PopoverHeader>
            <PopoverTitleRow>
              <PopoverTitle>프로젝트 이름</PopoverTitle>
              <PopoverDescription>팀원에게만 표시됩니다.</PopoverDescription>
            </PopoverTitleRow>
            <PopoverClose />
          </PopoverHeader>
          <PopoverBody>
            <Input size="sm" placeholder="이름" width="100%" />
          </PopoverBody>
          <PopoverActionArea>
            <PopoverClose asChild>
              <Button variant="outlined" size="xs">
                취소
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant="solid" size="xs">
                저장
              </Button>
            </PopoverClose>
          </PopoverActionArea>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
      <Styles />
    </div>
  );
}

export function PopoverSizeDemo() {
  return (
    <div className="cds-demo-row" style={{ display: "flex", gap: 8 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <Popover key={s}>
          <PopoverTrigger asChild>
            <Button size="xs" variant="frosted">
              size {s}
            </Button>
          </PopoverTrigger>
          <PopoverContent size={s}>
            <PopoverHeader>
              <PopoverTitle>Size = {s}</PopoverTitle>
              <PopoverClose />
            </PopoverHeader>
            <PopoverBody>min-width 와 padding, body font-size 가 사이즈별로 달라진다.</PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
      <Styles />
    </div>
  );
}

export function PopoverCustomDemo() {
  return (
    <div className="cds-demo-row">
      <Popover>
        <PopoverTrigger asChild>
          <IconButton size="sm" variant="normal" aria-label="도움말">
            <Info />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent variant="custom" size="sm" className="p-0 overflow-hidden">
          <div className="p-[12px] text-[12px] leading-[1.5] text-[color:var(--cds-label-neutral)]">
            <b className="text-[color:var(--cds-label-normal)]">variant=&quot;custom&quot;</b>
            <div>헤더/액션 크롬 없이 children 만 렌더링.</div>
          </div>
        </PopoverContent>
      </Popover>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
    `}</style>
  );
}
