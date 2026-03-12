export default function Contact({ text }) {
  return (
    <section id="contact" className="section">
      <div className="sectionHead">
        <div>
          <span className="sectionEyebrow">{text.eyebrow}</span>
          <h2 className="h2">{text.title}</h2>
        </div>
        <p className="sectionLead">{text.lead}</p>
      </div>

      <div className="card">
        <div className="contactGrid">
          <div className="contactCard">
            <span className="contactLabel">{text.phone}</span>
            <span className="contactValue">+40 758 921 740</span>
            <span className="contactHint">{text.phoneHint}</span>
          </div>
          <div className="contactCard">
            <span className="contactLabel">{text.email}</span>
            <a className="contactValue" href="mailto:antoniosmarandescu@yahoo.com">
              antoniosmarandescu@yahoo.com
            </a>
            <span className="contactHint">{text.emailHint}</span>
          </div>
          <div className="contactCard">
            <span className="contactLabel">{text.github}</span>
            <a href="https://github.com/Antonio0805" target="_blank" rel="noreferrer">
              <span className="contactValue">github.com/Antonio0805</span>
            </a>
            <span className="contactHint">{text.githubHint}</span>
          </div>
          <div className="contactCard">
            <span className="contactLabel">{text.linkedin}</span>
            <a
              href="https://linkedin.com/in/antonio-smarandescu-80b04b1b9"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contactValue">linkedin.com/in/antonio-smarandescu-80b04b1b9</span>
            </a>
            <span className="contactHint">{text.linkedinHint}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
