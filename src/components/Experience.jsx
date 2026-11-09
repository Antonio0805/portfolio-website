import SectionHead from "./SectionHead";

export default function Experience({ text }) {
  return (
    <>
      <SectionHead title={text.title} lead={text.lead} />
      <section
        className="chapter experience"
        data-chapter="paper"
        aria-label={text.title}
      >
        <ol className="wrap experienceList">
          {text.items.map((item) => (
            <li className="expItem" key={item.role + item.company}>
              <div className="expMeta">
                <p>{item.time}</p>
                {item.status ? (
                  <span className="statusTag">{item.status}</span>
                ) : null}
              </div>
              <article className="expBody">
                <h2 className="expRole">{item.role}</h2>
                <p className="expCompany">{item.company}</p>
                <ul className="expBullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
