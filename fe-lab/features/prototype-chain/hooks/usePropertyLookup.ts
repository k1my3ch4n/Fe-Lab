"use client";

import { useState, useRef, useCallback } from "react";
import type { PrototypeNode } from "../types";

interface LookupResult {
  property: string;
  foundAt: number | null;
  traversed: number[];
}

export function usePropertyLookup(chain: PrototypeNode[]) {
  const [propertyInput, setPropertyInput] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState(-1);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    setAnimatingIndex(-1);
  }, []);

  const resetLookup = useCallback(() => {
    setPropertyInput("");
    setLookupResult(null);
    clearAnimation();
  }, [clearAnimation]);

  const lookupProperty = useCallback(
    (prop: string) => {
      if (!prop.trim()) {
        return;
      }

      clearAnimation();
      setLookupResult(null);

      const traversed: number[] = [];
      let foundAt: number | null = null;

      for (let i = 0; i < chain.length; i++) {
        const node = chain[i];
        traversed.push(i);

        if (node.properties.some((p) => p.name === prop)) {
          foundAt = i;
          break;
        }
      }

      // Animate traversal step by step using setTimeout chain
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
    [chain, clearAnimation],
  );

  return {
    propertyInput,
    setPropertyInput,
    lookupResult,
    animatingIndex,
    lookupProperty,
    resetLookup,
    clearAnimation,
  };
}
