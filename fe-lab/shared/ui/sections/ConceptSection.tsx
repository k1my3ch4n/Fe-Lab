import SectionLabel from "./SectionLabel";

interface ConceptSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ConceptSection({
  title,
  description,
  children,
}: ConceptSectionProps) {
  return (
    <section className="mb-14">
      <SectionLabel number="01" label="Concept" variant="concept" />
      <h2 className="font-display text-section-title font-bold tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-sm text-text-secondary leading-[1.7] max-w-full lg:max-w-[700px]">
        {description}
      </p>
      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius)] p-6 mt-6">
        {children}
      </div>
    </section>
  );
}
