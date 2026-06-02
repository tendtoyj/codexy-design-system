"use client";

import { CheckCircle } from "@fluxloop-ai/pds-icons/icons";
import { Badge } from "@fluxloop-ai/pds-ui/components/badge";

export function BadgeGridDemo() {
  return (
    <div className="pds-demo-row">
      <Section label="Variants × Color (default accentColor=cyan, neutralColor=alternative)">
        {(["solid", "outlined"] as const).map((variant) => (
          <Row key={variant}>
            <Cell>{variant}</Cell>
            <Badge variant={variant} color="accent">
              Accent
            </Badge>
            <Badge variant={variant} color="neutral">
              Neutral
            </Badge>
          </Row>
        ))}
      </Section>

      <Section label="Sizes">
        <Row>
          <Badge size="xs">xsmall</Badge>
          <Badge size="sm">small</Badge>
          <Badge size="md">medium</Badge>
        </Row>
      </Section>

      <Section label="Neutral color (neutralColor)">
        <Row>
          {(["assistive", "alternative", "neutral", "normal", "strong"] as const).map((nc) => (
            <Badge key={nc} color="neutral" neutralColor={nc} size="md">
              {nc}
            </Badge>
          ))}
        </Row>
      </Section>

      <Section label="Accent color (accentColor)">
        <Row>
          {(["red-orange", "lime", "cyan", "light-blue", "violet"] as const).map((ac) => (
            <Badge key={ac} color="accent" accentColor={ac} size="md">
              {ac}
            </Badge>
          ))}
        </Row>
      </Section>

      <Section label="Status (accentColor)">
        <Row>
          <Badge color="accent" accentColor="positive" size="md">
            Positive
          </Badge>
          <Badge color="accent" accentColor="cautionary" size="md">
            Cautionary
          </Badge>
          <Badge color="accent" accentColor="negative" size="md">
            Negative
          </Badge>
        </Row>
      </Section>

      <Styles />
    </div>
  );
}

export function BadgeContentDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 8 }}>
      <Badge size="sm" accentColor="positive" leadingContent={<CheckCircle />}>
        승인됨
      </Badge>
      <Badge size="sm" variant="outlined" accentColor="cautionary">
        3
      </Badge>
      <Styles />
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 11,
          color: "var(--pds-label-alternative)",
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 6, alignItems: "center" }}>{children}</div>;
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: "var(--pds-label-assistive)",
        width: 60,
      }}
    >
      {children}
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
