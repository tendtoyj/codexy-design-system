"use client";

import { Button } from "@tendtoyj/cds-ui/components/button";
import {
  Dialog,
  DialogActionArea,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogNavigation,
  DialogTitle,
  DialogTrigger,
} from "@tendtoyj/cds-ui/components/dialog";
import { Input } from "@tendtoyj/cds-ui/components/input";

export function DialogPopupDemo() {
  return (
    <div className="cds-dlg-card">
      <Dialog>
        <DialogTrigger asChild>
          <Button>프로젝트 만들기</Button>
        </DialogTrigger>
        <DialogContent autoFocusOnOpen={false}>
          <DialogNavigation>
            <div>
              <DialogTitle>새 프로젝트</DialogTitle>
              <DialogDescription>이름을 입력해 시작합니다.</DialogDescription>
            </div>
            <DialogClose />
          </DialogNavigation>
          <DialogBody>
            <Input size="md" placeholder="프로젝트 이름" width="100%" />
          </DialogBody>
          <DialogActionArea>
            <DialogClose asChild>
              <Button variant="outlined">취소</Button>
            </DialogClose>
            <Button variant="solid">만들기</Button>
          </DialogActionArea>
        </DialogContent>
      </Dialog>
      <Styles />
    </div>
  );
}

export function DialogFullDemo() {
  return (
    <div className="cds-dlg-card">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="frosted">전체 설정 열기</Button>
        </DialogTrigger>
        <DialogContent variant="full" resize="free">
          <DialogNavigation>
            <DialogTitle>설정</DialogTitle>
            <DialogClose />
          </DialogNavigation>
          <DialogBody>
            <p className="text-[color:var(--cds-label-alternative)] text-[13px]">
              Dialog 의 <code>variant=&quot;full&quot;</code> 데모. 데스크탑 앱 기준이라{" "}
              <code>bottom</code> variant 는 제외.
            </p>
          </DialogBody>
        </DialogContent>
      </Dialog>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-dlg-card {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
    `}</style>
  );
}
