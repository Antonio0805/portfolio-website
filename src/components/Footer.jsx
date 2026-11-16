import { Link } from "react-router-dom";
import { ArrowUpRight, DownloadIcon } from "./Icons";
import { EMAIL, GITHUB, LINKEDIN } from "../lib/contacts";

export default function Footer({ nav, cta, showCta = true }) {
  return (
    <footer className="chapter footer" data-chapter="ink">
      <div className="wrap footerInner">
        <div className="footerTop">
          <div>
            {showCta ? (
              <Link className="footerCta" to="/contact" viewTransition>
                {cta} <ArrowUpRight />
              </Link>
            ) : (
              <p className="footerName">Antonio Smărăndescu</p>
            )}
            <a className="footerEmail" href={EMAIL.href}>
              {EMAIL.value}
            </a>
          </div>
          <a
            className="btn ghost"
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <DownloadIcon />
            {nav.downloadCv}
            <span className="cvTag">PDF</span>
          </a>
        </div>
        <div className="footerBottom">
          <p className="footerSmall">
            © {new Date().getFullYear()} Antonio-Ștefan Smărăndescu
          </p>
          <div className="footerLinks">
            <a href={GITHUB.href} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight />
            </a>
            <a href={LINKEDIN.href} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
