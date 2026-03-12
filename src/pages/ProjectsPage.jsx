import Projects from "../components/Projects";

export default function ProjectsPage({ text }) {
  return (
    <main className="container">
      <Projects text={text} />
    </main>
  );
}
