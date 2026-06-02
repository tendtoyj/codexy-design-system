"use client";

import { Button } from "@fluxloop-ai/pds-ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@fluxloop-ai/pds-ui/components/tooltip";

export function TooltipBasicDemo() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="pds-tt-card">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="frosted">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>기본 툴팁</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="frosted">With shortcut</Button>
          </TooltipTrigger>
          <TooltipContent size="md" shortcut="⌘K">
            명령 팔레트
          </TooltipContent>
        </Tooltip>
        <Styles />
      </div>
    </TooltipProvider>
  );
}

export function TooltipSideDemo() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="pds-tt-card">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="frosted" size="sm">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>side: {side}</TooltipContent>
          </Tooltip>
        ))}
        <Styles />
      </div>
    </TooltipProvider>
  );
}

export function TooltipSizeDemo() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="pds-tt-card">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="frosted">size sm</Button>
          </TooltipTrigger>
          <TooltipContent size="sm">small tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="frosted">size md</Button>
          </TooltipTrigger>
          <TooltipContent size="md">medium tooltip</TooltipContent>
        </Tooltip>
        <Styles />
      </div>
    </TooltipProvider>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-tt-card {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        padding: 40px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
