"use client";

import { Heart, MagnifyingGlass, Plus, Trash, X } from "@fluxloop-ai/pds-icons/icons";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { IconButton } from "@fluxloop-ai/pds-ui/components/icon-button";

export function IconButtonVariantDemo() {
  return (
    <div className="pds-icon-btn-card">
      <div className="pds-icon-btn-row">
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
      <div className="pds-icon-btn-row">
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
    <div className="pds-icon-btn-card">
      <div className="pds-icon-btn-row">
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
      <div className="pds-icon-btn-row">
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
    <div className="pds-icon-btn-card">
      <div className="pds-inline-row">
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
      .pds-icon-btn-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-icon-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
      .pds-inline-row {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--pds-radius-md);
        background: var(--pds-fill-normal);
        color: var(--pds-label-normal);
        font-size: 13px;
      }
    `}</style>
  );
}
