import Projects from "../components/Projects";

export default function ProjectsPage({ text }) {
  return (
    <main className="siteMain">
      <Projects text={text} />
    </main>
  );
}
