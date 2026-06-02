"use client";

import {
  Atom,
  ChartBar,
  ClockCounterClockwise,
  Compass,
  DotsThree,
  Gear,
  PencilRuler,
} from "@fluxloop-ai/pds-icons/icons";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fluxloop-ai/pds-ui/components/tabs";

export function TabsHorizontalDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="loop">
        <TabsList>
          <TabsTrigger value="loop" aria-label="Loop">
            <Icon icon={Atom} />
          </TabsTrigger>
          <TabsTrigger value="profile" aria-label="Profile">
            <Icon icon={PencilRuler} />
          </TabsTrigger>
          <TabsTrigger value="history" aria-label="History">
            <Icon icon={ClockCounterClockwise} />
          </TabsTrigger>
          <TabsTrigger value="more" aria-label="More">
            <Icon icon={DotsThree} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="loop" style={{ paddingTop: 12, fontSize: 13 }}>
          Loop 탭. Arrow 키로 이동, hover 시 라벨 툴팁.
        </TabsContent>
        <TabsContent value="profile" style={{ paddingTop: 12, fontSize: 13 }}>
          Profile 탭.
        </TabsContent>
        <TabsContent value="history" style={{ paddingTop: 12, fontSize: 13 }}>
          History 탭.
        </TabsContent>
        <TabsContent value="more" style={{ paddingTop: 12, fontSize: 13 }}>
          More 탭.
        </TabsContent>
      </Tabs>
      <Styles />
    </div>
  );
}

export function TabsDisabledDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" aria-label="Compass">
            <Icon icon={Compass} />
          </TabsTrigger>
          <TabsTrigger value="b" aria-label="Chart">
            <Icon icon={ChartBar} />
          </TabsTrigger>
          <TabsTrigger value="c" aria-label="Settings (disabled)" disabled>
            <Icon icon={Gear} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Styles />
    </div>
  );
}

export function TabsLabelDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs variant="label" defaultValue="spirit">
        <TabsList>
          <TabsTrigger value="spirit">Spirit</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
          <TabsTrigger value="archive" disabled>
            Archive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="spirit" style={{ paddingTop: 12, fontSize: 13 }}>
          Spirit 탭. 텍스트 라벨이 그대로 노출되므로 툴팁은 띄우지 않는다.
        </TabsContent>
        <TabsContent value="personas" style={{ paddingTop: 12, fontSize: 13 }}>
          Personas 탭.
        </TabsContent>
        <TabsContent value="archive" style={{ paddingTop: 12, fontSize: 13 }}>
          Archive 탭 (비활성화 예시).
        </TabsContent>
      </Tabs>
      <Styles />
    </div>
  );
}

export function TabsVerticalDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="a" orientation="vertical">
        <TabsList>
          <TabsTrigger value="a" aria-label="Compass" tooltipSide="right">
            <Icon icon={Compass} />
          </TabsTrigger>
          <TabsTrigger value="b" aria-label="Chart" tooltipSide="right">
            <Icon icon={ChartBar} />
          </TabsTrigger>
          <TabsTrigger value="c" aria-label="Settings" tooltipSide="right">
            <Icon icon={Gear} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a" style={{ padding: "0 16px", fontSize: 13 }}>
          Compass 패널
        </TabsContent>
        <TabsContent value="b" style={{ padding: "0 16px", fontSize: 13 }}>
          Chart 패널
        </TabsContent>
        <TabsContent value="c" style={{ padding: "0 16px", fontSize: 13 }}>
          Settings 패널
        </TabsContent>
      </Tabs>
      <Styles />
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
