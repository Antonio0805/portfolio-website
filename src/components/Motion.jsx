import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { EASE, EASE_IN, VIEWPORT, fadeUp, staggerVariants } from "../lib/motion";

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: EASE },
        transitionEnd: { filter: "none" },
      }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.24, ease: EASE_IN } }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ as = "div", delay = 0, y = 28, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ as = "div", gap = 0.08, delay = 0, onMount = false, children, ...rest }) {
  const Tag = motion[as];
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Tag initial="hidden" variants={staggerVariants(gap, delay)} {...trigger} {...rest}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", variants = fadeUp, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

const wordVariants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

export function WordReveal({ text, className, delay = 0, inView = false }) {
  const words = text.split(" ");
  const trigger = inView ? { whileInView: "show", viewport: VIEWPORT } : { animate: "show" };
  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={staggerVariants(0.06, delay)}
      {...trigger}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="wordMask">
            <motion.span className="word" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

export function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const match = /^(\d+)(\D*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const count = useMotionValue(reduceMotion ? target : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const controls = animate(count, target, { duration: reduceMotion ? 0 : 1.6, ease: EASE });
    return () => controls.stop();
  }, [count, inView, reduceMotion, target]);

  if (!match) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {match[2]}
    </span>
  );
}

export function Timeline({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <div className="timeline" ref={ref}>
      <motion.span className="timelineProgress" style={{ scaleY }} aria-hidden="true" />
      {children}
    </div>
  );
}

export function TimelineItem({ active = false, children }) {
  return (
    <motion.article
      className="timelineItem"
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="timelineMarkerWrap">
        <motion.span
          className={`timelineMarker${active ? " timelineMarkerActive" : ""}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.25 }}
        />
      </div>
      {children}
    </motion.article>
  );
}

const charVariants = {
  hidden: { y: "0.9em", rotateX: -85, opacity: 0, filter: "blur(8px)" },
  show: {
    y: "0em",
    rotateX: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
    transitionEnd: { filter: "none" },
  },
};

// Character-level 3D flip-in. `play` lets a parent hold the animation (e.g. behind the intro).
export function KineticText({ text, as = "span", className = "", delay = 0, gap = 0.035, inView = false, play = true, hover = false }) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: VIEWPORT }
    : { animate: play ? "show" : "hidden" };

  return (
    <Tag className={`kinetic ${className}`} initial="hidden" variants={staggerVariants(gap, delay)} {...trigger}>
      <span className="srOnly">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true">
          <span className="kineticWord">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="kineticChar"
                variants={charVariants}
                whileHover={hover ? { y: "-0.14em", transition: { type: "spring", stiffness: 500, damping: 14 } } : undefined}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

export function RoleRotator({ roles, interval = 2600 }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const id = setInterval(() => setIndex((current) => current + 1), interval);
    return () => clearInterval(id);
  }, [interval, reduceMotion]);

  const role = roles[index % roles.length];

  return (
    <span className="roleRotator" aria-live="off">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={role}
          className="roleWord"
          initial={{ y: "100%", rotateX: -70, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-100%", rotateX: 70, opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1];

export function Intro({ show, label }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="intro"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.9, ease: CURTAIN_EASE } }}
          aria-hidden="true"
        >
          <motion.span
            className="introMark"
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            AS
          </motion.span>
          <KineticText className="introName" text={label} delay={0.2} gap={0.025} />
          <motion.span
            className="introBar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: CURTAIN_EASE }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
