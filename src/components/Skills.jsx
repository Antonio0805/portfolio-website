import { useState } from "react";
import { motion } from "motion/react";
import SectionHead from "./SectionHead";
import { Stagger, StaggerItem, WordReveal } from "./Motion";
import { EXPO, popIn } from "../lib/motion";

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

export default function Skills({ text }) {
  // Hovering one group quietens the others so it reads on its own.
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} chapter="slate" />

      <section className="chapter skills" data-chapter="ink">
        <div className="wrap">
          <WordReveal as="h2" className="sectionTitle" text={text.core} inView />
          <ul className="skillGroups" onPointerLeave={() => setHovered(null)}>
            {text.groups.map((group, index) => (
              <li
                key={group.title}
                className={`skillGroup${hovered !== null && hovered !== index ? " isDim" : ""}`}
                onPointerEnter={() => setHovered(index)}
              >
                <h3 className="skillGroupTitle">
                  {group.title}
                  <sup>{group.items.length}</sup>
                </h3>
                <Stagger as="ul" className="skillItems" gap={0.04}>
                  {group.items.map((item) => (
                    <StaggerItem as="li" key={item} className="skillItem" variants={popIn}>
                      {item}
                    </StaggerItem>
                  ))}
                </Stagger>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter languages" data-chapter="paper">
        <div className="wrap langGrid">
          <WordReveal as="h2" className="sectionTitle" text={text.languagesTitle} inView />
          <Stagger as="ul" className="langList" gap={0.1}>
            {text.languages.map((language) => {
              const filled = LEVEL_DOTS[language.level] ?? 3;
              return (
                <StaggerItem as="li" className="langRow" key={language.name}>
                  <div className="langHead">
                    <span className="langName">{language.name}</span>
                    <span className="langLevel">{language.level}</span>
                  </div>
                  <span className="langBar" role="img" aria-label={`Level ${filled} of 5`}>
                    <motion.span
                      className="langFill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: filled / 5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, ease: EXPO, delay: 0.2 }}
                    />
                  </span>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
