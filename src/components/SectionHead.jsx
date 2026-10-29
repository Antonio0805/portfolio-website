import { KineticText, Stagger, StaggerItem } from "./Motion";

export default function SectionHead({ eyebrow, title, lead }) {
  return (
    <Stagger className="sectionHead premiumSectionHead" gap={0.1}>
      <div>
        <StaggerItem as="span" className="sectionEyebrow premiumEyebrow">{eyebrow}</StaggerItem>
        <KineticText as="h2" className="h2 premiumTitle" text={title} gap={0.02} inView hover />
      </div>
      {lead ? <StaggerItem as="p" className="sectionLead premiumLead">{lead}</StaggerItem> : null}
    </Stagger>
  );
}
