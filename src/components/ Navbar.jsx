import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DownloadIcon } from "./Icons";

const NAV_ITEMS = [
  { to: "/", key: "about" },
  { to: "/experience", key: "experience" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/education", key: "education" },
  { to: "/contact", key: "contact" },
];

function LangSwitch({ language, setLanguage, navText }) {
  return (
    <div className="langSwitch" role="group" aria-label={navText.language}>
      {["en", "ro"].map((code) => (
        <button
          key={code}
          type="button"
          className={`langBtn${language === code ? " active" : ""}`}
          aria-label={code === "ro" ? "Română" : "English"}
          lang={code}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar({ language, setLanguage, navText }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event) => {
      if (
        !menuRef.current?.contains(event.target) &&
        !burgerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1200px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <header
      className="nav"
      data-chapter="ink"
      onBlur={(event) => {
        const header = event.currentTarget;
        if (open) {
          requestAnimationFrame(() => {
            if (!header.contains(document.activeElement)) close();
          });
        }
      }}
    >
      <div className="navInner wrap">
        <NavLink
          to="/"
          className="brandBlock"
          aria-label="Antonio Smărăndescu, home"
          onClick={close}
          viewTransition
        >
          <span className="brandMark" aria-hidden="true">
            AS
          </span>
          <span className="brand">Antonio Smărăndescu</span>
        </NavLink>
        <nav className="links desktopOnly" aria-label={navText.navigation}>
          {NAV_ITEMS.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className="navLink"
              viewTransition
            >
              {({ isActive }) => (
                <>
                  {navText[key]}
                  {/* One named element, so the underline slides between pages. */}
                  {isActive ? (
                    <span className="navIndicator" aria-hidden="true" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="navActions">
          <div className="desktopOnly">
            <LangSwitch
              language={language}
              setLanguage={setLanguage}
              navText={navText}
            />
          </div>
          <a
            className="btn small primary navCv"
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label={`${navText.downloadCv} (PDF)`}
          >
            <DownloadIcon />
            <span className="navCvLabel">{navText.downloadCv}</span>
            <span className="navCvShort">CV</span>
          </a>
          <button
            ref={burgerRef}
            className="burger mobileOnly"
            type="button"
            aria-label={open ? navText.closeMenu : navText.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`burgerLines${open ? " open" : ""}`}
              aria-hidden="true"
            >
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        ref={menuRef}
        className="menu mobileOnly"
        hidden={!open}
      >
        <div className="wrap menuInner">
          <nav aria-label={navText.navigation}>
            {NAV_ITEMS.map(({ to, key }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={close}
                viewTransition
              >
                {navText[key]}
              </NavLink>
            ))}
          </nav>
          <div className="menuFoot">
            <span>{navText.language}</span>
            <LangSwitch
              language={language}
              setLanguage={setLanguage}
              navText={navText}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
