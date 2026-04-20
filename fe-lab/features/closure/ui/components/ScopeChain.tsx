"use client";

import { SectionHeader } from "@shared/ui";
import type { ScopeBlock } from "../../model/types";

interface ScopeChainProps {
  scopes: ScopeBlock[];
  activeExample: number;
  counterValue: number;
}

export function ScopeChain({ scopes, activeExample, counterValue }: ScopeChainProps) {
  return (
    <div>
      <SectionHeader>Scope Chain</SectionHeader>
      <div className="flex flex-col gap-2">
        {scopes.map((scope, index) => (
          <div
            key={index}
            className="rounded-lg border p-3 transition-all duration-300"
            style={{
              borderColor: `${scope.color}44`,
              background: `${scope.color}08`,
              marginLeft: `${index * 20}px`,
            }}
          >
            <div
              className="font-mono text-caption font-semibold mb-1.5"
              style={{ color: scope.color }}
            >
              {scope.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {scope.variables.map((variable, varIndex) => (
                <span
                  key={varIndex}
                  className="font-mono text-caption bg-bg-deep px-2 py-1 rounded"
                >
                  <span style={{ color: scope.color }}>{variable.name}</span>
                  <span className="text-text-muted"> = </span>
                  <span className="text-text-primary">
                    {variable.name === "count" && activeExample === 0
                      ? String(counterValue)
                      : variable.value}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
