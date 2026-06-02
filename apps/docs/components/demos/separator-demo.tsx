import { Separator } from "@fluxloop-ai/pds-ui/components/separator";

export function SeparatorHorizontalDemo() {
  return (
    <div className="pds-sep-card">
      <div className="pds-sep-title">Separator — Horizontal</div>
      <div className="pds-sep-sub">thickness 1 / color normal</div>
      <Separator />
      <div className="pds-sep-sub">color neutral</div>
      <Separator color="neutral" />
      <div className="pds-sep-sub">color alternative</div>
      <Separator color="alternative" />
      <div className="pds-sep-sub">alpha-normal (투명 기반)</div>
      <Separator color="alpha-normal" />
      <div className="pds-sep-sub">thickness 2</div>
      <Separator thickness={2} />
      <DemoStyles />
    </div>
  );
}

export function SeparatorVerticalDemo() {
  return (
    <div className="pds-sep-card">
      <div className="pds-sep-title">Separator — Vertical</div>
      <div className="pds-sep-vrow">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" color="neutral" />
        <span>Tokens</span>
        <Separator orientation="vertical" thickness={2} />
        <span>Changelog</span>
      </div>
      <DemoStyles />
    </div>
  );
}

function DemoStyles() {
  return (
    <style>{`
      .pds-sep-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-sep-title {
        font-size: var(--text-label1);
        font-weight: var(--pds-font-weight-semibold);
        color: var(--pds-label-normal);
      }
      .pds-sep-sub {
        font-size: var(--text-caption1);
        color: var(--pds-label-alternative);
      }
      .pds-sep-vrow {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: var(--text-body2);
        color: var(--pds-label-normal);
      }
    `}</style>
  );
}
