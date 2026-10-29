import { Link } from "react-router-dom";
import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  CountUp,
  KineticText,
  RoleRotator,
  Stagger,
  StaggerItem,
  WordReveal,
} from "../components/Motion";
import { EASE, popIn } from "../lib/motion";

const Shape3D = lazy(() => import("../components/Shape3D"));

const ArrowRight = () => (
  <svg className="btnArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

function Marquee({ label, items }) {
  return (
    <motion.div
      className="marquee"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className="marqueeLabel">{label}</span>
      <div className="marqueeViewport">
        <div className="marqueeTrack">
          {[0, 1].map((copy) => (
            <ul className="marqueeList" key={copy} aria-hidden={copy === 1}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Stage({ text, ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const copyY = useTransform(progress, [0, 1], ["0%", "-35%"]);
  const copyOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const visualY = useTransform(progress, [0, 1], ["0%", "22%"]);
  const visualScale = useTransform(progress, [0, 1], [1, 0.82]);
  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="stage" ref={ref}>
      <span className="stageGrain" aria-hidden="true" />
      <div className="stageInner">
        <motion.div className="stageCopy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p className="stageKicker" {...fade(0.1)}>
            <span className="stageLive" aria-hidden="true" />
            {text.kicker}
          </motion.p>

          <h1 className="stageName">
            <KineticText text="Antonio-Ștefan" className="stageNameLine" delay={0.15} play={ready} hover />
            <KineticText text="Smărăndescu" className="stageNameLine stageNameAccent" delay={0.45} play={ready} hover />
          </h1>

          <motion.p className="stageRole" {...fade(0.9)}>
            <span>{text.rolePrefix}</span>
            <RoleRotator roles={text.roles} />
          </motion.p>

          <motion.div className="ctaRow stageCtas" {...fade(1.05)}>
            <Link className="btn primary" to="/projects">
              <span>{text.ctaProjects}</span>
              <ArrowRight />
            </Link>
            <Link className="btn stageGhost" to="/experience">{text.ctaExperience}</Link>
          </motion.div>
        </motion.div>

        <motion.div className="stageVisual" style={{ y: visualY, scale: visualScale }}>
          <motion.div
            className="stageVisualInner"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          >
            <span className="stageHalo" aria-hidden="true" />
            <Suspense fallback={null}>
              <Shape3D progress={progress} />
            </Suspense>
          </motion.div>
          {text.hud.map((label, index) => (
            <motion.span
              key={label}
              className={`hudTag hudTag${index + 1}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.1 + index * 0.12 }}
            >
              <span className="hudTagInner">{label}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div className="scrollCue" {...fade(1.4)} aria-hidden="true">
        <span>{text.scrollCue}</span>
        <span className="scrollCueLine" />
      </motion.div>
    </section>
  );
}

export default function Home({ text, ready = true }) {
  // The hero card lifts up over the stage's bottom edge as it scrolls into view.
  const cardRef = useRef(null);
  const { scrollYProgress: cardProgress } = useScroll({ target: cardRef, offset: ["start end", "start 35%"] });
  const cardLift = useSpring(cardProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const cardY = useTransform(cardLift, [0, 1], [90, 0]);
  const cardScale = useTransform(cardLift, [0, 1], [0.94, 1]);
  const cardOpacity = useTransform(cardLift, [0, 1], [0.35, 1]);

  return (
    <>
      <Stage
        text={{ ...text.cinema, ctaProjects: text.ctaProjects, ctaExperience: text.ctaExperience }}
        ready={ready}
      />
      <main className="container">
        <section className="hero">
          <motion.div
            ref={cardRef}
            className="heroCard spotlight"
            style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
          >
            <Stagger className="heroContent" gap={0.1} delay={0.15}>
              <StaggerItem as="p" className="badge">{text.badge}</StaggerItem>
              <h2 className="title">
                <WordReveal text={text.title} delay={0.2} inView />{" "}
                <WordReveal className="titleAccent" text={text.titleAccent} delay={0.45} inView />
              </h2>

              <div className="subtitle">
                {text.paragraphs.map((paragraph, index) => (
                  <StaggerItem as="p" key={paragraph} className={index === 0 ? "subtitleLead" : ""}>
                    {paragraph}
                  </StaggerItem>
                ))}
              </div>

              <StaggerItem className="ctaRow">
                <Link className="btn primary" to="/projects">
                  <span>{text.ctaProjects}</span>
                  <ArrowRight />
                </Link>
                <Link className="btn ghost" to="/contact">{text.ctaContact}</Link>
              </StaggerItem>

              <div className="heroPoints">
                {text.points.map((point) => (
                  <StaggerItem className="heroPoint" key={point.value + point.label}>
                    <strong><CountUp value={point.value} /></strong>
                    <span>{point.label}</span>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>

            <Stagger className="heroSide" gap={0.1} delay={0.3}>
              <StaggerItem className="spotlightPanel">
                <p className="eyebrow">{text.focusEyebrow}</p>
                <h3>{text.focusTitle}</h3>
                <p>{text.focusText}</p>
              </StaggerItem>

              <div className="summaryGrid">
                {text.summary.map((item) => (
                  <StaggerItem className="gridCell" variants={popIn} key={item.title}>
                    <div className="summaryCard spotlight">
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </motion.div>

          <Marquee label={text.stackLabel} items={text.stack} />
        </section>
      </main>
    </>
  );
}
