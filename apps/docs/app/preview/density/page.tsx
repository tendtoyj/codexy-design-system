"use client";

import { ArrowRight, Plus } from "@tendtoyj/cds-icons/icons";
import { Button } from "@tendtoyj/cds-ui";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const VARIANTS = ["solid", "outlined", "frosted", "danger"] as const;

/**
 * density 파일럿 검증 페이지.
 * 같은 <Button> 코드가 comfortable / touch 두 밀도에서 어떻게 달라지는지 나란히 비교.
 * touch 쪽은 [data-density="touch"] 스코프 한 줄만 감쌌을 뿐, 컴포넌트는 동일.
 */
function ButtonMatrix() {
  return (
    <div className="flex flex-col gap-[16px]">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-[12px]">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={variant}
              size={size}
              leadingContent={<Plus />}
              trailingContent={<ArrowRight />}
            >
              {variant}/{size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

function Panel({
  label,
  density,
}: {
  label: string;
  density?: "touch";
}) {
  return (
    <section
      data-density={density}
      className="flex-1 min-w-[360px] rounded-[16px] p-[24px] bg-[var(--cds-background-normal-normal)]"
      style={{ boxShadow: "inset 0 0 0 1px var(--cds-line-normal-neutral)" }}
    >
      <h2 className="text-[length:var(--text-title3)] font-semibold text-[color:var(--cds-label-normal)] mb-[20px]">
        {label}
      </h2>
      <ButtonMatrix />
    </section>
  );
}

export default function DensityPreviewPage() {
  return (
    <div className="h-full w-full overflow-auto bg-[var(--cds-background-normal-alternative)] p-[32px]">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="text-[length:var(--text-title1)] font-bold text-[color:var(--cds-label-normal)] mb-[8px]">
          Density pilot — Button
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
