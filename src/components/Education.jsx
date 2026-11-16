import SectionHead from "./SectionHead";
import { imageSources } from "../lib/media";

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

export default function Education({ text }) {
  return (
    <>
      <SectionHead title={text.title} lead={text.lead} />
      <section
        className="chapter education"
        data-chapter="paper"
        aria-label={text.title}
      >
        <div className="wrap">
          {text.items.map((item, index) => (
            <article className="eduItem" key={item.school + item.time}>
              <div className="eduDetails" data-reveal="item">
                <div className="eduMeta">
                  <span className="eduYears">{item.time}</span>
                  {item.status ? (
                    <span
                      className={`statusTag${item.current ? "" : " isDone"}`}
                    >
                      {item.status}
                    </span>
                  ) : null}
                </div>
                <h2 className="eduSchool">{item.school}</h2>
                <p className="eduProgram">{item.program}</p>
                <p className="eduDegree">{item.detail}</p>
              </div>
              {PHOTOS[index] ? (
                <figure className="eduPhoto" data-reveal="photo">
                  <img
                    {...imageSources(PHOTOS[index].src)}
                    sizes="(min-width: 1280px) 374px, (min-width: 900px) 30vw, 92vw"
                    decoding="async"
                    alt={PHOTOS[index].alt}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </figure>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
