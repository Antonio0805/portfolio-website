import { Link } from "react-router-dom";
import { Magnetic, Reveal, RollText } from "./Motion";
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import { EMAIL, GITHUB, LINKEDIN } from "../lib/contacts";

// The page ends on the name: a large call to talk, the ways to reach out, and
// the wordmark rising out of its own baseline at full width.
export default function Footer({ nav, cta, showCta = true }) {
  return (
    <footer className="chapter footer" data-chapter="signal">
      <div className="wrap footerInner">
        {showCta ? (
          <Link className="footerCta" to="/contact">
            <RollText>{cta}</RollText>
            <ArrowUpRight width="0.8em" height="0.8em" />
          </Link>
        ) : null}

        <div className="footerLinks">
          <Magnetic>
            <a className="btn primary" href={EMAIL.href} data-cursor="open">
              <RollText>{EMAIL.value}</RollText>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn ghost" href={GITHUB.href} target="_blank" rel="noreferrer">
              <GitHubIcon />
              <RollText>GitHub</RollText>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn ghost" href={LINKEDIN.href} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              <RollText>LinkedIn</RollText>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn ghost" href="/cv.pdf" target="_blank" rel="noreferrer">
              <DownloadIcon />
              <RollText>{nav.downloadCv}</RollText>
            </a>
          </Magnetic>
        </div>

        <Reveal as="p" className="footerWord" aria-hidden="true" y={60} delay={0.15}>
          Antonio Smărăndescu
        </Reveal>
        <p className="footerSmall">© {new Date().getFullYear()} Antonio-Ștefan Smărăndescu</p>
      </div>
    </footer>
  );
}
