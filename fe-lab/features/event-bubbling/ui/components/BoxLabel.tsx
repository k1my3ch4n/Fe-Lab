interface BoxLabelProps {
  text: string;
  color: string;
}

export default function BoxLabel({ text, color }: BoxLabelProps) {
  return (
    <span
      className={`absolute top-2 left-3 font-mono text-caption opacity-60 ${color}`}
    >
      {text}
    </span>
  );
}
