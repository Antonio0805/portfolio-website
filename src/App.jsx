import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/home.css";
import "./styles/pages.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import Navbar from "./components/ Navbar";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import { PageTransition, RouteLabelProvider } from "./components/Motion";
import { scrollToTop, useSmoothScroll } from "./lib/smoothScroll";
import { content } from "./content";

import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";

const ROUTE_KEYS = {
  "/experience": "experience",
  "/projects": "projects",
  "/skills": "skills",
  "/education": "education",
  "/contact": "contact",
};

export default function App() {
  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("cv-language");
    return savedLanguage === "ro" || savedLanguage === "en" ? savedLanguage : "en";
  });

  useSmoothScroll();

  useEffect(() => {
    localStorage.setItem("cv-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const texts = content[language];
  const routeKey = ROUTE_KEYS[location.pathname];
  const label = routeKey ? texts.nav[routeKey] : "Antonio Smărăndescu";

  return (
    <MotionConfig reducedMotion="user">
      <RouteLabelProvider value={{ label }}>
        <div className="page">
          <Cursor />
          <Navbar language={language} setLanguage={setLanguage} navText={texts.nav} />

          <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home text={texts.home} nav={texts.nav} projects={texts.projects} />} />
                <Route path="/experience" element={<ExperiencePage text={texts.experience} />} />
                <Route path="/projects" element={<ProjectsPage text={texts.projects} />} />
                <Route path="/skills" element={<SkillsPage text={texts.skills} />} />
                <Route path="/education" element={<EducationPage text={texts.education} />} />
                <Route path="/contact" element={<ContactPage text={texts.contact} />} />
              </Routes>
              <Footer nav={texts.nav} cta={texts.home.ctaContact} showCta={location.pathname !== "/contact"} />
            </PageTransition>
          </AnimatePresence>
        </div>
      </RouteLabelProvider>
    </MotionConfig>
  );
}
