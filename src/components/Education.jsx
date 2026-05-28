function Edu({ school, program, time, detail, label, current, currentLabel }) {
  return (
    <article className="timelineItem">
      <div className="timelineMarkerWrap">
        <span className={`timelineMarker${current ? " timelineMarkerActive" : ""}`} />
      </div>
      <div className="card eduCard timelineCard educationCard">
        <div className="timelineTagRow">
          <span className="pill timelineTag">{label}</span>
          {current && currentLabel ? (
            <span className="currentBadge">
              <span className="currentDot" aria-hidden="true" />
              {currentLabel}
            </span>
          ) : null}
        </div>
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
          <Edu
            key={item.school + item.time}
            {...item}
            label={text.label}
            currentLabel={text.currentLabel}
          />
        ))}
      </div>
    </section>
  );
}
