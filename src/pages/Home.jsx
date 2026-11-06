import { Link } from "react-router-dom";
import { lazy, Suspense, useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  InkFill,
  KineticText,
  Magnetic,
  Reveal,
  RoleRotator,
  RollText,
  RollingFigure,
  Stagger,
  SheetSection,
  StaggerItem,
  WordReveal,
} from "../components/Motion";
import { EXPO, IN_OUT } from "../lib/motion";
import { projectImage } from "../lib/media";
import { useHiddenStart } from "../lib/useHiddenStart";
import { ArrowRight, ArrowUpRight, DownloadIcon } from "../components/Icons";

const ParticleField = lazy(() => import("../components/ParticleField"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const captionParts = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
};

// Heights of the scene's parts, in svh: the hero, then each caption and the
// closing monogram. Kept in step with `.hero`, `.fieldStep` and `.fieldEnd`.
const HERO_SVH = 100;
const STEP_SVH = 80;

// The hero and the four "model" captions scroll over one held canvas. The field
// reaches each caption's shape as that caption crosses the middle of the screen.
function FieldScene({ text, cvLabel, live, onFail }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const steps = text.summary.length;
  // Scroll distance through the scene: everything after the first screen.
  const runway = HERO_SVH + STEP_SVH * (steps + 1) - 100;
  const firstCentre = HERO_SVH - 50 + STEP_SVH / 2;
  const morph = useTransform(scrollYProgress, (progress) => {
    const scrolled = progress * runway;
    const position = scrolled < firstCentre ? scrolled / firstCentre : 1 + (scrolled - firstCentre) / STEP_SVH;
    const whole = Math.floor(position);
    return Math.min(steps + 1, whole + smoothstep(0.3, 0.85, position - whole));
  });
  const heroY = useTransform(scrollYProgress, [0, HERO_SVH / runway], ["0%", "-18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, (0.8 * HERO_SVH) / runway], [1, 0]);
  const { cinema } = text;
  const stepStart = useHiddenStart("hidden");

  return (
    <section ref={ref} className={`chapter field${live ? " isLive" : ""}`} data-chapter="ink">
      {live ? (
        <div className="fieldStage">
          <Suspense fallback={null}>
            <ParticleField morph={morph} onFail={onFail} />
          </Suspense>
        </div>
      ) : null}

      <div className="fieldContent">
        <motion.header className="hero wrap" style={live ? { y: heroY, opacity: heroOpacity } : undefined}>
          <h1 className="heroName">
            <KineticText text="Antonio-Ștefan" className="heroLine" delay={0.3} gap={0.022} />
            <KineticText text="Smărăndescu" className="heroLine" delay={0.42} gap={0.022} />
          </h1>

          <motion.div
            className="heroFoot"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.6 }}
          >
            <div className="heroLines">
              <p className="heroKicker">
                <span className="liveDot" aria-hidden="true" />
                {cinema.kicker}
              </p>
              <p className="heroRole">
                <span>{cinema.rolePrefix}</span>
                <RoleRotator roles={cinema.roles} />
              </p>
            </div>
            <div className="ctaRow">
              <Magnetic>
                <a className="btn primary cvBtn" href="/cv.pdf" target="_blank" rel="noreferrer">
                  <DownloadIcon />
                  <RollText>{cvLabel}</RollText>
                  <span className="cvTag">PDF</span>
                </a>
              </Magnetic>
              <Magnetic>
                <Link className="btn ghost" to="/projects">
                  <RollText>{text.ctaProjects}</RollText>
                  <ArrowRight />
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="heroMeta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ul className="heroTools">
              {cinema.hud.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <span className="scrollCue">
              {cinema.scrollCue}
              <span className="scrollCueLine" aria-hidden="true" />
            </span>
          </motion.div>
        </motion.header>

        <ol className="fieldSteps wrap">
          {text.summary.map((item, index) => (
            <motion.li
              key={item.title}
              className="fieldStep"
              initial={stepStart}
              whileInView="show"
              viewport={{ amount: 0.6 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              <div className="stepCard">
                <motion.h3 className="stepTitle" variants={captionParts}>{item.title}</motion.h3>
                <motion.p className="stepText" variants={captionParts}>{item.text}</motion.p>
                <motion.span className="stepCount" variants={captionParts}>
                  {index + 1}/{text.summary.length}
                </motion.span>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="fieldEnd wrap">
          <Reveal as="p" className="fieldBadge">{text.badge}</Reveal>
        </div>
      </div>
    </section>
  );
}

function About({ text, title }) {
  return (
    <SheetSection className="about" chapter="paper" under="ink">
      <div className="wrap aboutGrid">
        <WordReveal as="h2" className="sectionTitle aboutTitle" text={title} inView />
        <div className="aboutCopy">
          <InkFill className="statement" text={`${text.title} ${text.titleAccent}`} />
          <Stagger className="aboutBody" delay={0.1}>
            {text.paragraphs.map((paragraph) => (
              <StaggerItem as="p" key={paragraph}>{paragraph}</StaggerItem>
            ))}
            <StaggerItem className="ctaRow">
              <Magnetic>
                <Link className="btn primary" to="/contact">
                  <RollText>{text.ctaContact}</RollText>
                  <ArrowRight />
                </Link>
              </Magnetic>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      <div className="figures" data-chapter="slate">
        <Stagger as="ul" className="wrap figureGrid" gap={0.09}>
          {text.points.map((point) => (
            <StaggerItem as="li" className="figure" key={point.value + point.label}>
              <RollingFigure className="figureValue" value={point.value} />
              <p className="figureLabel">{point.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </SheetSection>
  );
}

const CV_LINKS = [
  { to: "/experience", key: "experience" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/education", key: "education" },
];

// The CV, shown as the document it is: its first page tilts up into place as
// the section arrives and straightens under the pointer.
function CvSection({ nav, text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, -3]);
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <SheetSection className="cvSection" chapter="mist" under="slate">
      <div ref={ref} className="wrap cvGrid">
        <div className="cvCopy">
          <WordReveal as="h2" className="sectionTitle" text={nav.downloadCv} inView />
          <Reveal as="p" className="cvLead" delay={0.05}>{text.badge}</Reveal>
          <Reveal className="ctaRow" delay={0.1}>
            <Magnetic>
              <a className="btn primary cvBtn cvBtnLarge" href="/cv.pdf" target="_blank" rel="noreferrer">
                <DownloadIcon />
                <RollText>{nav.downloadCv}</RollText>
                <span className="cvTag">PDF</span>
              </a>
            </Magnetic>
          </Reveal>
          <Stagger as="ul" className="cvJump" delay={0.15}>
            {CV_LINKS.map(({ to, key }) => (
              <StaggerItem as="li" key={to}>
                <Link to={to}>
                  <RollText>{nav[key]}</RollText>
                  <ArrowUpRight />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <motion.a
          className="cvPreview"
          href="/cv.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label={`${nav.downloadCv} (PDF)`}
          style={{ rotate, y, scale }}
        >
          <span className="cvPaper">
            <img src="/cv-preview.jpg" alt="First page of Antonio-Ștefan Smărăndescu's CV" loading="lazy" />
          </span>
        </motion.a>
      </div>
    </SheetSection>
  );
}

// A row of the work that slides sideways while the vertical scroll holds the
// stage. On touch screens it is a plain swipeable row.
function Work({ projects, cta }) {
  const ref = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
  const cardStart = useHiddenStart({ opacity: 0, y: 40 });
  const items = projects.projects.map((project) => ({ ...project, image: projectImage(project) })).filter((p) => p.image);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const shift = pinned ? travel : 0;
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -shift]);

  // Pinned on wide screens with a mouse; a plain grid everywhere else.
  useLayoutEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => setPinned(query.matches && !reduceMotion);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduceMotion]);

  // The row is laid out in one line once pinned; measure how far it must travel.
  useLayoutEffect(() => {
    if (!pinned) {
      return undefined;
    }
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      setTravel(track && viewport ? Math.max(0, track.offsetWidth - viewport.clientWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, items.length]);

  // Keyboard focus on a card scrolls the page to where that card is in view.
  const onFocusCard = (index) => {
    const section = ref.current;
    if (!shift || !section) {
      return;
    }
    const top = section.getBoundingClientRect().top + window.scrollY;
    const runway = section.offsetHeight - window.innerHeight;
    const progress = 0.08 + (index / Math.max(1, items.length - 1)) * 0.84;
    window.scrollTo({ top: top + runway * progress, behavior: "instant" });
  };

  return (
    <section
      ref={ref}
      className={`chapter work${pinned ? " isPinned" : ""}`}
      data-chapter="ink"
      style={pinned ? { height: `calc(100svh + ${shift}px)` } : undefined}
    >
      <div className="workStage">
        <div className="wrap workHead">
          <WordReveal as="h2" className="sectionTitle" text={projects.title} inView />
          <Reveal as="p" className="sectionLead">{projects.lead}</Reveal>
          <Reveal className="workCta" delay={0.1}>
            <Magnetic>
              <Link className="btn primary" to="/projects">
                <RollText>{cta}</RollText>
                <ArrowRight />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <div className="workViewport" ref={viewportRef}>
          <motion.ul className="workTrack" ref={trackRef} style={pinned ? { x } : undefined}>
            {items.map((project, index) => (
              <motion.li
                key={project.title}
                className="workCard"
                initial={cardStart}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EXPO, delay: Math.min(index, 4) * 0.07 }}
              >
                <Link to="/projects" onFocus={() => onFocusCard(index)}>
                  <span className="workMedia">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className={project.previewFit === "contain" ? "contain" : ""}
                    />
                  </span>
                  <span className="workTitle">{project.title}</span>
                  <span className="workTags">{project.tags.join(" · ")}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function Focus({ text }) {
  return (
    <SheetSection className="focus" chapter="paper" under="ink">
      <div className="wrap focusGrid">
        <Reveal as="p" className="sideLabel">{text.focusEyebrow}</Reveal>
        <div>
          <WordReveal as="h2" className="sectionTitle" text={text.focusTitle} inView />
          <Reveal as="p" className="focusText" delay={0.1}>{text.focusText}</Reveal>
          <Stagger as="ul" className="focusRoles" delay={0.15}>
            {text.cinema.roles.map((role) => (
              <StaggerItem as="li" key={role}>{role}</StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </SheetSection>
  );
}

// Each tool is drawn open from its left edge, one after another.
const chipIn = {
  hidden: { clipPath: "inset(0% 100% 0% 0% round 999px)" },
  show: { clipPath: "inset(0% 0% 0% 0% round 999px)", transition: { duration: 0.7, ease: IN_OUT } },
};

function Stack({ label, items }) {
  return (
    <SheetSection className="stack" chapter="slate" under="paper">
      <div className="wrap stackGrid">
        <WordReveal as="h2" className="sectionTitle" text={label} inView />
        <Stagger as="ul" className="stackList" gap={0.045}>
          {items.map((item) => (
            <StaggerItem as="li" key={item} className="stackItem" variants={chipIn}>
              {item}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </SheetSection>
  );
}

export default function Home({ text, nav, projects }) {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState(hasWebGL);
  const onFail = useCallback(() => setWebgl(false), []);

  return (
    <main className="siteMain">
      <FieldScene text={text} cvLabel={nav.downloadCv} live={webgl && !reduceMotion} onFail={onFail} />
      <About text={text} title={nav.about} />
      <CvSection nav={nav} text={text} />
      <Work projects={projects} cta={text.ctaProjects} />
      <Focus text={text} />
      <Stack label={text.stackLabel} items={text.stack} />
    </main>
  );
}
