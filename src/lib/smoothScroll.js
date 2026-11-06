import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis = null;

// Weighted scrolling for mouse and trackpad only. Touch and reduced motion keep
// native scrolling. Lenis drives the real scroll position, so `useScroll` and
// sticky positioning keep working unchanged.
export function useSmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      return undefined;
    }

    lenis = new Lenis({ lerp: 0.12, autoRaf: true, anchors: true });
    return () => {
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
