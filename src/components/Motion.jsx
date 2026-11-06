import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useFinePointer } from "../lib/useFinePointer";
import { useHiddenStart } from "../lib/useHiddenStart";
import { EASE, EXPO, IN_OUT, STAGGER, VIEWPORT, fadeUp, lineUp, staggerVariants } from "../lib/motion";

// A quiet change of page: the old page fades and lifts away quickly, the new
// one fades in and settles from a little below. Nothing covers the screen.
const pageVariants = {
  initial: { opacity: 0, y: 28 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO, delay: 0.05 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: EASE } },
};

export function PageTransition({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

// A chapter that arrives as a sheet: it rises with rounded top corners from
// slightly smaller than the page and settles flat and full width as its top
// reaches the upper third of the screen. `under` is the chapter colour seen
// around it while it settles.
export function SheetSection({ chapter, under, className = "", children, ...rest }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div className="sheetUnder" data-chapter={under}>
      <motion.section
        ref={ref}
        className={`chapter sheet ${className}`}
        data-chapter={chapter}
        style={reduceMotion ? undefined : { borderTopLeftRadius: radius, borderTopRightRadius: radius, scale }}
        {...rest}
      >
        {children}
      </motion.section>
    </div>
  );
}

export function Reveal({ as = "div", delay = 0, y = 24, children, ...rest }) {
  const Tag = motion[as];
  const initial = useHiddenStart({ opacity: 0, y });
  return (
    <Tag
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EXPO, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ as = "div", gap = STAGGER.item, delay = 0, onMount = false, children, ...rest }) {
  const Tag = motion[as];
  const initial = useHiddenStart("hidden");
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Tag initial={initial} variants={staggerVariants(gap, delay)} {...trigger} {...rest}>
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

const HEADING_VIEWPORT = { once: true, margin: "0px 0px -3% 0px" };

// Words rise from behind their own baseline. Used for headings whose text comes
// from content in two languages, so line breaks cannot be set by hand.
export function WordReveal({ text, as = "span", className, delay = 0, inView = false }) {
  const Tag = motion[as];
  const initial = useHiddenStart("hidden");
  const words = text.split(" ");
  // Headings rise a little earlier than body reveals, so none waits masked at the foot of the screen.
  const trigger = inView ? { whileInView: "show", viewport: HEADING_VIEWPORT } : { animate: "show" };
  return (
    <Tag className={className} initial={initial} variants={staggerVariants(0.05, delay)} {...trigger}>
      <span className="srOnly">{text}</span>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="wordMask">
            <motion.span className="word" variants={lineUp}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

const charVariants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EXPO } },
};

// Character rise, for the name lines in the hero and the footer.
export function KineticText({ text, as = "span", className = "", delay = 0, gap = STAGGER.char, inView = false }) {
  const Tag = motion[as];
  const initial = useHiddenStart("hidden");
  const words = text.split(" ");
  const trigger = inView ? { whileInView: "show", viewport: HEADING_VIEWPORT } : { animate: "show" };

  return (
    <Tag className={`kinetic ${className}`} initial={initial} variants={staggerVariants(gap, delay)} {...trigger}>
      <span className="srOnly">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true">
          <span className="kineticWord">
            {Array.from(word).map((char, charIndex) => (
              <motion.span key={charIndex} className="kineticChar" variants={charVariants}>
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
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.7, ease: IN_OUT }}
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Text that rolls up to a copy of itself on hover or focus of the nearest link.
// The copy is drawn by CSS, so it is never read twice.
export function RollText({ children }) {
  return (
    <span className="roll" data-text={typeof children === "string" ? children : undefined}>
      <span className="rollText">{children}</span>
    </span>
  );
}

// Pulls its child towards the pointer, at most `max` pixels, and springs back.
export function Magnetic({ children, className = "", strength = 0.3, max = 8 }) {
  const fine = useFinePointer();
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });
  const enabled = fine && !reduceMotion;

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clamp = (value) => Math.max(-max, Math.min(max, value));
    x.set(clamp((event.clientX - rect.left - rect.width / 2) * strength));
    y.set(clamp((event.clientY - rect.top - rect.height / 2) * strength));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`magnetic ${className}`}
      style={enabled ? { x, y } : undefined}
      onPointerMove={enabled ? onPointerMove : undefined}
      onPointerLeave={enabled ? onPointerLeave : undefined}
    >
      {children}
    </motion.span>
  );
}

function InkWord({ progress, start, end, children }) {
  const opacity = useTransform(progress, [start, end], [0.45, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

// A statement whose words fill from 45% to full ink as it rises through the screen.
export function InkFill({ text, as = "p", className = "" }) {
  const ref = useRef(null);
  const Tag = as;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 50%"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`inkFill ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <InkWord progress={scrollYProgress} start={index / words.length} end={(index + 1) / words.length}>
            {word}
          </InkWord>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

const DIGITS = "0123456789";

// Each digit is a column of 0-9 (drawn by CSS) that rolls to its value once it
// enters the screen.
export function RollingFigure({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Runs of letters stay together so words wrap whole; each digit is a column,
  // numbered so the columns start one after another.
  const parts = [];
  let digits = 0;
  for (const char of value) {
    const last = parts[parts.length - 1];
    if (DIGITS.includes(char)) {
      parts.push({ digit: Number(char), order: digits });
      digits += 1;
    } else if (last && last.text !== undefined) {
      last.text += char;
    } else {
      parts.push({ text: char });
    }
  }

  return (
    <span ref={ref} className={`rollingFigure ${className}`}>
      <span className="srOnly">{value}</span>
      {parts.map((part, index) =>
        part.text !== undefined ? (
          <span key={index} className="figureChar" aria-hidden="true">
            {part.text}
          </span>
        ) : (
          <span key={index} className="figureColumn" aria-hidden="true">
            <motion.span
              className="figureStrip"
              initial={{ y: "0%" }}
              animate={inView ? { y: `${-part.digit * 10}%` } : { y: "0%" }}
              transition={{ duration: 1.4, ease: EXPO, delay: 0.1 + part.order * 0.08 }}
            />
          </span>
        )
      )}
    </span>
  );
}

// A thin bar that fills as its list scrolls through the screen.
export function ScrollProgressLine({ target, className = "" }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 70%", "end 60%"] });
  return <motion.span className={className} style={{ scaleY: scrollYProgress }} aria-hidden="true" />;
}

