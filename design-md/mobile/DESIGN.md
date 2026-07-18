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
  compact-visual-control:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: 40px
  button-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.2xl}"
    height: 44px
  button-md:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: 48px
  button-lg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.3xl}"
    height: 56px
  icon-button:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.label}"
    rounded: "{rounded.2xl}"
    size: 44px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: 48px
  menu-row:
    backgroundColor: "{colors.surface}"
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
  temporary-drawer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 16px
    width: 320px
  alert-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.3xl}"
    padding: 24px
    width: 320px
  chat-composer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    rounded: "{rounded.3xl}"
    height: 56px
---

## Overview

CDS Mobile translates the desktop-origin visual language into a touch-first, single-column product experience. Bottom navigation, temporary drawers, sheets, safe-area behavior, and mobile chat flow are new platform translations rather than claims about the current CDS implementation.

Preserve the calm neutral tone and AI-native content hierarchy, but reorganize the experience around reach, interruption, virtual keyboard behavior, and one active task at a time.

## Colors

Keep the canvas bright and neutral. Use dark primary controls sparingly, retain blue focus for switch access and external keyboard use, and pair every status color with text or icon meaning.

Pressed and selected fills should be visible under a finger without producing a saturated flash. Errors use negative text, icon, and nearby guidance; never mark an invalid field only by changing its border color.

## Typography

Body text begins at 16px with a 24px line height. Reading content may use up to 27px line height. Labels begin at 14px and captions at 12px; preserve the same families and weights across semantic roles.

Avoid shrinking content to recover space. Shorten labels, reveal details progressively, or move secondary information to a follow-up surface first.

## Layout

### Phone-first structure

Design for 320–599px phone-first single-column viewports. Apply 16px horizontal gutters, respect top and bottom safe-area insets, and keep the current task above persistent navigation and actions.

Translate a permanent sidebar into three to five bottom navigation destinations. If destinations are numerous or contextual, use a temporary drawer opened by a clearly labeled control. Preserve the information architecture; do not squeeze a desktop sidebar into the phone width.

At 600px and above on a touch device, a limited two-column layout may pair a list with its selected detail. Do not automatically switch to a desktop three-panel shell; input mode and task continuity matter as much as width.

### Keyboard and scrolling

The virtual keyboard reduces the usable viewport. Scroll the focused field and its validation message into view, keep a small visible gap above the keyboard, and let content continue behind neither the keyboard nor a fixed composer.

Only the content region scrolls when top navigation or a bottom composer is fixed. Include top safe area in the header and bottom safe area in navigation or composer padding rather than adding empty decorative bars.

## Elevation & Depth

Use surface separation and a soft scrim for sheets. A bottom sheet handles contextual choices and short forms; a full-screen surface handles multi-step or content-heavy tasks. Reserve a centered alert for a short, urgent decision that cannot wait.

Sheets attach to the bottom edge with rounded top corners, a clear dismiss path, and content that remains reachable above the bottom inset. Stacked sheets are not allowed.

## Shapes

Use 10–16px controls according to size and 16px sheet corners. A 40px visual control is allowed only inside a touch container of at least 44px; the visual bounds and hit bounds may differ.

Avoid excessive pills, but allow full rounding for avatars, status, and compact selection elements. Use standard radius fallback if continuous squircle corners are unavailable.

## Components

### Touch controls

All primary actions, fields, menu rows, navigation items, icon actions, and destructive confirmations have a touch target of at least 44px. The shared touch scale is 40/44/48/56px: 40px is a visual compact size only and must sit inside a 44px hit region.

Every action is understandable without hover. Use immediate pressed feedback, persistent selected styling, visible focus for accessibility input, explicit labels or accessible names, and state icons where they add meaning.

Use SegmentedControl for two or three peer modes that fit without truncation. Use Button and IconButton with a 44px minimum hit area, and Switch for immediate binary settings. A short DropdownMenu may stay anchored to its trigger; longer, descriptive, or destructive choice lists translate into a bottom sheet while preserving the same labels and selection state.

Destructive actions use precise wording and confirmation proportional to consequence. Loading keeps the action footprint stable. Streaming exposes a stop action within thumb reach and does not replace the entire layout with a blocking spinner.

### Mobile AI workspace

Default to a session list followed by one active thread. Do not show removable multi-session tabs across the top of a phone. Back navigation returns to the session list without discarding the current draft.

The thread scrolls independently between its header and composer. User messages remain compact bubbles; assistant answers remain plain reading content. The 56px composer stays above the virtual keyboard and bottom safe area, with send or cancel on the trailing side within thumb reach.

## Do's and Don'ts

- Do keep primary actions reachable and account for safe-area insets.
- Do use pressed, selected, and focus states that remain visible without hover.
- Do move the focused field and its error message above the virtual keyboard.
- Do use a session list before entering one active conversation.
- Don't use a persistent desktop sidebar or three-panel shell.
- Don't place essential information behind hover interactions.
- Don't dock a composer underneath the keyboard or bottom inset.
- Don't present a centered modal for content that needs a sheet or full-screen flow.
