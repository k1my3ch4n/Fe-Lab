interface BoxLabelProps {
  text: string;
  color: string;
}

export default function BoxLabel({ text, color }: BoxLabelProps) {
  return (
    <span
      className={`absolute top-2 left-3 font-mono text-[10px] opacity-60 ${color}`}
    >
      {text}
    </span>
  );
}
