interface SampleElementBoxProps {
  style: React.CSSProperties;
}

export function SampleElementBox({ style }: SampleElementBoxProps) {
  return (
    <div className="bg-bg-deep rounded-lg p-8 flex items-center justify-center min-h-[160px]">
      <div style={style}>
        <span className="font-mono text-[10px] text-accent-cyan">
          Box
        </span>
      </div>
    </div>
  );
}
