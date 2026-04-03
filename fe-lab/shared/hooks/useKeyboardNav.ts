"use client";

import { useEffect, type RefObject } from "react";

export default function useKeyboardNav(
  inputRef: RefObject<HTMLInputElement | null>,
  onClear: () => void,
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !isInputFocused()) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape" && inputRef.current) {
        onClear();
        inputRef.current.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputRef, onClear]);
}

function isInputFocused() {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}
