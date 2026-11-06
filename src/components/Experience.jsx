import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import SectionHead from "./SectionHead";
import { Reveal, ScrollProgressLine, Stagger, StaggerItem, WordReveal } from "./Motion";
import { IN_OUT, slideIn } from "../lib/motion";

function Item({ role, company, time, bullets, status, index, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) {
      onActive(index);
    }
  }, [inView, index, onActive]);

  return (
    <article ref={ref} className="expItem">
      <WordReveal as="h2" className="expRole" text={role} inView />
      <Reveal className="expHead" delay={0.1}>
        <p className="expCompany">{company}</p>
        <p className="expMeta">
          <span>{time}</span>
          {status ? (
            <span className="statusTag">
              <span className="liveDot" aria-hidden="true" />
              {status}
            </span>
          ) : null}
        </p>
      </Reveal>
      <Stagger as="ul" className="expBullets" gap={0.08} delay={0.2}>
        {bullets.map((bullet) => (
          <StaggerItem as="li" key={bullet} variants={slideIn}>{bullet}</StaggerItem>
        ))}
      </Stagger>
    </article>
  );
}

// A held column names the company and dates of whichever role is in the middle
// of the screen, rolling to the next as the list passes.
export default function Experience({ text }) {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const current = text.items[active] ?? text.items[0];

  return (
    <>
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} chapter="teal" />

      <section className="chapter experience" data-chapter="paper">
        <div className="wrap expGrid">
          <aside className="expAside" aria-hidden="true">
            <div className="expAsideInner">
              <span className="expAsideMask">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.company + current.time}
                    className="expAsideCompany"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.7, ease: IN_OUT }}
                  >
                    {current.company}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="expAsideMask">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.time}
                    className="expAsideTime"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.7, ease: IN_OUT, delay: 0.05 }}
                  >
                    {current.time}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="expAsideCount">
                {active + 1}/{text.items.length}
              </span>
            </div>
          </aside>

          <div className="expList" ref={listRef}>
            <ScrollProgressLine target={listRef} className="expProgress" />
            {text.items.map((item, index) => (
              <Item key={item.role + item.company + item.time} {...item} index={index} onActive={setActive} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
