import type { Variants } from "framer-motion";

const standard: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const pdsStepIn: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: standard },
  },
};

export const pdsCardIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: standard },
  },
};

export const pdsFadeCollapse: Variants = {
  open: { opacity: 1, height: "auto", transition: { duration: 0.25, ease: standard } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.25, ease: standard } },
};

export const pdsEasing = {
  standard,
  linear: "linear" as const,
} as const;

export const pdsDuration = {
  instant: 0.08,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.45,
  glow: 2,
} as const;
