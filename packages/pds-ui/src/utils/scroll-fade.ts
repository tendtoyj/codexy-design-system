"use client";

import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type FadeEdge = boolean;

interface ScrollFadeMaskOptions {
  top?: FadeEdge;
  bottom?: FadeEdge;
  size?: number;
}

export function getScrollFadeMask({
  top = false,
  bottom = false,
  size = 40,
}: ScrollFadeMaskOptions): string {
  const stops: string[] = [];
  stops.push(top ? "transparent" : `black 0`);
  stops.push(`black ${size}px`);
  stops.push(`black calc(100% - ${size}px)`);
  stops.push(bottom ? "transparent" : `black 100%`);
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

interface UseScrollFadeOptions {
  size?: number;
  threshold?: number;
  /**
   * 페이드를 적용할 가장자리. 미지정 시 양쪽(`{ top: true, bottom: true }`).
   * sticky 헤더처럼 상단에 *가려야 하는 요소* 가 박혀있는 경우 `top: false` 로 비활성.
   * `isScrolledFromTop` / `isScrolledFromBottom` 측정값 자체는 그대로 반환된다.
   */
  edges?: { top?: boolean; bottom?: boolean };
}

interface UseScrollFadeResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  onScroll: React.UIEventHandler<T>;
  maskImage: string;
  isScrolledFromTop: boolean;
  isScrolledFromBottom: boolean;
}

export function useScrollFade<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollFadeOptions = {},
): UseScrollFadeResult<T> {
  const { size = 40, threshold = 1, edges } = options;
  const topEnabled = edges?.top ?? true;
  const bottomEnabled = edges?.bottom ?? true;
  const ref = React.useRef<T>(null);
  const [isScrolledFromTop, setIsScrolledFromTop] = React.useState(false);
  const [isScrolledFromBottom, setIsScrolledFromBottom] = React.useState(false);

  const measure = React.useCallback(
    (el: T) => {
      const fromTop = el.scrollTop > threshold;
      const fromBottom = el.scrollHeight - el.clientHeight - el.scrollTop > threshold;
      setIsScrolledFromTop(fromTop);
      setIsScrolledFromBottom(fromBottom);
    },
    [threshold],
  );

  const onScroll = React.useCallback<React.UIEventHandler<T>>(
    (event) => measure(event.currentTarget),
    [measure],
  );

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure(el);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure(el));
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const maskImage = React.useMemo(
    () =>
      getScrollFadeMask({
        top: topEnabled && isScrolledFromTop,
        bottom: bottomEnabled && isScrolledFromBottom,
        size,
      }),
    [topEnabled, bottomEnabled, isScrolledFromTop, isScrolledFromBottom, size],
  );

  return { ref, onScroll, maskImage, isScrolledFromTop, isScrolledFromBottom };
}

export type { ScrollFadeMaskOptions, UseScrollFadeOptions, UseScrollFadeResult };
