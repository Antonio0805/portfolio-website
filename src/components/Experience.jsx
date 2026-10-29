import SectionHead from "./SectionHead";
import { Stagger, StaggerItem, Timeline, TimelineItem } from "./Motion";
import { slideIn } from "../lib/motion";

const COMPANY_PALETTE = [
  "linear-gradient(135deg, #0b5f59, #2563eb)",
  "linear-gradient(135deg, #7c3aed, #ec4899)",
  "linear-gradient(135deg, #ea580c, #f59e0b)",
  "linear-gradient(135deg, #0891b2, #14b8a6)",
  "linear-gradient(135deg, #be123c, #f43f5e)",
];

function pickGradient(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return COMPANY_PALETTE[hash % COMPANY_PALETTE.length];
}

function CompanyAvatar({ company }) {
  const initial = (company || "?").trim().charAt(0).toUpperCase();
  const background = pickGradient(company || "?");
  return (
    <span className="companyAvatar" style={{ background }} aria-hidden="true">
      {initial}
    </span>
  );
}

function Item({ role, company, time, bullets, status, tag }) {
  return (
    <TimelineItem active={Boolean(status)}>
      <div className="card timelineCard experienceCard spotlight">
        <div className="timelineTagRow">
          <span className="pill timelineTag">{tag}</span>
          {status ? (
            <span className="currentBadge">
              <span className="currentDot" aria-hidden="true" />
              {status}
            </span>
          ) : null}
        </div>
        <div className="timelineTop">
          <span className="cardMeta">{time}</span>
          <div className="experienceHeader">
            <CompanyAvatar company={company} />
            <div className="experienceHeaderText">
              <h3 className="cardTitle">{role}</h3>
              <p className="muted">{company}</p>
            </div>
          </div>
        </div>

        <Stagger as="ul" className="list" gap={0.07} delay={0.25}>
          {bullets.map((b, i) => (
            <StaggerItem as="li" key={i} variants={slideIn}>{b}</StaggerItem>
          ))}
        </Stagger>
      </div>
    </TimelineItem>
  );
}

export default function Experience({ text }) {
  return (
    <section id="experience" className="section">
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

      <Timeline>
        {text.items.map((item) => (
          <Item key={item.role + item.company + item.time} {...item} tag={text.eyebrow} />
        ))}
      </Timeline>
    </section>
  );
}
