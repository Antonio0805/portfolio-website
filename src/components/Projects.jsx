import SectionHead from "./SectionHead";
import { ExternalIcon, GitHubIcon, YouTubeIcon } from "./Icons";
import {
  imageSources,
  isYouTubeUrl,
  projectId,
  projectImage,
} from "../lib/media";

function Actions({ project, text }) {
  return (
    <div className="projectActions">
      {project.github ? (
        <a
          className="btn small ghost"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
          {text.github}
        </a>
      ) : null}
      {project.demo ? (
        <a
          className="btn small primary"
          href={project.demo}
          target="_blank"
          rel="noreferrer"
        >
          {isYouTubeUrl(project.demo) ? <YouTubeIcon /> : <ExternalIcon />}
          {isYouTubeUrl(project.demo) ? text.watchDemo : text.liveDemo}
        </a>
      ) : null}
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="tagList">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export default function Projects({ text }) {
  const featured = text.projects.find((project) => project.featured);
  const rest = text.projects.filter((project) => !project.featured);
  return (
    <>
      <SectionHead title={text.title} lead={text.lead} />
      {featured ? (
        <section
          id={projectId(featured)}
          className="chapter featured"
          data-chapter="paper"
          aria-labelledby="featured-title"
        >
          <div className="wrap featuredGrid">
            <figure className="featuredMedia" data-reveal="photo">
              <img
                {...imageSources(projectImage(featured))}
                sizes="(min-width: 1280px) 600px, (min-width: 900px) 50vw, 92vw"
                alt={`${featured.title} preview`}
                width="960"
                height="600"
              />
            </figure>
            <div className="featuredCopy">
              <div className="projectTitleRow">
                <h2 id="featured-title">{featured.title}</h2>
                <span className="statusTag">{text.featured}</span>
              </div>
              <Tags tags={featured.tags} />
              <p>{featured.description}</p>
              <ul className="featuredMetrics">
                {(featured.metrics || text.metrics).map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
              <Actions project={featured} text={text} />
            </div>
          </div>
        </section>
      ) : null}
      <section
        className="chapter projectIndex"
        data-chapter="paper"
        aria-label={text.title}
      >
        <div className="wrap">
          {rest.map((project) => {
            const image = projectImage(project);
            return (
              <article
                className={`projectRow${!image ? " withoutMedia" : ""}`}
                key={project.title}
                id={projectId(project)}
                data-reveal="item"
              >
                {project.showcaseImages ? (
                  <div className="projectGallery">
                    {project.showcaseImages.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} preview ${index + 1}`}
                        loading="lazy"
                        width="300"
                        height="400"
                      />
                    ))}
                  </div>
                ) : image ? (
                  <figure className="projectMedia">
                    <img
                      {...imageSources(image)}
                      sizes="(min-width: 1280px) 460px, (min-width: 700px) 36vw, 92vw"
                      decoding="async"
                      alt={`${project.title} preview`}
                      className={
                        project.previewFit === "contain" ? "contain" : ""
                      }
                      loading="lazy"
                      width="640"
                      height="400"
                    />
                  </figure>
                ) : null}
                <div className="projectBody">
                  <h2>{project.title}</h2>
                  <Tags tags={project.tags} />
                  <p>{project.description}</p>
                  <Actions project={project} text={text} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
