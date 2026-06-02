import { Avatar } from "@tendtoyj/cds-ui/components/avatar";

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

export function AvatarSizeDemo() {
  return (
    <div className="cds-avatar-row">
      {SIZES.map((s) => (
        <div key={s} className="cds-avatar-cell">
          <Avatar size={s} />
          <code>{s}</code>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function AvatarVariantDemo() {
  return (
    <div className="cds-avatar-row">
      <div className="cds-avatar-cell">
        <Avatar variant="person" size="xl" />
        <code>person</code>
      </div>
      <div className="cds-avatar-cell">
        <Avatar variant="company" size="xl" />
        <code>company</code>
      </div>
      <div className="cds-avatar-cell">
        <Avatar variant="academy" size="xl" />
        <code>academy</code>
      </div>
      <div className="cds-avatar-cell">
        <Avatar
          variant="person"
          size="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96"
          alt="demo"
        />
        <code>with src</code>
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-avatar-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 16px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
      .cds-avatar-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .cds-avatar-cell code {
        font-family: var(--cds-font-mono);
        font-size: var(--text-caption1);
        color: var(--cds-label-alternative);
      }
    `}</style>
  );
}
