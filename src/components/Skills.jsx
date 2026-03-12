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
                <span className="pill">{group.title}</span>
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
            {text.languages.map((language) => (
              <div className="languageRow" key={language.name}>
                <span>{language.name}</span>
                <span className="languageLevel">{language.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
