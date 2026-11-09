import SectionHead from "./SectionHead";

export default function Skills({ text }) {
  return (
    <>
      <SectionHead title={text.title} lead={text.lead} />
      <section
        className="chapter skills"
        data-chapter="paper"
        aria-labelledby="capabilities-title"
      >
        <div className="wrap">
          <h2 id="capabilities-title" className="sectionTitle">
            {text.core}
          </h2>
          <dl className="skillGroups">
            {text.groups.map((group) => (
              <div key={group.title} className="skillGroup">
                <dt className="skillGroupTitle">{group.title}</dt>
                <dd>
                  <ul className="toolList">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section
        className="chapter languages"
        data-chapter="mist"
        aria-labelledby="languages-title"
      >
        <div className="wrap langGrid">
          <h2 id="languages-title" className="sectionTitle">
            {text.languagesTitle}
          </h2>
          <dl className="langList">
            {text.languages.map((language) => (
              <div className="langRow" key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
