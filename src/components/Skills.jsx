import { motion } from "motion/react";
import SectionHead from "./SectionHead";
import { Reveal, Stagger, StaggerItem } from "./Motion";
import { popIn, slideIn } from "../lib/motion";

const LEVEL_DOTS = {
  Fluent: 5,
  Fluenta: 5,
  Native: 5,
  Advanced: 4,
  Avansat: 4,
  Intermediate: 3,
  Intermediar: 3,
  Basic: 2,
  Beginner: 1,
  Incepator: 1,
};

const SVG_PROPS = {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const ANALYTICS_ICON = (
  <svg {...SVG_PROPS}>
    <path d="M3 3v18h18" />
    <path d="M8 17v-5" />
    <path d="M13 17V8" />
    <path d="M18 17v-9" />
  </svg>
);

const CODE_ICON = (
  <svg {...SVG_PROPS}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const AI_ICON = (
  <svg {...SVG_PROPS}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
  </svg>
);

const GROUP_ICONS = {
  "SAP & Analytics": ANALYTICS_ICON,
  "SAP & Analiza": ANALYTICS_ICON,
  Development: CODE_ICON,
  Dezvoltare: CODE_ICON,
  "AI & Tools": AI_ICON,
  "AI & Tool-uri": AI_ICON,
};

const dotVariants = {
  hidden: { scale: 0.3, opacity: 0.2 },
  show: (index) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 20, delay: 0.2 + index * 0.08 },
  }),
};

function LanguageDots({ filled }) {
  const total = 5;
  return (
    <span className="languageDots" aria-label={`Level ${filled} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={dotVariants}
          className={`languageDot${i < filled ? " filled" : ""}`}
        />
      ))}
    </span>
  );
}

export default function Skills({ text }) {
  return (
    <section id="skills" className="section">
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

      <div className="twoCol">
        <Reveal className="card skillsCard spotlight">
          <h3 className="cardTitle">{text.core}</h3>
          <div className="skillsGrid">
            {text.groups.map((group) => (
              <Stagger className="skillGroup" key={group.title} gap={0.04}>
                <StaggerItem as="span" className="pill skillGroupPill" variants={slideIn}>
                  {GROUP_ICONS[group.title] || null}
                  <span>{group.title}</span>
                </StaggerItem>
                <div className="skillRow">
                  {group.items.map((item) => (
                    <StaggerItem
                      as="span"
                      key={item}
                      className="chip"
                      variants={popIn}
                      whileHover={{ y: -3 }}
                    >
                      {item}
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            ))}
          </div>
        </Reveal>

        <Reveal className="card spotlight" delay={0.12}>
          <h3 className="cardTitle">{text.languagesTitle}</h3>
          <Stagger className="languageList" gap={0.12}>
            {text.languages.map((language) => {
              const filled = LEVEL_DOTS[language.level] ?? 3;
              return (
                <StaggerItem className="languageRow" key={language.name}>
                  <div className="languageInfo">
                    <span className="languageName">{language.name}</span>
                    <span className="languageLevel">{language.level}</span>
                  </div>
                  <LanguageDots filled={filled} />
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
