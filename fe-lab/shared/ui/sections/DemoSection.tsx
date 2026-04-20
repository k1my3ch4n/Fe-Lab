import SectionLabel from "./SectionLabel";

interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function DemoSection({
  title,
  description,
  children,
}: DemoSectionProps) {
  return (
    <section className="mb-14">
      <SectionLabel number="02" label="Interactive Demo" variant="demo" />
      <h2 className="font-display text-[28px] font-bold tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-sm text-text-secondary leading-[1.7] max-w-full lg:max-w-[700px]">
        {description}
      </p>
      <div className="bg-bg-surface border border-border-subtle rounded-[var(--radius)] mt-6 overflow-hidden">
        {children}
      </div>
    </section>
  );
}
