"use client";

import { useState, useRef } from "react";
import { SectionHeader } from "@shared/ui";

interface UseKeyboardTabOptions {
  addLog: (text: string) => void;
}

const KB_ITEMS = ["홈", "소개", "서비스", "연락처"];

export function useKeyboardTab({ addLog }: UseKeyboardTabOptions) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const reset = () => {
    setFocusedIndex(-1);
  };

  const handleKeyboardNav = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % KB_ITEMS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + KB_ITEMS.length) % KB_ITEMS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = KB_ITEMS.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addLog(`✅ "${KB_ITEMS[index]}" 선택됨 (${e.key})`);
      return;
    } else if (e.key === "Tab") {
      addLog(`Tab → 포커스가 네비게이션 밖으로 이동`);
      return;
    } else {
      return;
    }

    setFocusedIndex(nextIndex);
    addLog(`🔑 ${e.key} → "${KB_ITEMS[nextIndex]}" 포커스`);

    setTimeout(() => {
      navItemsRef.current[nextIndex]?.focus();
    }, 0);
  };

  const handleFocusItem = (index: number) => {
    setFocusedIndex(index);
    addLog(`🎯 "${KB_ITEMS[index]}" 포커스`);
  };

  const content = (
    <>
      <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary leading-[1.8] bg-bg-deep rounded-lg p-4">
        <span className="text-accent-cyan">Tab</span> — 포커스 이동 |{" "}
        <span className="text-accent-cyan">Arrow</span> — 항목 간 이동 |{" "}
        <span className="text-accent-cyan">Enter/Space</span> — 선택 |{" "}
        <span className="text-accent-cyan">Home/End</span> — 처음/끝으로
      </div>

      <div>
        <SectionHeader>키보드 네비게이션 테스트</SectionHeader>
        <div role="menubar" aria-label="메인 네비게이션" className="flex gap-2">
          {KB_ITEMS.map((item, i) => (
            <button
              key={item}
              ref={(el) => {
                navItemsRef.current[i] = el;
              }}
              role="menuitem"
              tabIndex={
                focusedIndex === i || (focusedIndex === -1 && i === 0) ? 0 : -1
              }
              onKeyDown={(e) => handleKeyboardNav(e, i)}
              onFocus={() => handleFocusItem(i)}
              onClick={() => addLog(`✅ "${item}" 클릭`)}
              className={`font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                focusedIndex === i
                  ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                  : "border-border-subtle text-text-secondary bg-bg-surface hover:border-accent-cyan/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Focus management example */}
      <div>
        <SectionHeader>포커스 관리 코드</SectionHeader>
        <pre className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
          {`// roving tabindex 패턴
// 그룹 내 하나만 tabIndex=0, 나머지는 -1
<div role="menubar">
  <button role="menuitem" tabIndex={0}>홈</button>
  <button role="menuitem" tabIndex={-1}>소개</button>
  <button role="menuitem" tabIndex={-1}>서비스</button>
</div>

// Arrow 키로 포커스 이동
onKeyDown={(e) => {
  if (e.key === 'ArrowRight') focusNext();
  if (e.key === 'ArrowLeft') focusPrev();
}`}
        </pre>
      </div>
    </>
  );

  return { content, reset };
}
