function Edu({ school, program, time, detail, label }) {
  return (
    <article className="timelineItem">
      <div className="timelineMarkerWrap">
        <span className="timelineMarker" />
      </div>
      <div className="card eduCard timelineCard educationCard">
        <span className="pill timelineTag">{label}</span>
        <div className="timelineTop">
          <span className="cardMeta">{time}</span>
          <div>
            <h3 className="cardTitle">{school}</h3>
            <p className="muted">{program}</p>
          </div>
        </div>
        <div className="eduFooter">
          <span className="muted">{detail}</span>
        </div>
      </div>
    </article>
  );
}

export default function Education({ text }) {
  return (
    <section id="education" className="section">
      <div className="sectionHead premiumSectionHead">
        <div>
          <span className="sectionEyebrow premiumEyebrow">{text.eyebrow}</span>
          <h2 className="h2 premiumTitle">{text.title}</h2>
        </div>
        <p className="sectionLead premiumLead">{text.lead}</p>
      </div>

      <div className="timeline">
        {text.items.map((item) => (
          <Edu key={item.school + item.time} {...item} label={text.label} />
        ))}
      </div>
    </section>
  );
}
