// Curves: quint-out for UI under 600ms, expo-out for long reveals, quart in-out
// for wipes and things that travel while visible.
export const EASE = [0.22, 1, 0.36, 1];
export const EXPO = [0.16, 1, 0.3, 1];
export const IN_OUT = [0.76, 0, 0.24, 1];

export const STAGGER = { line: 0.09, item: 0.07, char: 0.03 };

// Reveals fire once, when the element's top reaches ~88% of the viewport.
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

export const SPRING = { type: "spring", stiffness: 420, damping: 34 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
};

export const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export const popIn = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EXPO } },
};

export const lineUp = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EXPO } },
};

export const staggerVariants = (gap = STAGGER.item, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
