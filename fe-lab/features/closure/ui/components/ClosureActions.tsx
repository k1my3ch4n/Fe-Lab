"use client";

import { ActionButton } from "@shared/ui";

interface ClosureActionsProps {
  activeExample: number;
  onCounterClick: () => void;
  addLog: (message: string) => void;
  clearLogs: () => void;
}

export function ClosureActions({
  activeExample,
  onCounterClick,
  addLog,
  clearLogs,
}: ClosureActionsProps) {
  if (activeExample === 0) {
    return (
      <ActionButton variant="cyan" onClick={onCounterClick}>
        counter() 호출
      </ActionButton>
    );
  }

  if (activeExample === 1) {
    return (
      <>
        <ActionButton
          variant="green"
          onClick={() => addLog("wallet.deposit(500) → 1500")}
        >
          wallet.deposit(500)
        </ActionButton>
        <ActionButton
          variant="amber"
          onClick={() => addLog("wallet.getBalance() → 1500")}
        >
          wallet.getBalance()
        </ActionButton>
        <ActionButton
          variant="magenta"
          onClick={() => addLog("wallet.balance → undefined ❌")}
        >
          wallet.balance (직접 접근)
        </ActionButton>
      </>
    );
  }

  if (activeExample === 2) {
    return (
      <>
        <ActionButton
          variant="magenta"
          onClick={() => {
            clearLogs();
            addLog("// var 사용 (문제)");
            addLog("→ 3, 3, 3");
          }}
        >
          var로 실행 (버그)
        </ActionButton>
        <ActionButton
          variant="green"
          onClick={() => {
            clearLogs();
            addLog("// IIFE 클로저 사용");
            addLog("→ 0, 1, 2 ✓");
          }}
        >
          IIFE로 실행 (해결)
        </ActionButton>
        <ActionButton
          variant="cyan"
          onClick={() => {
            clearLogs();
            addLog("// let 블록 스코프 사용");
            addLog("→ 0, 1, 2 ✓");
          }}
        >
          let으로 실행 (해결)
        </ActionButton>
      </>
    );
  }

  return null;
}
