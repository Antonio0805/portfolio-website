import { useEffect } from "react";

// Content is visible by default; motion only adds a short, one-time arrival.
export function useScrollReveal(pathname) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate)
      return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet();
    const animations = new Set();
    let observer;

    const stop = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };

    const observe = () => {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (preference.matches) return;
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting || seen.has(target) || !target.isConnected)
              return;
            seen.add(target);
            observer.unobserve(target);

            const photo = target.dataset.reveal === "photo";
            const animation = target.animate(
              photo
                ? [
                    { opacity: 0.8, clipPath: "inset(0 0 4% 0 round 6px)" },
                    { opacity: 1, clipPath: "inset(0 0 0% 0 round 6px)" },
                  ]
                : [
                    { opacity: 0.75, transform: "translateY(12px)" },
                    { opacity: 1, transform: "translateY(0)" },
                  ],
              {
                duration: 460,
                delay: Math.min(Number(target.dataset.revealDelay) || 0, 120),
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
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
