"use client";

import { ArrowRight, Plus, Trash } from "@tendtoyj/cds-icons/icons";
import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@tendtoyj/cds-ui";

const BTN_SIZES = ["xs", "sm", "md", "lg"] as const;
const CHIP_SIZES = ["xsmall", "small", "medium", "large"] as const;

/**
 * density 확산 검증 페이지.
 * 동일한 컴포넌트 코드가 comfortable / touch 두 밀도에서 어떻게 달라지는지 나란히 비교.
 * 오른쪽 패널만 [data-density="touch"] 스코프로 감쌌을 뿐, 컴포넌트는 동일.
 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-[length:var(--text-caption1)] font-medium text-[color:var(--cds-label-assistive)]">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-[10px]">{children}</div>
    </div>
  );
}

function Matrix() {
  return (
    <div className="flex flex-col gap-[20px]">
      <Row label="Button">
        {BTN_SIZES.map((s) => (
          <Button key={s} variant="solid" size={s} leadingContent={<Plus />}>
            {s}
          </Button>
        ))}
      </Row>

      <Row label="IconButton">
        {BTN_SIZES.map((s) => (
          <IconButton key={s} size={s} aria-label="add">
            <Plus />
          </IconButton>
        ))}
        <IconButton size="md" variant="subtle" aria-label="delete">
          <Trash />
        </IconButton>
      </Row>

      <Row label="Input">
        {BTN_SIZES.map((s) => (
          <div key={s} className="w-[180px]">
            <Input size={s} placeholder={`size ${s}`} leadingContent={<Plus />} />
          </div>
        ))}
      </Row>

      <Row label="Checkbox / Radio">
        <Checkbox size="sm" defaultChecked />
        <Checkbox size="md" defaultChecked />
        <RadioGroup defaultValue="a" className="flex items-center gap-[12px]">
          <RadioGroupItem value="a" size="sm" />
          <RadioGroupItem value="b" size="md" />
        </RadioGroup>
      </Row>

      <Row label="Chip">
        {CHIP_SIZES.map((s) => (
          <Chip key={s} size={s} leadingContent={<Plus />} trailingContent={<ArrowRight />}>
            {s}
          </Chip>
        ))}
      </Row>
    </div>
  );
}

function Panel({ label, density }: { label: string; density?: "touch" }) {
  return (
    <section
      data-density={density}
      className="flex-1 min-w-[420px] rounded-[16px] p-[24px] bg-[var(--cds-background-normal-normal)]"
      style={{ boxShadow: "inset 0 0 0 1px var(--cds-line-normal-neutral)" }}
    >
      <h2 className="text-[length:var(--text-title3)] font-semibold text-[color:var(--cds-label-normal)] mb-[20px]">
        {label}
      </h2>
      <Matrix />
    </section>
  );
}

export default function DensityPreviewPage() {
  return (
    <div className="h-full w-full overflow-auto bg-[var(--cds-background-normal-alternative)] p-[32px]">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-[length:var(--text-title1)] font-bold text-[color:var(--cds-label-normal)] mb-[8px]">
          Density rollout — control components
        </h1>
        <p className="text-[length:var(--text-body1)] text-[color:var(--cds-label-neutral)] mb-[32px]">
          동일한 컴포넌트 코드. 오른쪽만 <code>data-density=&quot;touch&quot;</code> 스코프로 감쌌습니다.
        </p>
        <div className="flex flex-wrap gap-[24px]">
          <Panel label="comfortable (desktop)" />
          <Panel label="touch (mobile / PWA)" density="touch" />
        </div>
      </div>
    </div>
  );
}
