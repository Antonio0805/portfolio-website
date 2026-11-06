import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, WordReveal } from "./Motion";

// Sized by length so every title holds to two lines in both languages.
const sizeFor = (title) => (title.length <= 16 ? "isXL" : title.length <= 26 ? "isL" : "isM");

// The opening chapter of an inner page: the page's h1, set very large, which
// recedes a little as the page scrolls on.
export default function SectionHead({ eyebrow, title, lead, chapter = "ink" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0.4]);

  return (
    <header ref={ref} className="chapter pageHead" data-chapter={chapter}>
      <motion.div className="wrap pageHeadGrid" style={{ y, opacity }}>
        <WordReveal as="h1" className={`pageTitle ${sizeFor(title)}`} text={title} delay={0.2} />
        <Reveal as="p" className="sideLabel" delay={0.3}>{eyebrow}</Reveal>
        {lead ? <Reveal as="p" className="pageLead" delay={0.35}>{lead}</Reveal> : null}
      </motion.div>
    </header>
  );
}
