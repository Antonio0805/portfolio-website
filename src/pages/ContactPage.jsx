import Contact from "../components/Contact";

export default function ContactPage({ text }) {
  return (
    <main id="main-content" className="siteMain" tabIndex={-1}>
      <Contact text={text} />
    </main>
  );
}
