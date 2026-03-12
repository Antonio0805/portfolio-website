import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/ Navbar";
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

  useEffect(() => {
    localStorage.setItem("cv-language", language);
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const texts = content[language];

  return (
    <div className="page">
      <Navbar language={language} setLanguage={setLanguage} navText={texts.nav} />

      <Routes>
        <Route path="/" element={<Home text={texts.home} />} />
        <Route path="/experience" element={<ExperiencePage text={texts.experience} />} />
        <Route path="/projects" element={<ProjectsPage text={texts.projects} />} />
        <Route path="/skills" element={<SkillsPage text={texts.skills} />} />
        <Route path="/education" element={<EducationPage text={texts.education} />} />
        <Route path="/contact" element={<ContactPage text={texts.contact} />} />
      </Routes>
    </div>
  );
}
