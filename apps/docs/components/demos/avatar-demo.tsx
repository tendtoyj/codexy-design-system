import { Avatar } from "@fluxloop-ai/pds-ui/components/avatar";

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

export function AvatarSizeDemo() {
  return (
    <div className="pds-avatar-row">
      {SIZES.map((s) => (
        <div key={s} className="pds-avatar-cell">
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
    <div className="pds-avatar-row">
      <div className="pds-avatar-cell">
        <Avatar variant="person" size="xl" />
        <code>person</code>
      </div>
      <div className="pds-avatar-cell">
        <Avatar variant="company" size="xl" />
        <code>company</code>
      </div>
      <div className="pds-avatar-cell">
        <Avatar variant="academy" size="xl" />
        <code>academy</code>
      </div>
      <div className="pds-avatar-cell">
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
      .pds-avatar-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 16px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-avatar-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .pds-avatar-cell code {
        font-family: var(--pds-font-mono);
        font-size: var(--text-caption1);
        color: var(--pds-label-alternative);
      }
    `}</style>
  );
}
