---
version: "alpha"
name: "CDS Responsive Web Theme"
description: "Responsive Codexy Design System translation for SaaS and browser-based product interfaces."
colors:
  primary: "#1b1c1e"
  on-primary: "#f7f7f8"
  focus-ring: "#0066ff"
  canvas: "#ffffff"
  canvas-subtle: "#f7f7f8"
  surface: "#ffffff"
  label: "#171719"
  label-muted: "#6b6c70"
  line: "#dcdddf"
  fill: "#f1f1f2"
  positive: "#00a638"
  cautionary: "#d97700"
  negative: "#d92d2d"
  inverse-surface: "#1b1c1e"
  inverse-label: "#f7f7f8"
typography:
  display:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 42px
    letterSpacing: "-0.0319em"
  title:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
    letterSpacing: "-0.0194em"
  heading:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: "-0.002em"
  body:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: "0em"
  label:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: "0em"
  code:
    fontFamily: "SF Mono, JetBrains Mono, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: "0em"
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
  2xl: 12px
  3xl: 16px
  full: 9999px
spacing:
  "0": 0px
  "0.5": 2px
  "1": 4px
  "1.5": 6px
  "2": 8px
  "2.5": 10px
  "3": 12px
  "3.5": 14px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "14": 56px
  "16": 64px
  "18": 72px
  "20": 80px
components:
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: 44px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: 44px
  app-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.none}"
    height: 56px
  content-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    padding: 16px
---

## Overview

CDS Responsive Web supports browser-based SaaS and product interfaces from narrow phones to wide workspaces. It combines mobile-friendly baselines with keyboard, pointer, coarse touch, and fluid layout behavior.

## Colors

Use neutral surfaces to organize dense product information. Dark primary actions remain selective, blue identifies focus, and semantic status colors always include a text or icon cue.

## Typography

Body text begins at 16px. Preserve the semantic role system across viewport ranges; change measure and layout before shrinking text below accessible product defaults.

## Layout

- **compact (320–767px):** single column, 16px gutters, temporary navigation.
- **medium (768–1199px):** one main column with optional collapsible rail or adjacent context.
- **wide (1200px and above):** persistent navigation and bounded content with an optional contextual panel.

## Elevation & Depth

Use responsive overlays that remain inside the viewport. Prefer line and surface hierarchy for persistent regions, soft shadows for menus and dialogs, and a restrained scrim for modal focus.

## Shapes

Use 8px controls and cards as the browser baseline. Keep rounded geometry consistent when regions reflow, collapse, or move into overlays.

## Components

Use 44px default form controls, visible keyboard focus, pointer hover, pressed feedback for coarse input, and labels that remain available at every width. Navigation collapses without changing information architecture.

## Do's and Don'ts

- Do test compact, medium, and wide ranges with keyboard and coarse touch input.
- Do keep content order and task priority stable while layout changes.
- Don't reproduce desktop window chrome in the browser.
- Don't turn product screens into marketing landing pages by default.
