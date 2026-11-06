import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionHead from "./SectionHead";
import { Reveal, RollText, RollingFigure, Stagger, StaggerItem, WordReveal } from "./Motion";
import { ExternalIcon, GitHubIcon, YouTubeIcon } from "./Icons";
import { EXPO, IN_OUT } from "../lib/motion";
import { isYouTubeUrl, projectImage } from "../lib/media";
import { useHiddenStart } from "../lib/useHiddenStart";

function Actions({ project, text, liveLabel }) {
  return (
    <div className="projectActions">
      {project.github ? (
        <a className="btn small" href={project.github} target="_blank" rel="noreferrer">
          <GitHubIcon />
          <RollText>{text.github}</RollText>
        </a>
      ) : null}

      {!project.demo ? (
        <span className="smallNote">{text.demoSoon}</span>
      ) : isYouTubeUrl(project.demo) ? (
        <a className="btn small primary" href={project.demo} target="_blank" rel="noreferrer">
          <YouTubeIcon />
          <RollText>YouTube</RollText>
        </a>
      ) : (
        <a className="btn small primary" href={project.demo} target="_blank" rel="noreferrer">
          <ExternalIcon />
          <RollText>{liveLabel}</RollText>
        </a>
      )}
    </div>
  );
}

// The featured project's picture opens from a window in the middle of a held
// screen to the full screen.
function Featured({ project, text }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(16% 20% 16% 20%)", "inset(0% 0% 0% 0%)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.3, 1]);
  const opening = !reduceMotion;
  const metrics = project.metrics || text.metrics;

  return (
    <section className="chapter featured" data-chapter="ink">
      <div className="wrap featuredHead">
        <WordReveal as="h2" className="sectionTitle" text={project.title} inView />
        <Reveal as="p" className="featuredTags" delay={0.1}>
          {[text.featured, ...project.tags].join(" · ")}
        </Reveal>
      </div>
      <div ref={ref} className={`featuredRunway${opening ? " isOpening" : ""}`}>
        <div className="featuredStage">
          <motion.figure className="featuredWindow" style={opening ? { clipPath } : undefined}>
            <motion.img
              src={projectImage(project)}
              alt={`${project.title} preview`}
              style={opening ? { scale } : undefined}
            />
          </motion.figure>
        </div>
      </div>

      <div className="wrap featuredBody">
        <Reveal as="p" className="featuredDesc">{project.description}</Reveal>
        <div className="featuredSide">
          <Stagger as="ul" className="featuredMetrics">
            {metrics.map((metric) => (
              <StaggerItem as="li" key={metric}>
                <RollingFigure value={metric} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <Actions project={project} text={text} liveLabel={text.liveDemo} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DeckCard({ src, alt, index, total, progress }) {
  const offset = index - (total - 1) / 2;
  const x = useTransform(progress, [0, 1], ["0%", `${offset * 58}%`]);
  const y = useTransform(progress, [0, 1], [`${index * -3}%`, `${Math.abs(offset) * 8}%`]);
  const rotate = useTransform(progress, [0, 1], [index * 2 - 3, offset * 7]);

  return (
    <motion.figure className="deckCard" style={{ x, y, rotate, zIndex: total - Math.abs(Math.round(offset)) }}>
      <img src={src} alt={alt} loading="lazy" />
    </motion.figure>
  );
}

// The generated covers come in as a stacked deck and are dealt out into a fan.
function Showcase({ project, text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const images = project.showcaseImages || [];

  return (
    <section ref={ref} className="chapter showcase" data-chapter="slate">
      <div className="wrap showcaseGrid">
        <div className="showcaseCopy">
          <WordReveal as="h2" className="sectionTitle showcaseTitle" text={project.title} inView />
          <Reveal as="p" className="featuredTags" delay={0.05}>
            {[text.featured, ...project.tags].join(" · ")}
          </Reveal>
          <Reveal as="p" className="showcaseDesc" delay={0.1}>{project.description}</Reveal>
          <Reveal delay={0.15}>
            <Actions project={project} text={text} liveLabel={text.liveDemo} />
          </Reveal>
        </div>
        <div className="deck">
          {images.map((image, index) => (
            <DeckCard
              key={image}
              src={image}
              alt={`${project.title} preview ${index + 1}`}
              index={index}
              total={images.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const shutter = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: IN_OUT } },
};

const settle = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.4, ease: EXPO } },
};

// Every other project as a row: name, picture, description and links. On hover
// the row fills with ink from the bottom.
function ProjectRow({ project, text }) {
  const image = projectImage(project);
  const initial = useHiddenStart("hidden");
  return (
    <motion.li
      className="indexRow"
      initial={initial}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <div className="indexName">
        <WordReveal as="h3" className="indexTitle" text={project.title} inView />
        <p className="indexTags">{project.tags.join(" · ")}</p>
      </div>
      {image ? (
        <motion.figure className="indexMedia" variants={shutter}>
          <motion.img
            src={image}
            alt={`${project.title} preview`}
            className={project.previewFit === "contain" ? "contain" : ""}
            variants={settle}
          />
        </motion.figure>
      ) : (
        <span className="indexMedia" aria-hidden="true" />
      )}
      <div className="indexBody">
        <p>{project.description}</p>
        <Actions project={project} text={text} liveLabel={text.live} />
      </div>
    </motion.li>
  );
}

export default function Projects({ text }) {
  const featured = text.projects.find((p) => p.featured);
  const showcase = text.projects.find((p) => p.showcase);
  const rest = text.projects.filter((p) => !p.featured && !p.showcase);

  return (
    <>
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} chapter="paper" />
      {featured ? <Featured project={featured} text={text} /> : null}
      {showcase ? <Showcase project={showcase} text={text} /> : null}
      <section className="chapter projectIndex" data-chapter="paper" aria-label={text.title}>
        <ul className="wrap indexList">
          {rest.map((project) => (
            <ProjectRow key={project.title} project={project} text={text} />
          ))}
        </ul>
      </section>
    </>
  );
}
