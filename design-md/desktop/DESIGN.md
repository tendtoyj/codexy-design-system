---
version: "alpha"
name: "CDS Desktop Theme"
description: "Codexy Design System theme for dense macOS, Windows, Electron, and Tauri work applications."
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
  negative: "#c52222"
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
    fontSize: 22px
    fontWeight: 700
    lineHeight: 30px
    letterSpacing: "-0.0194em"
  heading:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: "-0.002em"
  body:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: "0em"
  body-reading:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: "0.0057em"
  label:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 17px
    letterSpacing: "0em"
  caption:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: "0.0252em"
  code:
    fontFamily: "SF Mono, JetBrains Mono, Consolas, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
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
    rounded: "{rounded.md}"
    height: 36px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 36px
  work-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    padding: 16px
---

## Overview

CDS Desktop supports information-dense work applications operated with pointer and keyboard. It favors persistent context, compact controls, and stable panels over touch-sized chrome.

## Colors

Use white as the working canvas, cool gray fills for selection and grouping, and near-black for primary actions. A blue focus ring is always visible during keyboard navigation.

## Typography

Body text begins at 14px with a clear 22px line height. Keep labels compact, titles restrained, and code visually distinct without changing the overall rhythm.

## Layout

At 960px and above, use a persistent sidebar, primary work canvas, and optional contextual panel. Toolbars remain compact and panels keep stable widths while the canvas flexes.

## Elevation & Depth

Separate persistent panels with lines or background shifts. Use shadow for dialogs, menus, and popovers, not for every card inside the work canvas.

## Shapes

Controls use 6px corners and cards use 8px corners. Preserve a precise desktop feel by avoiding oversized pills except for tags and status chips.

## Components

Controls may use 28px compact, 32px default, 36px comfortable, and 44px large heights. Support hover, pressed, selected, focus-visible, disabled, and loading states.

## Do's and Don'ts

- Do expose keyboard focus, shortcuts, and predictable tab order.
- Do keep navigation and task context visible during deep workflows.
- Don't enlarge every control to mobile dimensions.
- Don't hide critical actions behind hover-only affordances.
