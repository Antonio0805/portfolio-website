import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHead from "./SectionHead";
import { Reveal, RollingFigure, WordReveal } from "./Motion";

// Photographs of the university, from Wikimedia Commons, one per sheet.
const PHOTOS = [
  {
    src: "/upb-rectorate.jpg",
    alt: "The Rectorate building of Politehnica University of Bucharest",
    credit: "CristianChirita, public domain, via Wikimedia Commons",
    page: "https://commons.wikimedia.org/wiki/File:Universitatea_Politehnica_din_Bucure%C8%99ti-2006_0604UPB0032.jpg",
  },
  {
    src: "/upb-campus.jpg",
    alt: "The Politehnica University of Bucharest campus in winter",
    credit: "Mister rf, CC BY-SA 4.0, via Wikimedia Commons",
    page: "https://commons.wikimedia.org/wiki/File:Politehnica_University_of_Bucharest_07.jpg",
  },
];

// Each degree is its own chapter: the years roll up, the photograph opens
// from a window as it arrives and drifts inside its frame.
function Sheet({ school, program, time, detail, label, current, status, chapter, photo }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const clipPath = useTransform(scrollYProgress, [0.05, 0.4], ["inset(18% 18% 18% 18%)", "inset(0% 0% 0% 0%)"]);

  return (
    <article ref={ref} className="chapter eduSheet" data-chapter={chapter}>
      <div className="wrap eduInner">
        <RollingFigure className="eduYears" value={time} />
        <div className="eduText">
          <WordReveal as="h2" className="eduSchool" text={school} inView />
          <Reveal as="p" className="eduProgram" delay={0.1}>{program}</Reveal>
          <Reveal as="p" className="eduMeta" delay={0.15}>
            <span>{label} · {detail}</span>
            {status ? (
              <span className={`statusTag${current ? "" : " isDone"}`}>
                {current ? <span className="liveDot" aria-hidden="true" /> : null}
                {status}
              </span>
            ) : null}
          </Reveal>
        </div>
        {photo ? (
          <figure className="eduPhoto">
            <motion.span className="eduPhotoFrame" style={{ clipPath }}>
              <motion.img src={photo.src} alt={photo.alt} loading="lazy" style={{ y: imageY }} />
            </motion.span>
            <figcaption>
              <a href={photo.page} target="_blank" rel="noreferrer">{photo.credit}</a>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </article>
  );
}

export default function Education({ text }) {
  return (
    <>
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} chapter="paper" />
      <section className="education" aria-label={text.title}>
        {text.items.map((item, index) => (
          <Sheet
            key={item.school + item.time}
            {...item}
            label={text.label}
            chapter={index % 2 ? "teal" : "ink"}
            photo={PHOTOS[index]}
          />
        ))}
      </section>
    </>
  );
}
