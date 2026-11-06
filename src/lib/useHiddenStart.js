import { useReducedMotion } from "motion/react";

// The hidden state an entrance starts from, or `false` under reduced motion so
// the content is simply there, without waiting for a reveal to fire.
export function useHiddenStart(hidden) {
  return useReducedMotion() ? false : hidden;
}
