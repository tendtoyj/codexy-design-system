"use client";

import { Heart, MagnifyingGlass, Plus, Trash, X } from "@tendtoyj/cds-icons/icons";
import { Icon } from "@tendtoyj/cds-ui/components/icon";
import { IconButton } from "@tendtoyj/cds-ui/components/icon-button";

export function IconButtonVariantDemo() {
  return (
    <div className="cds-icon-btn-card">
      <div className="cds-icon-btn-row">
        <IconButton variant="normal" aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="subtle" aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="background" aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="outlined" aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="solid" aria-label="추가">
          <Icon icon={Plus} />
        </IconButton>
      </div>
      <div className="cds-icon-btn-row">
        <IconButton variant="normal" disabled aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="subtle" disabled aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="background" disabled aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="outlined" disabled aria-label="검색">
          <Icon icon={MagnifyingGlass} />
        </IconButton>
        <IconButton variant="solid" disabled aria-label="추가">
          <Icon icon={Plus} />
        </IconButton>
      </div>
      <Styles />
    </div>
  );
}

export function IconButtonSizeDemo() {
  return (
    <div className="cds-icon-btn-card">
      <div className="cds-icon-btn-row">
        <IconButton size="xs" variant="background" aria-label="좋아요">
          <Icon icon={Heart} />
        </IconButton>
        <IconButton size="sm" variant="background" aria-label="좋아요">
          <Icon icon={Heart} />
        </IconButton>
        <IconButton size="md" variant="background" aria-label="좋아요">
          <Icon icon={Heart} />
        </IconButton>
        <IconButton size="lg" variant="background" aria-label="좋아요">
          <Icon icon={Heart} />
        </IconButton>
      </div>
      <div className="cds-icon-btn-row">
        <IconButton size="xs" variant="outlined" aria-label="삭제">
          <Icon icon={Trash} />
        </IconButton>
        <IconButton size="sm" variant="outlined" aria-label="삭제">
          <Icon icon={Trash} />
        </IconButton>
        <IconButton size="md" variant="outlined" aria-label="삭제">
          <Icon icon={Trash} />
        </IconButton>
        <IconButton size="lg" variant="outlined" aria-label="삭제">
          <Icon icon={Trash} />
        </IconButton>
      </div>
      <Styles />
    </div>
  );
}

export function IconButtonInlineDemo() {
  return (
    <div className="cds-icon-btn-card">
      <div className="cds-inline-row">
        <span>알림이 도착했어요</span>
        <IconButton size="sm" aria-label="닫기">
          <Icon icon={X} />
        </IconButton>
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-icon-btn-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-icon-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
      .cds-inline-row {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--cds-radius-md);
        background: var(--cds-fill-normal);
        color: var(--cds-label-normal);
        font-size: 13px;
      }
    `}</style>
  );
}
