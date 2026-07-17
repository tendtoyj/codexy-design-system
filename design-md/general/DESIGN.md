---
version: "alpha"
name: "CDS General Theme"
description: "Platform-neutral Codexy Design System theme for early UI exploration and cross-platform products."
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
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
    letterSpacing: "0em"
  label:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: "0em"
  code:
    fontFamily: "SF Mono, JetBrains Mono, Consolas, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
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
    padding: 12px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    padding: 16px
---

## Overview

CDS General is a quiet, high-clarity product theme. It preserves the neutral palette, compact geometry, restrained accent use, and information-first hierarchy without assuming a specific viewport or input device.

## Colors

Use near-black for primary actions and text, white and cool gray for structure, and blue only for focus. Status colors communicate meaning; they are not decoration.

## Typography

Use the sans family for product copy and the mono family only for code, identifiers, and technical values. Prefer role hierarchy and whitespace over dramatic size jumps.

## Layout

Build from the spacing scale. Keep related items close, separate regions with space before adding borders, and choose layout density from the target platform instead of inventing a new scale.

## Elevation & Depth

Use borders and subtle surface shifts before shadows. Reserve soft shadow for overlays or content that must clearly float above the current task.

## Shapes

Use medium radii for controls and larger radii for cards. Rounded geometry should feel precise and slightly soft, never bubbly.

## Components

Primary actions are dark solid controls. Secondary actions are neutral outlined or quiet fill controls. Focus remains visible and component states must not depend on color alone.

## Do's and Don'ts

- Do preserve semantic roles when adapting values to a platform.
- Do keep the interface calm, direct, and content-led.
- Don't use multiple saturated accent colors in one view.
- Don't treat this file as component implementation documentation.
