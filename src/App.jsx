import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/home.css";
import "./styles/pages.css";
import "./styles/motion.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/ Navbar";
import Footer from "./components/Footer";
import { content } from "./content";
import { useScrollReveal } from "./lib/useScrollReveal";

import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const location = useLocation();
  useScrollReveal(location.pathname);
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("cv-language") === "ro" ? "ro" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cv-language", language);
    } catch {
      // Language switching also works when browser storage is unavailable.
    }
    document.documentElement.lang = language;
  }, [language]);

  const texts = content[language];

  useLayoutEffect(() => {
    const target =
      location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // Wait until the route and the mobile menu have both committed.
    const frame = requestAnimationFrame(() => {
      document.querySelector("main")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const pageName =
      {
        "/": texts.nav.about,
        "/experience": texts.nav.experience,
        "/projects": texts.nav.projects,
        "/skills": texts.nav.skills,
        "/education": texts.nav.education,
        "/contact": texts.nav.contact,
      }[location.pathname] || texts.nav.about;
    document.title = `${pageName} · Antonio Smărăndescu`;
  }, [location.pathname, texts]);

  return (
    <div className="page" data-chapter="ink">
      <a className="skipLink" href="#main-content">
        {texts.nav.skipToContent}
      </a>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        navText={texts.nav}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home text={texts.home} nav={texts.nav} projects={texts.projects} />
          }
        />
        <Route
          path="/experience"
          element={<ExperiencePage text={texts.experience} />}
        />
        <Route
          path="/projects"
          element={<ProjectsPage text={texts.projects} />}
        />
        <Route path="/skills" element={<SkillsPage text={texts.skills} />} />
        <Route
          path="/education"
          element={<EducationPage text={texts.education} />}
        />
        <Route path="/contact" element={<ContactPage text={texts.contact} />} />
        <Route
          path="*"
          element={
            <Home text={texts.home} nav={texts.nav} projects={texts.projects} />
          }
        />
      </Routes>
      <Footer
        nav={texts.nav}
        cta={texts.home.ctaContact}
        showCta={location.pathname !== "/contact"}
      />
    </div>
  );
}
