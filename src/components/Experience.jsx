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
          <div>
            <h3 className="cardTitle">{role}</h3>
            <p className="muted">{company}</p>
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
