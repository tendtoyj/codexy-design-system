import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { twMergeConfig } from "./tw-merge-config.js";

const twMerge = extendTailwindMerge(twMergeConfig);

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
