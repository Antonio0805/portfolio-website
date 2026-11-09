import Experience from "../components/Experience";

export default function ExperiencePage({ text }) {
  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <Experience text={text} />
    </main>
  );
}
