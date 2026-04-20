"use client";

import { SectionHeader } from "@shared/ui";
import { ORIGINAL_OBJECT } from "../../model/constants";
import type { CopyMethod } from "../../model/types";

interface MutatedState {
  primitive?: boolean;
  reference?: boolean;
  isDeep?: boolean;
}

interface ReferenceDiagramProps {
  method: CopyMethod;
  mutated: MutatedState;
}

export function ReferenceDiagram({ method, mutated }: ReferenceDiagramProps) {
  return (
    <div>
      <SectionHeader>Reference Diagram</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        {/* Original */}
        <div className="rounded-lg border border-[#00e5ff44] bg-[#00e5ff08] p-3">
          <div className="font-mono text-[10px] font-semibold text-accent-cyan mb-2">
            original
          </div>
          {ORIGINAL_OBJECT.map((node) => (
            <div key={node.key} className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                <span style={{ color: node.color }}>{node.key}</span>
                <span className="text-text-muted">: </span>
                <span className="text-text-primary">
                  {mutated.reference &&
                  !mutated.isDeep &&
                  node.key === "address"
                    ? "{ city: 'Busan' }"
                    : node.value}
                </span>
              </span>
              {node.isReference && (
                <span className="text-[10px]" style={{ color: node.color }}>
                  {mutated.reference ? (method.isDeep ? "◇" : "◆→") : "◆→"}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Copy */}
        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: `${method.color}44`,
            background: `${method.color}08`,
          }}
        >
          <div
            className="font-mono text-[10px] font-semibold mb-2"
            style={{ color: method.color }}
          >
            copy ({method.isDeep ? "깊은 복사" : "얕은 복사"})
          </div>
          {ORIGINAL_OBJECT.map((node) => (
            <div key={node.key} className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                <span style={{ color: node.color }}>{node.key}</span>
                <span className="text-text-muted">: </span>
                <span className="text-text-primary">
                  {mutated.primitive && node.key === "name"
                    ? "'Lee'"
                    : mutated.reference && node.key === "address"
                      ? "{ city: 'Busan' }"
                      : node.value}
                </span>
              </span>
              {node.isReference && !method.isDeep && (
                <span className="text-[10px]" style={{ color: node.color }}>
                  ←◆
                </span>
              )}
              {node.isReference && method.isDeep && (
                <span className="text-[10px] text-accent-green">◇ 독립</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        <span className="font-mono text-[9px] text-text-muted">
          ◆→ 참조 공유 (얕은 복사)
        </span>
        <span className="font-mono text-[9px] text-text-muted">
          ◇ 독립 복사 (깊은 복사)
        </span>
      </div>
    </div>
  );
}
