import SectionHead from "./SectionHead";
import { Reveal, Stagger, StaggerItem } from "./Motion";

const PhoneIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const EmailIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.73.5.75 5.63.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.1c-3.2.71-3.88-1.39-3.88-1.39-.53-1.37-1.29-1.74-1.29-1.74-1.05-.73.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.8 2.7 1.28 3.36.98.1-.77.4-1.28.72-1.57-2.55-.3-5.23-1.31-5.23-5.84 0-1.29.45-2.34 1.19-3.17-.12-.3-.52-1.53.11-3.18 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.97.14 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.65.24 2.88.12 3.18.74.83 1.19 1.88 1.19 3.17 0 4.54-2.69 5.54-5.25 5.83.41.37.78 1.1.78 2.22v3.29c0 .31.21.69.8.57 4.57-1.53 7.86-5.86 7.86-10.96C23.25 5.63 18.27.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
  </svg>
);

const ArrowIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Contact({ text }) {
  const cards = [
    {
      href: "tel:+40758921740",
      icon: <PhoneIcon />,
      label: text.phone,
      value: "+40 758 921 740",
      hint: text.phoneHint,
    },
    {
      href: "mailto:antoniosmarandescu@yahoo.com",
      icon: <EmailIcon />,
      label: text.email,
      value: "antoniosmarandescu@yahoo.com",
      hint: text.emailHint,
    },
    {
      href: "https://github.com/Antonio0805",
      icon: <GitHubIcon />,
      label: text.github,
      value: "github.com/Antonio0805",
      hint: text.githubHint,
      external: true,
    },
    {
      href: "https://linkedin.com/in/antonio-smarandescu-80b04b1b9",
      icon: <LinkedInIcon />,
      label: text.linkedin,
      value: "linkedin.com/in/antonio-smarandescu-80b04b1b9",
      hint: text.linkedinHint,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section">
      <SectionHead eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

      <Reveal className="card contactShell">
        <Stagger className="contactGrid" gap={0.08} delay={0.15}>
          {cards.map((card) => (
            <StaggerItem className="gridCell" key={card.href}>
              <a
                className="contactCard contactCardLink spotlight"
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="contactIcon" aria-hidden="true">{card.icon}</span>
                <div className="contactBody">
                  <span className="contactLabel">{card.label}</span>
                  <span className="contactValue">{card.value}</span>
                  <span className="contactHint">{card.hint}</span>
                </div>
                <span className="contactArrow" aria-hidden="true"><ArrowIcon /></span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
}
