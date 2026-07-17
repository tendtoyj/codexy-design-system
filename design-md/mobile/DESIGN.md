---
version: "alpha"
name: "CDS Mobile Theme"
description: "Touch-first Codexy Design System translation for native mobile interfaces and app-like PWAs."
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
  body-reading:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 27px
    letterSpacing: "0.0057em"
  label:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: "0em"
  caption:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: "0.0252em"
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
    height: 48px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: 48px
  bottom-navigation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 56px
  bottom-sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.3xl}"
    padding: 24px
---

## Overview

CDS Mobile translates the desktop-origin visual language into a touch-first, single-column product experience. Bottom navigation, sheets, and safe-area behavior are platform translations rather than claims about current CDS code.

## Colors

Keep the canvas bright and neutral. Use dark primary controls sparingly, retain blue focus for external keyboard access, and pair every status color with text or icon meaning.

## Typography

Body text begins at 16px with a 24px line height. Use larger headings than desktop while preserving the same families and weights across semantic roles.

## Layout

Design for 320–599px single-column viewports. Apply 16px horizontal gutters, respect top and bottom safe areas, and keep the current task above persistent bottom navigation.

## Elevation & Depth

Use surface separation and a soft scrim for sheets. Bottom sheets should feel attached to the viewport edge; reserve centered modals for exceptional compact decisions.

## Shapes

Use 8px controls and 16px sheet corners. Avoid excessive pills, but allow full rounding for avatar, status, and compact selection elements.

## Components

All interactive targets are at least 44px. Prefer bottom sheets for contextual actions, full-screen flows for complex tasks, pressed states for touch feedback, and clear loading or disabled states.

## Do's and Don'ts

- Do keep primary actions reachable and account for safe-area insets.
- Do use pressed, selected, and focus states that remain visible without hover.
- Don't use a persistent desktop sidebar or three-panel shell.
- Don't place essential information behind hover interactions.
