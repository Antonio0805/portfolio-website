import Contact from "../components/Contact";

export default function ContactPage({ text }) {
  return (
    <main className="container">
      <Contact text={text} />
    </main>
  );
}
