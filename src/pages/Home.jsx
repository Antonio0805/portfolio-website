import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
} from "../components/Icons";
import { EMAIL, GITHUB, LINKEDIN } from "../lib/contacts";
import { imageSources, projectId, projectImage } from "../lib/media";

export default function Home({ text, nav, projects }) {
  const selectedProjects = projects.projects.filter((project) =>
    ["EV Charge Optimizer", "RecruitAI", "Tribunal Case Management"].includes(
      project.title,
    ),
  );

  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <section
        className="chapter profile"
        data-chapter="ink"
        aria-labelledby="profile-name"
      >
        <div className="wrap profileGrid">
          <div className="profileCopy">
            <h1 id="profile-name" className="profileName">
              Antonio-Ștefan <span>Smărăndescu</span>
            </h1>
            <p className="profileRole">{text.badge}</p>
            <p className="profileSummary">{text.paragraphs[0]}</p>
            <div className="ctaRow">
              <a
                className="btn primary cvBtn"
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <DownloadIcon /> {nav.downloadCv}{" "}
                <span className="cvTag">PDF</span>
              </a>
              <Link className="btn ghost" to="/contact">
                {text.ctaContact} <ArrowRight />
              </Link>
            </div>
            <div className="profileLinks">
              <a href={LINKEDIN.href} target="_blank" rel="noreferrer">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={GITHUB.href} target="_blank" rel="noreferrer">
                <GitHubIcon /> GitHub
              </a>
              <a href={EMAIL.href}>
                {nav.email} <ArrowUpRight />
              </a>
            </div>
          </div>
          <aside className="profileFocus" aria-labelledby="focus-title">
            <h2 id="focus-title">{text.focusTitle}</h2>
            <p>{text.focusText}</p>
            <ul className="toolList" aria-label={text.stackLabel}>
              {text.cinema.hud.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <Link className="textLink" to="/experience">
              {text.ctaExperience} <ArrowRight />
            </Link>
          </aside>
        </div>
      </section>
      <section
        className="chapter about"
        data-chapter="paper"
        aria-labelledby="about-title"
      >
        <div className="wrap aboutGrid">
          <h2 id="about-title" className="sectionTitle">
            {nav.about}
          </h2>
          <div className="aboutCopy" data-reveal="section">
            <div className="aboutBody">
              {text.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="capabilityList">
              {text.summary.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section
        className="chapter selectedWork"
        data-chapter="paper"
        aria-labelledby="work-title"
      >
        <div className="wrap">
          <div className="sectionHeadingRow">
            <h2 id="work-title" className="sectionTitle">
              {text.selectedProjects}
            </h2>
            <Link className="textLink" to="/projects">
              {text.ctaProjects} <ArrowRight />
            </Link>
          </div>
          <ul className="workGrid">
            {selectedProjects.map((project, index) => (
              <li
                key={project.title}
                data-reveal="project"
                data-reveal-delay={index * 60}
              >
                <Link
                  className="workCard"
                  to={`/projects#${projectId(project)}`}
                >
                  <div className="workMedia">
                    <img
                      {...imageSources(projectImage(project))}
                      sizes="(min-width: 1280px) 379px, (min-width: 900px) 30vw, (min-width: 600px) 44vw, 92vw"
                      decoding="async"
                      alt={`${project.title} preview`}
                      loading="lazy"
                      width="640"
                      height="400"
                    />
                  </div>
                  <div className="workTitleRow">
                    <h3>{project.title}</h3>
                    <ArrowUpRight />
                  </div>
                  <p className="workTags">{project.tags.join(" · ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section
        className="chapter stack"
        data-chapter="mist"
        aria-labelledby="stack-title"
      >
        <div className="wrap stackGrid">
          <h2 id="stack-title" className="sectionTitle">
            {text.stackLabel}
          </h2>
          <ul className="toolList">
            {text.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
