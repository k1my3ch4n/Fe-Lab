interface TypeTransformationVisualizationProps {
  inputType: string;
  outputType: string;
  color: string;
  resolvedType: string | null;
}

export function TypeTransformationVisualization({
  inputType,
  outputType,
  color,
  resolvedType,
}: TypeTransformationVisualizationProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Input Type */}
      <div
        className="flex-1 rounded-lg border p-3"
        style={{
          borderColor: `${color}44`,
          background: `${color}08`,
        }}
      >
        <div
          className="font-mono text-caption font-semibold mb-1"
          style={{ color: color }}
        >
          Input Type
        </div>
        <div className="font-mono text-label text-text-primary">
          {inputType}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-text-muted text-lg">→</div>

      {/* Output Type */}
      <div
        className="flex-1 rounded-lg border p-3"
        style={{
          borderColor: `${color}44`,
          background: `${color}08`,
        }}
      >
        <div
          className="font-mono text-caption font-semibold mb-1"
          style={{ color: color }}
        >
          Output Type
        </div>
        <div className="font-mono text-label text-text-primary">
          {resolvedType ?? outputType}
        </div>
      </div>
    </div>
  );
}
