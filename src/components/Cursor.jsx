import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { EASE } from "../lib/motion";
import { useFinePointer } from "../lib/useFinePointer";

const ICONS = {
  open: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  ),
  play: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  ),
  copy: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  drag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
    </svg>
  ),
};

// A dot that trails the system cursor and opens into an icon disc over anything
// marked with `data-cursor`. Fine pointers only; off under reduced motion.
export default function Cursor() {
  const fine = useFinePointer();
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 50, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 50, mass: 0.4 });
  const [mode, setMode] = useState(null);
  const [visible, setVisible] = useState(false);
  const enabled = fine && !reduceMotion;

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target.closest?.("[data-cursor], a, button");
      if (!target) {
        setMode(null);
      } else {
        setMode(target.dataset.cursor || "link");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  const icon = ICONS[mode];
  const scale = icon ? 1 : mode === "link" ? 0.55 : 0.22;

  return (
    <motion.div className="cursor" style={{ x: springX, y: springY }} aria-hidden="true">
      <motion.div
        className="cursorDisc"
        animate={{ scale, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.span
          className="cursorIcon"
          animate={{ opacity: icon ? 1 : 0, scale: icon ? 1 : 0.4 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {icon}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
