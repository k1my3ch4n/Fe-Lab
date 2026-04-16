"use client";

import { useEffect, useState } from "react";
import { TabBar } from "@shared/ui";
import {
  PROTOTYPE_CHAIN_EXAMPLES,
  TABS,
  PROPERTY_SUGGESTIONS,
} from "../model/constants";
import { usePropertyLookup } from "./hooks/usePropertyLookup";
import { ChainNode } from "./components/ChainNode";

export default function PrototypeChainDemo() {
  const [activeExample, setActiveExample] = useState(0);

  const example = PROTOTYPE_CHAIN_EXAMPLES[activeExample];
  const suggestions = PROPERTY_SUGGESTIONS[example.id] ?? [];

  const {
    propertyInput,
    setPropertyInput,
    lookupResult,
    animatingIndex,
    lookupProperty,
    resetLookup,
    clearAnimation,
  } = usePropertyLookup(example.chain);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    resetLookup();
  };

  useEffect(() => {
    return () => clearAnimation();
  }, [clearAnimation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lookupProperty(propertyInput);
  };

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] lg:min-h-[420px]">
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
