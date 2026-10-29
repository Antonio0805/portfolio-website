import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EASE, SPRING } from "../lib/motion";

const NAV_ITEMS = [
  { to: "/", key: "about" },
  { to: "/experience", key: "experience" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/education", key: "education" },
  { to: "/contact", key: "contact" },
];

const drawerList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const drawerItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

function LangSwitch({ language, setLanguage, navText, className, layoutId }) {
  return (
    <div className={className} role="group" aria-label="Language switch">
      {["ro", "en"].map((code) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            className={`langBtn${active ? " active" : ""}`}
            aria-pressed={active}
            onClick={() => setLanguage(code)}
          >
            {active ? <motion.span layoutId={layoutId} className="langActivePill" transition={SPRING} /> : null}
            <span className="navLabel">{code === "ro" ? navText.langRo : navText.langEn}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ language, setLanguage, navText }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 12));

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
    <motion.header
      className={`nav${scrolled ? " scrolled" : ""}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.div className="scrollProgress" style={{ scaleX: progress }} aria-hidden="true" />

      <div className="navInner">
        <NavLink to="/" className="brandBlock" aria-label="Antonio Smarandescu, home">
          <span className="brandMark" aria-hidden="true">AS</span>
          <span className="brandText">
            <span className="brand">Antonio Smarandescu</span>
            <span className="brandMeta">SAP Analytics • Data • Automation</span>
          </span>
        </NavLink>

        <nav className="links desktopOnly">
          {NAV_ITEMS.map(({ to, key }) => (
            <NavLink key={to} to={to} end={to === "/"} className="navLink">
              {({ isActive }) => (
                <>
                  {isActive ? <motion.span layoutId="navActive" className="navActivePill" transition={SPRING} /> : null}
                  <span className="navLabel">{navText[key]}</span>
                </>
              )}
            </NavLink>
          ))}

          <LangSwitch
            className="langSwitch"
            layoutId="langDesktop"
            language={language}
            setLanguage={setLanguage}
            navText={navText}
          />

          <a className="navBtn cvDownloadBtn" href="/cv.pdf" target="_blank" rel="noreferrer">
            <DownloadIcon />
            <span>{navText.downloadCv}</span>
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
        inert={!open}
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
            <CloseIcon />
          </button>
        </div>

        <motion.nav
          className="drawerLinks"
          initial="hidden"
          animate={open ? "show" : "hidden"}
          variants={drawerList}
        >
          {NAV_ITEMS.map(({ to, key }) => (
            <motion.div key={to} variants={drawerItem}>
              <NavLink to={to} end={to === "/"} onClick={close}>{navText[key]}</NavLink>
            </motion.div>
          ))}

          <motion.div variants={drawerItem}>
            <LangSwitch
              className="drawerLangSwitch"
              layoutId="langDrawer"
              language={language}
              setLanguage={setLanguage}
              navText={navText}
            />
          </motion.div>

          <motion.div variants={drawerItem}>
            <a className="drawerBtn cvDownloadBtn" href="/cv.pdf" target="_blank" rel="noreferrer" onClick={close}>
              <DownloadIcon />
              <span>{navText.downloadCv}</span>
            </a>
          </motion.div>
        </motion.nav>
      </aside>
    </motion.header>
  );
}
