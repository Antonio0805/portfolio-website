import Projects from "../components/Projects";

export default function ProjectsPage({ text }) {
  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <Projects text={text} />
    </main>
  );
}
