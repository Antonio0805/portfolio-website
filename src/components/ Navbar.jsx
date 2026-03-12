import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ language, setLanguage, navText }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="navInner">
        <div className="brandBlock">
          <span className="brand">Antonio Smarandescu</span>
          <p className="brandMeta">Systems Engineering • Software • AI</p>
        </div>

        <nav className="links desktopOnly">
          <NavLink
            to="/"
            className={({ isActive }) => `navHighlight${isActive ? " active" : ""}`}
          >
            {navText.about}
          </NavLink>
          <NavLink to="/experience">{navText.experience}</NavLink>
          <NavLink to="/projects">{navText.projects}</NavLink>
          <NavLink to="/skills">{navText.skills}</NavLink>
          <NavLink to="/education">{navText.education}</NavLink>
          <NavLink to="/contact">{navText.contact}</NavLink>

          <div className="langSwitch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={`langBtn${language === "ro" ? " active" : ""}`}
              onClick={() => setLanguage("ro")}
            >
              {navText.langRo}
            </button>
            <button
              type="button"
              className={`langBtn${language === "en" ? " active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              {navText.langEn}
            </button>
          </div>

          <a className="navBtn cvDownloadBtn" href="/cv.pdf" target="_blank" rel="noreferrer">
            {navText.downloadCv}
          </a>
        </nav>

        <button
          className="hamburger mobileOnly"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`bar ${open ? "x1" : ""}`} />
          <span className={`bar ${open ? "x2" : ""}`} />
          <span className={`bar ${open ? "x3" : ""}`} />
        </button>
      </div>

      <div className={`overlay ${open ? "show" : ""}`} onClick={close} />

      <aside
        id="mobile-menu"
        className={`drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="drawerTop">
          <div className="drawerTitle">
            <strong>{navText.navigation}</strong>
            <span>{navText.navigationHint}</span>
          </div>
          <button
            className="closeBtn"
            type="button"
            aria-label="Close menu"
            onClick={close}
          >
            X
          </button>
        </div>

        <nav className="drawerLinks">
          <NavLink to="/" onClick={close} className={({ isActive }) => `navHighlight${isActive ? " active" : ""}`}>{navText.about}</NavLink>
          <NavLink to="/experience" onClick={close}>{navText.experience}</NavLink>
          <NavLink to="/projects" onClick={close}>{navText.projects}</NavLink>
          <NavLink to="/skills" onClick={close}>{navText.skills}</NavLink>
          <NavLink to="/education" onClick={close}>{navText.education}</NavLink>
          <NavLink to="/contact" onClick={close}>{navText.contact}</NavLink>

          <div className="drawerLangSwitch">
            <button
              type="button"
              className={`langBtn${language === "ro" ? " active" : ""}`}
              onClick={() => setLanguage("ro")}
            >
              {navText.langRo}
            </button>
            <button
              type="button"
              className={`langBtn${language === "en" ? " active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              {navText.langEn}
            </button>
          </div>

          <a className="drawerBtn cvDownloadBtn" href="/cv.pdf" target="_blank" rel="noreferrer" onClick={close}>
            {navText.downloadCv}
          </a>
        </nav>
      </aside>
    </header>
  );
}
