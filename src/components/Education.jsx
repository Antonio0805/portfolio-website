import SectionHead from "./SectionHead";
import { Timeline, TimelineItem } from "./Motion";

function Edu({ school, program, time, detail, label, current, status }) {
  return (
    <TimelineItem active={current}>
      <div className="card eduCard timelineCard educationCard spotlight">
        <div className="timelineTagRow">
          <span className="pill timelineTag">{label}</span>
          {status ? (
            <span className={`currentBadge${current ? "" : " doneBadge"}`}>
              <span className="currentDot" aria-hidden="true" />
              {status}
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
    </TimelineItem>
  );
}

export default function Education({ text }) {
  return (
    <section id="education" className="section">
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

      <Timeline>
        {text.items.map((item) => (
          <Edu
            key={item.school + item.time}
            {...item}
            label={text.label}
          />
        ))}
      </Timeline>
    </section>
  );
}
