import type { StateLayer } from "../../model/types";

interface ArchitectureLayersProps {
  layers: StateLayer[];
}

export function ArchitectureLayers({ layers }: ArchitectureLayersProps) {
  return (
    <div className="flex flex-col gap-2">
      {layers.map((layer, i) => (
        <div
          key={i}
          className="rounded-lg border p-3 transition-all duration-300"
          style={{
            borderColor: `${layer.color}44`,
            background: `${layer.color}08`,
            marginLeft: `${i * 16}px`,
          }}
        >
          <div
            className="font-mono text-caption font-semibold"
            style={{ color: layer.color }}
          >
            {layer.name}
          </div>
          <div className="font-mono text-caption text-text-muted mt-1">
            {layer.description}
          </div>
        </div>
      ))}
    </div>
  );
}
