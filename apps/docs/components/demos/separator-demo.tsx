import { Separator } from "@tendtoyj/cds-ui/components/separator";

export function SeparatorHorizontalDemo() {
  return (
    <div className="cds-sep-card">
      <div className="cds-sep-title">Separator — Horizontal</div>
      <div className="cds-sep-sub">thickness 1 / color normal</div>
      <Separator />
      <div className="cds-sep-sub">color neutral</div>
      <Separator color="neutral" />
      <div className="cds-sep-sub">color alternative</div>
      <Separator color="alternative" />
      <div className="cds-sep-sub">alpha-normal (투명 기반)</div>
      <Separator color="alpha-normal" />
      <div className="cds-sep-sub">thickness 2</div>
      <Separator thickness={2} />
      <DemoStyles />
    </div>
  );
}

export function SeparatorVerticalDemo() {
  return (
    <div className="cds-sep-card">
      <div className="cds-sep-title">Separator — Vertical</div>
      <div className="cds-sep-vrow">
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
      .cds-sep-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-sep-title {
        font-size: var(--text-label1);
        font-weight: var(--cds-font-weight-semibold);
        color: var(--cds-label-normal);
      }
      .cds-sep-sub {
        font-size: var(--text-caption1);
        color: var(--cds-label-alternative);
      }
      .cds-sep-vrow {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: var(--text-body2);
        color: var(--cds-label-normal);
      }
    `}</style>
  );
}
