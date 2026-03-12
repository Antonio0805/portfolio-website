export default function Home({ text }) {
  return (
    <main className="container">
      <section className="hero">
        <div className="heroCard">
          <div className="heroContent">
            <p className="badge">{text.badge}</p>
            <h1 className="title">
              {text.title}
              <span className="titleAccent">{text.titleAccent}</span>
            </h1>

            <div className="subtitle">
              {text.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "subtitleLead" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="ctaRow">
              <a className="btn primary" href="/projects">{text.ctaProjects}</a>
              <a className="btn ghost" href="/contact">{text.ctaContact}</a>
            </div>

            <div className="heroPoints">
              {text.points.map((point) => (
                <div className="heroPoint" key={point.value + point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="heroSide">
            <div className="spotlightPanel">
              <p className="eyebrow">{text.focusEyebrow}</p>
              <h3>{text.focusTitle}</h3>
              <p>{text.focusText}</p>
            </div>

            <div className="summaryGrid">
              {text.summary.map((item) => (
                <div className="summaryCard" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
