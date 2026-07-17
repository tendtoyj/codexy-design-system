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
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
    letterSpacing: "0em"
  body-reading:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 25px
    letterSpacing: "0.0057em"
  label:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: "0em"
  caption:
    fontFamily: "SF Pro Text, Pretendard Variable, Pretendard, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: "0.0252em"
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
  outlined-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  frosted-button:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  danger-button:
    backgroundColor: "{colors.negative}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  icon-button:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.md}"
    padding: 12px
  text-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 8px
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
  user-message:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 12px
  assistant-message:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body-reading}"
    rounded: "{rounded.none}"
    padding: 0px
---

## Overview

CDS General is precise, calm, professional, AI-native, and content-first. It preserves a neutral palette, compact geometry, restrained accent use, and information hierarchy without assuming a particular platform, screen size, or input device.

The interface should feel intentionally composed rather than decorated. Every visual difference must explain hierarchy, state, interaction, or system meaning.

## Colors

Near-black is the primary action color and the strongest neutral anchor. It is not an accent to scatter across the page: use it for the most important commitment and selected emphasis.

Blue belongs to focus and navigation confirmation. Never replace the blue focus ring with the black primary treatment; the two roles must remain distinguishable. White canvas, subtle cool-gray fill, thin gray line, and white surface create the tonal structure.

Positive, cautionary, and negative colors communicate system meaning. Pair them with explicit text or recognizable icons, and do not use them as decorative category colors.

## Typography

Use the sans family for product copy and the mono family only for code, identifiers, and technical values. Prefer weight, line height, and whitespace over dramatic size jumps.

- `body` is the default interface copy role.
- `body-reading` adds line height for explanations, assistant responses, and long-form content.
- `label` names controls and compact actions; it should remain direct and short.
- `caption` supports timestamps, metadata, and tertiary annotations, never essential instructions.
- `code` preserves technical strings and should not become a general display style.

## Layout

Build from the spacing scale. Keep related items close, separate regions with space before adding borders, and select density from the target context instead of inventing a new scale.

Use a clear progression of canvas, region, group, and item. Content order must remain understandable if the layout changes. Avoid encoding meaning only through physical position.

## Elevation & Depth

Use tonal layers and thin lines before shadows. A subtle fill can group controls; a one-pixel line can establish a boundary; a surface can lift focused content from the canvas.

Reserve soft neutral shadow for overlays or content that must clearly float above the current task. Avoid heavy, dark, or repeatedly nested card shadows. Ambient glow is exceptional and may indicate focus or an AI-active state only when it does not compete with content.

## Shapes

Use medium radii for controls and larger radii for cards. Rounded geometry should feel precise and slightly soft, never bubbly.

The preferred silhouette is a subtly smoothed squircle. When continuous-corner geometry is unavailable, use the matching standard radius; do not approximate it with oversized pills.

## Components

### Action hierarchy

Use a labeled Button for committed actions, an IconButton for recognizable icon-only actions, and a TextButton for low-emphasis inline actions. Do not remove the label from a Button to simulate an IconButton.

- Solid: one primary call to action per page or focused task region.
- Outlined: the normal choice for secondary actions.
- Frosted: a quiet translucent or tonal action on layered surfaces.
- Danger: destructive or irreversible actions only, with explicit wording.

Focus remains visible and component states never depend on color alone. Loading preserves the control footprint; disabled state remains legible but clearly unavailable.

### AI-native content

Render the user's message as a compact bubble so the initiating input is easy to scan. Render the assistant response as plain content on the canvas, not a competing bubble. Long assistant content uses the reading body rhythm.

Keep reasoning or tool activity in a subordinate trace that can be scanned separately from the final answer. The composer must distinguish idle, focused, submitting, stopped, and unavailable states without adding decorative AI gradients.

## Do's and Don'ts

- Do preserve semantic roles when adapting values to a platform.
- Do keep the interface calm, direct, and content-led.
- Do use at most one primary call to action in a page or focused task region.
- Do distinguish user input, assistant output, system status, and tool trace.
- Don't use multiple saturated accent colors in one view.
- Don't use a general Button where an icon-only or text-only action is intended.
- Don't communicate status or interactivity through color alone.
- Don't treat this file as component implementation documentation.
