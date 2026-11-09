import Education from "../components/Education";

export default function EducationPage({ text }) {
  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <Education text={text} />
    </main>
  );
}
