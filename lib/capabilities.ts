"use client";

import { useEffect, useState } from "react";

export type Capabilities = {
  /** false until the first effect has run — everything is disabled by default. */
  ready: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  lowCores: boolean;
  smallScreen: boolean;
  /** Single switch the 3D scene reads. */
  canRender3D: boolean;
};

const INITIAL: Capabilities = {
  ready: false,
  reducedMotion: true,
  saveData: false,
  lowCores: true,
  smallScreen: true,
  canRender3D: false,
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Conservative capability probe. Anything we cannot positively confirm is
 * treated as "do not animate" — the static poster is always a safe outcome.
 */
export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(INITIAL);

  useEffect(() => {
    const nav = navigator as NavigatorWithHints;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallQuery = window.matchMedia("(max-width: 767px)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const compute = () => {
      const reducedMotion = motionQuery.matches;
      const saveData =
        nav.connection?.saveData === true ||
        nav.connection?.effectiveType === "slow-2g" ||
        nav.connection?.effectiveType === "2g";
      const cores = nav.hardwareConcurrency ?? 0;
      const lowCores = cores > 0 && cores <= 4;
      const smallScreen = smallQuery.matches;
      // Touch-only devices get the static poster too: parallax has nothing to
      // follow and the battery cost is not worth it.
      const touchOnly = coarseQuery.matches && !window.matchMedia("(pointer: fine)").matches;

      const canRender3D =
        !reducedMotion && !saveData && !lowCores && !smallScreen && !touchOnly;

      setCaps({ ready: true, reducedMotion, saveData, lowCores, smallScreen, canRender3D });
    };

    compute();
    motionQuery.addEventListener("change", compute);
    smallQuery.addEventListener("change", compute);

    return () => {
      motionQuery.removeEventListener("change", compute);
      smallQuery.removeEventListener("change", compute);
    };
  }, []);

  return caps;
}

/**
 * Pauses expensive work when the canvas leaves the viewport or the tab is
 * backgrounded. Returns `true` while rendering is allowed.
 */
export function useActiveWhenVisible<T extends Element>(
  ref: React.RefObject<T | null>,
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let inView = false;
    const sync = () => setActive(inView && document.visibilityState === "visible");

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.01 },
    );
    observer.observe(element);

    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return active;
}
