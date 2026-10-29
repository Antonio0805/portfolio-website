import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import Navbar from "./components/ Navbar";
import { Intro, PageTransition } from "./components/Motion";
import { content } from "./content";

import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("cv-language");
    return savedLanguage === "ro" || savedLanguage === "en" ? savedLanguage : "en";
  });

  // The intro curtain plays once per browser session.
  const [introVisible, setIntroVisible] = useState(() => {
    try {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return !reduceMotion && !sessionStorage.getItem("cv-intro-seen");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("cv-language", language);
  }, [language]);

  useEffect(() => {
    if (!introVisible) {
      return undefined;
    }

    try {
      sessionStorage.setItem("cv-intro-seen", "1");
    } catch {
      // Storage can be unavailable (private mode); the intro just replays.
    }
    const id = setTimeout(() => setIntroVisible(false), 1700);
    return () => clearTimeout(id);
  }, [introVisible]);

  useEffect(() => {
    // Feeds the cursor position to any `.spotlight` element for its hover glow.
    const onPointerMove = (event) => {
      const target = event.target.closest?.(".spotlight");
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const texts = content[language];

  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <Intro show={introVisible} label="Antonio-Ștefan Smărăndescu" />

        <div className="backdrop" aria-hidden="true">
          <span className="orb orb1" />
          <span className="orb orb2" />
          <span className="orb orb3" />
          <span className="backdropGrid" />
        </div>

        <Navbar language={language} setLanguage={setLanguage} navText={texts.nav} />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
        >
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home text={texts.home} ready={!introVisible} />} />
              <Route path="/experience" element={<ExperiencePage text={texts.experience} />} />
              <Route path="/projects" element={<ProjectsPage text={texts.projects} />} />
              <Route path="/skills" element={<SkillsPage text={texts.skills} />} />
              <Route path="/education" element={<EducationPage text={texts.education} />} />
              <Route path="/contact" element={<ContactPage text={texts.contact} />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
