const LEVEL_DOTS = {
  Fluent: 5,
  Fluenta: 5,
  Native: 5,
  Advanced: 4,
  Avansat: 4,
  Intermediate: 3,
  Intermediar: 3,
  Basic: 2,
  Beginner: 1,
  Incepator: 1,
};

const GROUP_ICONS = {
  Development: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Dezvoltare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Engineering: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3Z" />
    </svg>
  ),
  Inginerie: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3Z" />
    </svg>
  ),
  "Applied Work": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Aplicat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Professional: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  Profesional: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
};

function LanguageDots({ filled }) {
  const total = 5;
  return (
    <span className="languageDots" aria-label={`Level ${filled} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`languageDot${i < filled ? " filled" : ""}`}
        />
      ))}
    </span>
  );
}

export default function Skills({ text }) {
  return (
    <section id="skills" className="section">
      <div className="sectionHead">
        <div>
          <span className="sectionEyebrow">{text.eyebrow}</span>
          <h2 className="h2">{text.title}</h2>
        </div>
        <p className="sectionLead">{text.lead}</p>
      </div>

      <div className="twoCol">
        <div className="card">
          <h3 className="cardTitle">{text.core}</h3>
          <div className="skillsGrid">
            {text.groups.map((group) => (
              <div className="skillGroup" key={group.title}>
                <span className="pill skillGroupPill">
                  {GROUP_ICONS[group.title] || null}
                  <span>{group.title}</span>
                </span>
                <div className="skillRow">
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="cardTitle">{text.languagesTitle}</h3>
          <div className="languageList">
            {text.languages.map((language) => {
              const filled = LEVEL_DOTS[language.level] ?? 3;
              return (
                <div className="languageRow" key={language.name}>
                  <div className="languageInfo">
                    <span className="languageName">{language.name}</span>
                    <span className="languageLevel">{language.level}</span>
                  </div>
                  <LanguageDots filled={filled} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
