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
    height: 44px
  compact-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: 40px
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
  collapsible-sidebar:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    width: 280px
    padding: 16px
  navigation-rail:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.label}"
    rounded: "{rounded.none}"
    width: 72px
    padding: 12px
  content-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    rounded: "{rounded.lg}"
    padding: 16px
  data-table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 40px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.3xl}"
    width: 600px
    padding: 24px
  popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    width: 320px
    padding: 12px
  chat-composer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    height: 48px
---

## Overview

CDS Responsive Web supports browser-based SaaS and product interfaces from narrow phones to wide workspaces. It combines accessible type and control baselines with keyboard, precision pointer, coarse touch, zoom, and fluid layout behavior.

This profile is neither a desktop AppShell squeezed into a tab nor a native mobile layout stretched across a monitor. It uses browser-native responsiveness while preserving CDS color, shape, density, and AI content tone.

## Colors

Use neutral surfaces to organize dense product information. Dark primary actions remain selective, blue identifies focus, and semantic status colors always include a text or icon cue.

Keep persistent browser regions on the subtle canvas and task content on white surfaces. Avoid decorative gradients, translucent color washes, and multiple saturated accents in product workflows.

## Typography

Body text begins at 16px with 24px line height. Long-form guidance, documentation, and assistant responses use the 27px reading rhythm and a constrained measure.

Dense data UI may use 14px labels or table content with at least 20px line height, but it must not inherit caption styling. Captions are for metadata only. Preserve semantic roles across viewport ranges; change measure and layout before shrinking essential text.

## Layout

### Viewport ranges

- **compact (below 768px):** one content column, 16px gutters, top app header, and collapsible navigation. Secondary regions move below primary content or into an overlay.
- **medium (768–1199px):** flexible main content with 24px gutters and an optional 72px rail or adjacent contextual region. Navigation may expand temporarily without permanently reducing the main task below a useful width.
- **wide (1200px and above):** capped main content, 24–32px gutters, and an optional 280px sidebar or contextual panel. Do not fill the entire monitor with stretched prose.

### Containers and grids

Use a readable text measure near 680px. Forms and settings may cap near 760px; dashboards may use a 1200–1440px content container when data density requires it. Center the capped container only when navigation does not establish a stronger alignment edge.

Use the shared spacing scale for grid gaps and section rhythm. Start with 16px card gaps and 24–32px section gaps, then reduce the number of columns before squeezing cards below their content minimum.

### Browser navigation

Choose a top app header for shallow products or a collapsible sidebar for repeated cross-section work. The sidebar becomes temporary on compact screens, may become a rail at medium, and may remain open at wide.

Do not add operating-system titlebar insets, draggable header regions, or native window controls. Browser and installed-app chrome remain outside this theme.

## Elevation & Depth

Use responsive overlays that remain inside the visible viewport. Dialogs cap their width and height with an internally scrolling body. Popovers and menus detect viewport collision, flip or shift when needed, and keep their trigger relationship understandable.

On compact screens, a complex popover or dialog may become a sheet-like surface attached to an edge. Preserve the same task, labels, and action order during that change. Prefer line and surface hierarchy for persistent regions, soft shadows for overlays, and a restrained scrim for modal focus.

## Shapes

Use 8px controls and cards as the browser baseline, with 12–16px for substantial overlays. Keep rounded geometry consistent when regions reflow, collapse, or move into overlays.

Avoid large pills, oversized editorial cards, and hero-style shapes in product screens. Shape communicates grouping and affordance, not campaign personality.

## Components

### Mixed input

Use 40–44px form controls as the browser baseline. Choose 44px or larger when a coarse pointer is detected or touch is a primary path. A mouse hover may preview interactivity, but keyboard focus, touch pressed feedback, and persistent selected state provide the same functional understanding.

Every pointer-only menu has a keyboard route and a coarse-touch trigger. Tooltips cannot contain the only instructions or action. Zoom and text resizing must not hide controls or force horizontal scrolling in primary content.

Use SegmentedControl for compact view or mode switching, DropdownMenu for collision-aware option and overflow lists, Switch for immediate preferences, and Select for persistent form values. Button and IconButton retain their semantic action hierarchy across breakpoints; only their label presentation or placement may adapt. Never collapse distinct control roles into visually similar custom pills.

### Responsive AI workspace

On compact screens, show one thread with its composer and move session selection into temporary navigation. At medium, session navigation may use a rail or adjacent list. At wide, session navigation, the thread, and optional context may coexist when the thread keeps a readable measure.

User messages remain bubbles, assistant answers remain plain reading content, and tool traces remain subordinate at every range. The composer stays available without covering the last message; when the virtual keyboard appears, it follows the same inset and visibility rules as other browser forms.

## Do's and Don'ts

- Do test compact, medium, and wide ranges with keyboard and coarse touch input.
- Do keep content order and task priority stable while layout changes.
- Do cap readable prose and allow data layouts a wider bounded container.
- Do make popovers and dialogs collision-aware within the visible viewport.
- Don't reproduce desktop window chrome in the browser.
- Don't turn product screens into marketing landing pages by default.
- Don't hide essential functionality behind pointer hover.
- Don't use oversized editorial typography or decorative gradients as product defaults.
