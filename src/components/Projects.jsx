const GitHubIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.73.5.75 5.63.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.1c-3.2.71-3.88-1.39-3.88-1.39-.53-1.37-1.29-1.74-1.29-1.74-1.05-.73.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.8 2.7 1.28 3.36.98.1-.77.4-1.28.72-1.57-2.55-.3-5.23-1.31-5.23-5.84 0-1.29.45-2.34 1.19-3.17-.12-.3-.52-1.53.11-3.18 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.97.14 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.65.24 2.88.12 3.18.74.83 1.19 1.88 1.19 3.17 0 4.54-2.69 5.54-5.25 5.83.41.37.78 1.1.78 2.22v3.29c0 .31.21.69.8.57 4.57-1.53 7.86-5.86 7.86-10.96C23.25 5.63 18.27.5 12 .5Z" />
  </svg>
);

const ExternalIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/>
  </svg>
);

const YouTubeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

const isYouTubeUrl = (url) => /(?:youtube\.com|youtu\.be)/i.test(url);

export default function Projects({ text }) {
  const featured = text.projects.find((p) => p.featured);
  const showcase = text.projects.find((p) => p.showcase);
  const rest = text.projects.filter((p) => !p.featured && !p.showcase);

  const renderDemoAction = (url, label) => {
    if (!url) {
      return <span className="muted smallNote">{text.demoSoon}</span>;
    }

    if (isYouTubeUrl(url)) {
      return (
        <a className="btn small youtubeBtn" href={url} target="_blank" rel="noreferrer">
          <YouTubeIcon /> <span>YouTube</span>
        </a>
      );
    }

    return (
      <a className="btn small primary" href={url} target="_blank" rel="noreferrer">
        <ExternalIcon /> <span>{label}</span>
      </a>
    );
  };

  return (
    <section className="section">
      <div className="sectionHead">
        <div>
          <span className="sectionEyebrow">{text.eyebrow}</span>
          <h2 className="h2">{text.title}</h2>
          <p className="sectionLead">{text.lead}</p>
        </div>
      </div>

      {featured && (
        <article className="featuredCard">
          <div className="featuredLeft">
            <span className="pill">{text.featured}</span>
            <h3 className="featuredTitle">{featured.title}</h3>
            <p className="featuredDesc">{featured.description}</p>

            <div className="chips">
              {featured.tags.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>

            <div className="featuredMetrics">
              {text.metrics.map((metric) => (
                <span className="metricChip" key={metric}>{metric}</span>
              ))}
            </div>

            <div className="projectActions">
              <a className="btn small" href={featured.github} target="_blank" rel="noreferrer">
                <GitHubIcon /> <span>{text.github}</span>
              </a>

              {renderDemoAction(featured.demo, text.liveDemo)}
            </div>
          </div>

          <div className="featuredRight">
            {featured.previewImage ? (
              <img
                className="featuredImage"
                src={featured.previewImage}
                alt={`${featured.title} preview`}
                loading="lazy"
              />
            ) : featured.previewPdf ? (
              <div className="featuredPreview">
                <iframe
                  className="featuredPdf"
                  src={`${featured.previewPdf}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`}
                  title={`${featured.title} PDF preview`}
                />
              </div>
            ) : (
              <div className="featuredMock">
                <div className="mockTop">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="mockBody">
                  <div className="mockLine w80" />
                  <div className="mockLine w60" />
                  <div className="mockLine w90" />
                  <div className="mockLine w70" />
                </div>
              </div>
            )}
          </div>
        </article>
      )}

      {showcase && (
        <article className="featuredCard showcaseCard">
          <div className="featuredLeft">
            <span className="pill">{text.featured}</span>
            <h3 className="featuredTitle">{showcase.title}</h3>
            <p className="featuredDesc">{showcase.description}</p>

            <div className="chips">
              {showcase.tags.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>

            <div className="projectActions">
              {showcase.github ? (
                <a className="btn small" href={showcase.github} target="_blank" rel="noreferrer">
                  <GitHubIcon /> <span>{text.github}</span>
                </a>
              ) : null}

              {renderDemoAction(showcase.demo, text.liveDemo)}
            </div>
          </div>

          <div className="featuredRight">
            <div className="showcaseGallery">
              {showcase.showcaseImages?.map((image, index) => (
                <img
                  className={`showcaseGalleryImage image${index + 1}`}
                  key={image}
                  src={image}
                  alt={`${showcase.title} preview ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </article>
      )}

      <div className="projectsGrid premium">
        {rest.map((p) => (
          <article
            className={`projectCard premium${p.previewImage || p.previewPdf ? " hasPreview" : ""}`}
            key={p.title}
          >
            {p.previewPdf ? (
              <div className="projectPreviewFrame">
                <iframe
                  className="projectPreviewPdf"
                  src={`${p.previewPdf}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`}
                  title={`${p.title} PDF preview`}
                />
              </div>
            ) : p.previewImage ? (
              <img
                className={`projectPreviewImage${p.previewFit === "contain" ? " contain" : ""}`}
                src={p.previewImage}
                alt={`${p.title} preview`}
                loading="lazy"
              />
            ) : null}

            <div className="projectTopRow">
              <h3 className="projectTitle">{p.title}</h3>
            </div>

            <p className="projectDesc">{p.description}</p>

            <div className="chips">
              {p.tags.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>

            <div className="projectActions">
              {p.github ? (
                <a className="btn small" href={p.github} target="_blank" rel="noreferrer">
                  <GitHubIcon /> <span>{text.github}</span>
                </a>
              ) : null}

              {renderDemoAction(p.demo, text.live)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
