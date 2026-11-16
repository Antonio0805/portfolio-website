import { useEffect } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const STAGGER = 70;
const MAX_DELAY = 240;

// Content is visible by default; motion only adds a short, one-time arrival.
// Items that enter the screen together arrive one after another; an item that
// enters alone never waits, which keeps single-column phone layouts brisk.
export function useScrollReveal(pathname) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate)
      return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 700px)");
    const seen = new WeakSet();
    const animations = new Set();
    let observer;

    const stop = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };

    const play = (element, keyframes, options) => {
      const animation = element.animate(keyframes, {
        easing: EASE,
        fill: "backwards",
        ...options,
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };

    const reveal = (target, delay) => {
      const phone = narrow.matches;
      if (target.dataset.reveal === "photo") {
        const timing = { duration: phone ? 520 : 680, delay };
        play(
          target,
          [
            { opacity: 0.6, clipPath: "inset(0 0 10% 0 round 6px)" },
            { opacity: 1, clipPath: "inset(0 0 0% 0 round 6px)" },
          ],
          timing,
        );
        const image = target.querySelector("img");
        if (image) {
          play(
            image,
            [{ transform: "scale(1.04)" }, { transform: "scale(1)" }],
            timing,
          );
        }
        return;
      }
      play(
        target,
        [
          {
            opacity: 0.6,
            transform: `translateY(${phone ? 10 : 16}px)`,
          },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: phone ? 420 : 520, delay },
      );
    };

    const observe = () => {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (preference.matches) return;
          let order = 0;
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting || seen.has(target) || !target.isConnected)
              return;
            seen.add(target);
            observer.unobserve(target);
            reveal(target, Math.min(order * STAGGER, MAX_DELAY));
            order += 1;
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
      );

      document.querySelectorAll("main [data-reveal]").forEach((target) => {
        if (!seen.has(target)) observer.observe(target);
      });
    };

    const frame = requestAnimationFrame(observe);
    preference.addEventListener("change", observe);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", observe);
      stop();
    };
  }, [pathname]);
}
