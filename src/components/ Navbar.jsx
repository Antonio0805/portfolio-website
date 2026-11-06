import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EXPO, IN_OUT, SPRING } from "../lib/motion";
import { lockScroll } from "../lib/smoothScroll";
import { useChapterInk } from "../lib/useChapterInk";
import { RollText } from "./Motion";
import { DownloadIcon } from "./Icons";

const NAV_ITEMS = [
  { to: "/", key: "about" },
  { to: "/experience", key: "experience" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/education", key: "education" },
  { to: "/contact", key: "contact" },
];

const menuPanel = {
  closed: { clipPath: "circle(0% at calc(100% - 44px) 40px)", transition: { duration: 0.55, ease: IN_OUT } },
  open: { clipPath: "circle(150% at calc(100% - 44px) 40px)", transition: { duration: 0.8, ease: IN_OUT } },
};

const menuList = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const menuItem = {
  closed: { y: "110%" },
  open: { y: "0%", transition: { duration: 0.8, ease: EXPO } },
};

function LangSwitch({ language, setLanguage, navText, layoutId }) {
  return (
    <div className="langSwitch" role="group" aria-label="Language switch">
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
            {active ? <motion.span layoutId={layoutId} className="langActive" transition={SPRING} /> : null}
            <span className="langLabel">{code === "ro" ? navText.langRo : navText.langEn}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ language, setLanguage, navText }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const chapter = useChapterInk(36, [pathname]);

  // Always on screen; once the page moves it takes a solid ground in the
  // colour of the chapter beneath, so the links and the CV stay readable.
  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 24));

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const menu = menuRef.current;
    const focusables = () => Array.from(menu.querySelectorAll("a, button"));
    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        const items = [burgerRef.current, ...focusables()];
        const index = items.indexOf(document.activeElement);
        const next = event.shiftKey ? index - 1 : index + 1;
        event.preventDefault();
        items[(next + items.length) % items.length]?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className={`nav${open ? " menuOpen" : ""}${solid && !open ? " isSolid" : ""}`}
        data-chapter={open ? "ink" : chapter}
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: IN_OUT, delay: 0.2 }}
      >
        <motion.div className="scrollProgress" style={{ scaleX: progress }} aria-hidden="true" />

        <div className="navInner wrap">
          <NavLink to="/" className="brandBlock" aria-label="Antonio Smarandescu, home" onClick={close}>
            <span className="brandMark" aria-hidden="true">AS</span>
            <span className="brandText">
              <span className="brand">Antonio Smarandescu</span>
              <span className="brandMeta">SAP Analytics • Data • Automation</span>
            </span>
          </NavLink>

          <nav className="links desktopOnly" aria-label="Primary">
            {NAV_ITEMS.map(({ to, key }) => (
              <NavLink key={to} to={to} end={to === "/"} className="navLink">
                {({ isActive }) => (
                  <>
                    <RollText>{navText[key]}</RollText>
                    {isActive ? <motion.span layoutId="navActive" className="navActive" transition={SPRING} /> : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="navActions desktopOnly">
            <LangSwitch language={language} setLanguage={setLanguage} navText={navText} layoutId="langDesktop" />
            <a className="btn small primary cvBtn" href="/cv.pdf" target="_blank" rel="noreferrer">
              <DownloadIcon />
              <RollText>{navText.downloadCv}</RollText>
              <span className="cvTag">PDF</span>
            </a>
          </div>

          <a className="btn small primary cvBtn navCv mobileOnly" href="/cv.pdf" target="_blank" rel="noreferrer">
            <DownloadIcon />
            <span>{navText.downloadCv}</span>
          </a>

          <button
            ref={burgerRef}
            className="burger mobileOnly"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`burgerBar${open ? " open" : ""}`} />
            <span className={`burgerBar${open ? " open" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="menu"
            data-chapter="ink"
            role="dialog"
            aria-modal="true"
            aria-label={navText.navigation}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuPanel}
          >
            <div className="menuInner wrap">
              <p className="menuHint">{navText.navigationHint}</p>
              <motion.ul className="menuLinks" variants={menuList}>
                {NAV_ITEMS.map(({ to, key }) => (
                  <li key={to} className="menuLinkMask">
                    <motion.span variants={menuItem} className="menuLinkInner">
                      <NavLink to={to} end={to === "/"} onClick={close}>{navText[key]}</NavLink>
                    </motion.span>
                  </li>
                ))}
              </motion.ul>
              <motion.div
                className="menuFoot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO, delay: 0.6 } }}
              >
                <LangSwitch language={language} setLanguage={setLanguage} navText={navText} layoutId="langMenu" />
                <a className="btn primary" href="/cv.pdf" target="_blank" rel="noreferrer" onClick={close}>
                  <DownloadIcon />
                  <span>{navText.downloadCv}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
