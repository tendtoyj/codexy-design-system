---
"@tendtoyj/cds-ui": patch
---

Stabilize the source-only UI registry for the `0.2.2` migration baseline.

- Redesign `Toast` as a bottom-center, message-only Montage-style surface. Variants are now `normal`, `positive`, `cautionary`, `negative`, and `question`; use `Snackbar` when close, action, title, or description controls are required.
- Add `Snackbar` with leading status/custom icons, title, description, action, and close slots.
- Replace nine invalid `--cds-motion-duration-fast` references with the defined `--cds-duration-fast` token and add a namespace regression check.
- Add immutable `/r/0.2.2/*` registry artifacts whose CDS package dependencies and nested registry dependencies are pinned to the same release.
