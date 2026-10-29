export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN = [0.4, 0, 1, 1];

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

export const SPRING = { type: "spring", stiffness: 420, damping: 34 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export const popIn = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 26 } },
};

export const staggerVariants = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
