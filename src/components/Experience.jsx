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

function Item({ role, company, time, bullets }) {
  return (
    <article className="timelineItem">
      <div className="timelineMarkerWrap">
        <span className="timelineMarker" />
      </div>
      <div className="card timelineCard experienceCard">
        <span className="timelineTag">Experience</span>
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

        <ul className="list">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function Experience({ text }) {
  return (
    <section id="experience" className="section">
      <div className="sectionHead premiumSectionHead">
        <div>
          <span className="sectionEyebrow premiumEyebrow">{text.eyebrow}</span>
          <h2 className="h2 premiumTitle">{text.title}</h2>
        </div>
        <p className="sectionLead premiumLead">{text.lead}</p>
      </div>

      <div className="timeline">
        {text.items.map((item) => (
          <Item key={item.role + item.company + item.time} {...item} />
        ))}
      </div>
    </section>
  );
}
