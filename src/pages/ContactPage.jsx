import Contact from "../components/Contact";

export default function ContactPage({ text }) {
  return (
    <main className="siteMain">
      <Contact text={text} />
    </main>
  );
}
