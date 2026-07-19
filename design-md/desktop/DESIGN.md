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
  button-xs:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: 28px
  button-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: 32px
  button-md:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.2xl}"
    height: 36px
  button-lg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.2xl}"
    height: 44px
  icon-button-xs:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.sm}"
    size: 18px
  icon-button-sm:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.md}"
    size: 24px
  icon-button-md:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    size: 32px
  icon-button-lg:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.xl}"
    size: 40px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 36px
  navigation-row-compact:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 28px
  navigation-row:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: 32px
  menu:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    width: 160px
    padding: 6px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.3xl}"
    width: 480px
    padding: 24px
  work-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    padding: 16px
    width: 320px
  chat-composer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    height: 44px
    width: 680px
---

## Overview

CDS Desktop is the closest translation of the current CDS implementation. It supports information-dense work applications operated with a precision pointer and keyboard, while remaining legible on macOS and Windows.

The theme defines the content shell inside an application window. The product and operating system own the titlebar, traffic lights, window buttons, drag regions, and other native chrome.

## Colors

Use white as the working canvas, cool gray fills for selection and grouping, and near-black for primary actions. A blue focus ring is always visible during keyboard navigation.

Persistent navigation lives on the subtle back layer. The main task uses a white foreground surface. Selected rows use quiet fill before stronger color; status colors remain semantic and rare.

## Typography

Body text begins at 14px with a clear 22px line height. Reading content uses 24px line height, labels are 12–13px, and captions are 10–11px. Keep titles restrained and code visually distinct without changing the overall rhythm.

Dense text is acceptable only when grouping and contrast remain clear. Do not shrink essential instructions or long assistant responses to caption size.

## Layout

### Content shell

At 960px and above, use up to three regions: a persistent sidebar, a flexible primary work canvas, and an optional contextual panel. The sidebar starts near 240px, the contextual panel near 320px, and the work canvas receives remaining width.

The main work area is a foreground card only where it meets the window edge and the subtle back layer. Round those exposed outer corners; do not round every internal panel or seam. Toolbars remain compact and internal content scrolls independently when headers or composers must stay available.

Panels may be resized with a visible splitter and sensible minimum and maximum widths. Preserve internal state when a panel collapses, and allow a predictable reset to its default width.

### Persistent navigation

Use a stable sidebar for first-level navigation, grouped lists, and one quiet footer action. Navigation rows use 28px compact or 32px default height. Selection must be readable from fill, label weight, and focus—not hover alone.

## Elevation & Depth

Separate persistent panels with thin lines or background shifts. Use shadow for dialogs, menus, tooltips, context menus, and popovers, not for every card inside the work canvas.

Menus use a tight 6px inset and 160px minimum width. Dialogs are centered, generally around 480px wide, with a scrollable body and fixed decision area when content grows.

## Shapes

Controls use 6–12px corners according to size and cards use 8–12px corners. Dialogs may use 16px. Preserve a precise desktop feel by avoiding oversized pills except for tags and status chips.

A thin scrollbar may remain quiet at rest and widen or increase contrast when the pointer approaches. It must remain discoverable through scroll behavior and cannot be the only indication that content continues.

## Components

### Controls and interaction

Buttons use 28px extra-small, 32px small, 36px medium, and 44px large heights. Icon buttons use an independent 18/24/32/40px square scale. Inputs normally use 32px or 36px; reserve 44px for prominent entry points.

Use SegmentedControl for two to four dense workspace modes, RemovableTabBar for sessions that can be opened and closed, DropdownMenu for compact command and option lists, and Switch only for preferences that apply immediately. Do not simulate these roles with unrelated Button variants; preserve their selected, expanded, checked, and focus-visible states.

Hover previews interactivity, pressed confirms pointer activation, selected represents persistent choice, and focus-visible supports keyboard navigation. Never communicate a state with hover alone. Add a tooltip for unfamiliar icon-only actions and support context menus only where a visible primary path also exists.

### Desktop AI workspace

A multi-session chat uses removable session tabs at the top, one independently scrolling thread in the center, and a composer docked to the bottom. Each session preserves its own message history and draft during tab changes.

Keep the message measure near 680px. User messages are compact bubbles; assistant answers remain plain reading content. Tool traces are subordinate and may collapse, while streaming and stop states remain visible beside the composer action.

## Do's and Don'ts

- Do expose keyboard focus, shortcuts, and predictable tab order.
- Do keep navigation and task context visible during deep workflows.
- Do allow resizable panels while protecting a useful minimum work canvas.
- Do pair hover feedback with focus, selected, or pressed feedback.
- Don't enlarge every control to mobile dimensions.
- Don't hide critical actions behind hover-only affordances.
- Don't round every internal panel when only the outer foreground edge needs it.
- Don't imitate native window buttons or titlebar behavior inside the content theme.
