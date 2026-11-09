import Skills from "../components/Skills";

export default function SkillsPage({ text }) {
  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <Skills text={text} />
    </main>
  );
}
