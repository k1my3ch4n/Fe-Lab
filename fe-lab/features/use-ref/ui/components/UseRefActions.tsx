"use client";

import { ActionButton } from "@shared/ui";

interface UseRefActionsProps {
  activeExample: number;
  stateCount: number;
  refCountRef: { current: number };
  inputRef: { current: HTMLInputElement | null };
  inputValue: number;
  prevDisplay: number | undefined;
  addLog: (message: string) => void;
  setStateCount: (updater: (count: number) => number) => void;
  setPrevDisplay: (value: number) => void;
  setInputValue: (value: number) => void;
}

export function UseRefActions({
  activeExample,
  stateCount,
  refCountRef,
  inputRef,
  inputValue,
  prevDisplay,
  addLog,
  setStateCount,
  setPrevDisplay,
  setInputValue,
}: UseRefActionsProps) {
  if (activeExample === 0) {
    return (
      <>
        <ActionButton
          variant="cyan"
          onClick={() => {
            setStateCount((count) => count + 1);
            addLog(`setState → ${stateCount + 1} (리렌더링 O)`);
          }}
        >
          setState +1
        </ActionButton>
        <ActionButton
          variant="violet"
          onClick={() => {
            refCountRef.current += 1;
            addLog(`ref.current → ${refCountRef.current} (리렌더링 X)`);
          }}
        >
          ref.current +1
        </ActionButton>
      </>
    );
  }

  if (activeExample === 1) {
    return (
      <>
        <ActionButton
          variant="green"
          onClick={() => {
            inputRef.current?.focus();
            addLog("inputRef.current.focus()");
          }}
        >
          focus()
        </ActionButton>
        <ActionButton
          variant="amber"
          onClick={() => {
            inputRef.current?.blur();
            addLog("inputRef.current.blur()");
          }}
        >
          blur()
        </ActionButton>
      </>
    );
  }

  if (activeExample === 2) {
    return (
      <>
        <ActionButton
          variant="cyan"
          onClick={() => {
            const next = inputValue + 1;
            addLog(
              `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
            );
            setPrevDisplay(inputValue);
            setInputValue(next);
          }}
        >
          값 +1
        </ActionButton>
        <ActionButton
          variant="amber"
          onClick={() => {
            const next = inputValue + 10;
            addLog(
              `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
            );
            setPrevDisplay(inputValue);
            setInputValue(next);
          }}
        >
          값 +10
        </ActionButton>
      </>
    );
  }

  return null;
}
