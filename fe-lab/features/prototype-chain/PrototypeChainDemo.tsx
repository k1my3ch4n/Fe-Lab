"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { TabBar } from "@shared/ui";
import {
  PROTOTYPE_CHAIN_EXAMPLES,
  PROPERTY_SUGGESTIONS,
  type PrototypeNode,
} from "./constants";

export default function PrototypeChainDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [propertyInput, setPropertyInput] = useState("");
  const [lookupResult, setLookupResult] = useState<{
    property: string;
    foundAt: number | null; // index in chain, null = not found
    traversed: number[];
  } | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState(-1);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const example = PROTOTYPE_CHAIN_EXAMPLES[activeExample];
  const suggestions = PROPERTY_SUGGESTIONS[example.id] ?? [];

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    setAnimatingIndex(-1);
  }, []);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setPropertyInput("");
    setLookupResult(null);
    clearAnimation();
  };

  const lookupProperty = useCallback(
    (prop: string) => {
      if (!prop.trim()) {
        return;
      }

      clearAnimation();
      setLookupResult(null);

      const traversed: number[] = [];
      let foundAt: number | null = null;

      for (let i = 0; i < example.chain.length; i++) {
        const node = example.chain[i];
        traversed.push(i);
        if (node.properties.some((p) => p.name === prop)) {
          foundAt = i;
          break;
        }
      }

      // Animate traversal step by step
      let step = 0;
      const animate = () => {
        if (step < traversed.length) {
          setAnimatingIndex(traversed[step]);
          step++;
          animationRef.current = setTimeout(animate, 400);
        } else {
          setLookupResult({ property: prop, foundAt, traversed });
        }
      };
      animate();
    },
    [example, clearAnimation],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupProperty(propertyInput);
  };

  useEffect(() => {
    return () => clearAnimation();
  }, [clearAnimation]);

  const tabs = PROTOTYPE_CHAIN_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
  }));

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={tabs}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Chain Visualization */}
        <div className="p-6 flex flex-col gap-5">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Prototype Chain
            </div>
            <div className="flex flex-col gap-0">
              {example.chain.map((node, i) => (
                <ChainNode
                  key={`${example.id}-${i}`}
                  node={node}
                  index={i}
                  isLast={i === example.chain.length - 1}
                  isAnimating={animatingIndex === i}
                  isFound={lookupResult?.foundAt === i}
                  isTraversed={lookupResult?.traversed.includes(i) ?? false}
                  isNotFoundEnd={
                    lookupResult !== null &&
                    lookupResult.foundAt === null &&
                    i === example.chain.length - 1
                  }
                  searchProperty={lookupResult?.property ?? null}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Property Lookup Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              프로퍼티 탐색
            </span>
          </div>

          {/* Search input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-b border-border-subtle"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={propertyInput}
                onChange={(e) => setPropertyInput(e.target.value)}
                placeholder="프로퍼티 이름 입력"
                className="flex-1 font-[family-name:var(--font-mono)] text-[12px] px-3 py-2 rounded-lg border border-border-subtle bg-bg-deep text-text-primary placeholder:text-text-muted outline-none focus:border-accent-cyan transition-colors"
              />
              <button
                type="submit"
                className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-2 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
              >
                탐색
              </button>
            </div>
          </form>

          {/* Suggestions */}
          <div className="p-4 border-b border-border-subtle">
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-2">
              추천 프로퍼티
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setPropertyInput(s);
                    lookupProperty(s);
                  }}
                  className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded border border-border-subtle text-text-secondary bg-bg-deep cursor-pointer transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan"
                >
                  .{s}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="flex-1 p-4 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {lookupResult === null && animatingIndex < 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                프로퍼티 이름을 입력하여
                <br />
                체인 탐색 과정을 확인하세요
              </div>
            ) : lookupResult === null ? (
              <div className="text-accent-cyan text-center px-4 py-8 animate-pulse">
                탐색 중...
              </div>
            ) : lookupResult.foundAt !== null ? (
              <div className="space-y-2">
                <div className="text-accent-green">
                  <span className="text-text-muted">.</span>
                  {lookupResult.property}{" "}
                  <span className="text-text-muted">발견!</span>
                </div>
                <div className="text-text-secondary text-[10px] leading-[1.8]">
                  <span
                    className="font-semibold"
                    style={{
                      color: example.chain[lookupResult.foundAt].color,
                    }}
                  >
                    {example.chain[lookupResult.foundAt].name}
                  </span>
                  에서 발견
                </div>
                <div className="text-text-muted text-[10px]">
                  탐색 단계: {lookupResult.traversed.length}단계
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-accent-magenta">
                  <span className="text-text-muted">.</span>
                  {lookupResult.property}{" "}
                  <span className="text-text-muted">= </span>
                  undefined
                </div>
                <div className="text-text-secondary text-[10px] leading-[1.8]">
                  체인 끝(null)까지 탐색했지만
                  <br />
                  프로퍼티를 찾지 못했습니다
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ChainNode({
  node,
  index,
  isLast,
  isAnimating,
  isFound,
  isTraversed,
  isNotFoundEnd,
  searchProperty,
}: {
  node: PrototypeNode;
  index: number;
  isLast: boolean;
  isAnimating: boolean;
  isFound: boolean;
  isTraversed: boolean;
  isNotFoundEnd: boolean;
  searchProperty: string | null;
}) {
  const isNull = node.name === "null";

  const borderColor = isFound
    ? "#00e676"
    : isNotFoundEnd
      ? "#ff2d8a"
      : isAnimating
        ? "#00e5ff"
        : `${node.color}44`;

  const bgColor = isFound
    ? "#00e67610"
    : isNotFoundEnd
      ? "#ff2d8a10"
      : isAnimating
        ? "#00e5ff15"
        : `${node.color}08`;

  return (
    <div className="flex flex-col items-start">
      <div
        className="rounded-lg border p-3 w-full transition-all duration-300"
        style={{
          borderColor,
          background: bgColor,
          marginLeft: `${index * 16}px`,
          maxWidth: `calc(100% - ${index * 16}px)`,
          boxShadow: isAnimating
            ? "0 0 12px rgba(0, 229, 255, 0.2)"
            : isFound
              ? "0 0 12px rgba(0, 230, 118, 0.2)"
              : "none",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          {isAnimating && (
            <span className="text-[10px] text-accent-cyan animate-pulse">
              {">>"}
            </span>
          )}
          <span
            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
            style={{ color: node.color }}
          >
            {isNull ? "null (체인 끝)" : node.name}
          </span>
          {isFound && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-green bg-accent-green-dim px-1.5 py-0.5 rounded">
              FOUND
            </span>
          )}
          {isNotFoundEnd && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-accent-magenta bg-accent-magenta-dim px-1.5 py-0.5 rounded">
              NOT FOUND
            </span>
          )}
        </div>
        {!isNull && (
          <div className="flex flex-wrap gap-1.5">
            {node.properties.map((p) => {
              const isMatch = isFound && searchProperty === p.name;
              return (
                <span
                  key={p.name}
                  className="font-[family-name:var(--font-mono)] text-[10px] px-2 py-1 rounded transition-all duration-200"
                  style={{
                    background: isMatch ? "#00e67620" : "var(--bg-deep)",
                    border: isMatch
                      ? "1px solid #00e67644"
                      : "1px solid transparent",
                  }}
                >
                  <span
                    style={{
                      color: isMatch ? "#00e676" : node.color,
                    }}
                  >
                    {p.name}
                  </span>
                  <span className="text-text-muted"> : </span>
                  <span className="text-text-primary">{p.value}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div
          className="flex flex-col items-center py-1"
          style={{ marginLeft: `${index * 16 + 24}px` }}
        >
          <div
            className={`w-px h-4 transition-colors duration-300 ${
              isTraversed ? "bg-accent-cyan" : "bg-border-subtle"
            }`}
          />
          <span
            className={`font-[family-name:var(--font-mono)] text-[9px] leading-none transition-colors duration-300 ${
              isTraversed ? "text-accent-cyan" : "text-text-muted"
            }`}
          >
            __proto__
          </span>
          <div
            className={`w-px h-4 transition-colors duration-300 ${
              isTraversed ? "bg-accent-cyan" : "bg-border-subtle"
            }`}
          />
          <span
            className={`text-[10px] leading-none transition-colors duration-300 ${
              isTraversed ? "text-accent-cyan" : "text-text-muted"
            }`}
          >
            {"v"}
          </span>
        </div>
      )}
    </div>
  );
}
