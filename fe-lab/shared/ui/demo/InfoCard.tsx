interface InfoCardProps {
  label: string;
  value: React.ReactNode;
  color: string;
}

export default function InfoCard({ label, value, color }: InfoCardProps) {
  return (
    <div
      className="flex-1 rounded-lg border p-3"
      style={{ borderColor: `${color}44`, background: `${color}08` }}
    >
      <div
        className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
        style={{ color }}
      >
        {label}
      </div>
      <div
        className="font-[family-name:var(--font-mono)] text-[24px] font-bold"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
