export default function SectionHead({ title, lead }) {
  return (
    <header className="chapter pageHead" data-chapter="paper">
      <div className="wrap pageHeadGrid">
        <h1 className="pageTitle">{title}</h1>
        {lead ? <p className="pageLead">{lead}</p> : null}
      </div>
    </header>
  );
}
