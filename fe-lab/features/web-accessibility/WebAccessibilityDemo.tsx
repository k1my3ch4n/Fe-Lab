"use client";

import { useState, useCallback, useRef } from "react";
import {
  A11Y_TABS,
  SEMANTIC_COMPARISON,
  ARIA_EXAMPLES,
  type A11yTabId,
} from "./constants";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
} from "@shared/ui";

export default function WebAccessibilityDemo() {
  const [activeTab, setActiveTab] = useState<A11yTabId>("semantic");
  const [logs, setLogs] = useState<string[]>([]);
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showGoodVersion, setShowGoodVersion] = useState(false);

  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-30), text]);
  }, []);

  const handleTabChange = (id: A11yTabId) => {
    setActiveTab(id);
    setLogs([]);
    setAriaExpanded(false);
    setFocusedIndex(-1);
    setShowGoodVersion(false);
  };

  const handleReset = () => {
    setLogs([]);
    setAriaExpanded(false);
    setFocusedIndex(-1);
    setShowGoodVersion(false);
  };

  const handleToggleSemantic = () => {
    setShowGoodVersion((prev) => !prev);
    const next = !showGoodVersion;
    addLog(
      next
        ? "✅ 시맨틱 HTML 적용 — 스크린 리더가 구조를 인식"
        : "⬜ div만 사용 — 스크린 리더가 구조를 인식 못함",
    );
  };

  const handleAriaToggle = () => {
    const next = !ariaExpanded;
    setAriaExpanded(next);
    addLog(
      next
        ? '✅ aria-expanded="true" → 메뉴 펼침 상태 전달'
        : '⬜ aria-expanded="false" → 메뉴 닫힘 상태 전달',
    );
  };

  const kbItems = ["홈", "소개", "서비스", "연락처"];

  const handleKeyboardNav = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % kbItems.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + kbItems.length) % kbItems.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = kbItems.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addLog(`✅ "${kbItems[index]}" 선택됨 (${e.key})`);
      return;
    } else if (e.key === "Tab") {
      addLog(`Tab → 포커스가 네비게이션 밖으로 이동`);
      return;
    } else {
      return;
    }

    setFocusedIndex(nextIndex);
    addLog(`🔑 ${e.key} → "${kbItems[nextIndex]}" 포커스`);

    setTimeout(() => {
      navItemsRef.current[nextIndex]?.focus();
    }, 0);
  };

  const handleFocusItem = (index: number) => {
    setFocusedIndex(index);
    addLog(`🎯 "${kbItems[index]}" 포커스`);
  };

  const tabsForBar = A11Y_TABS.map((t) => ({ id: t.id, label: t.label }));
  const activeIndex = A11Y_TABS.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={tabsForBar}
        activeIndex={activeIndex}
        onTabChange={(i) => handleTabChange(A11Y_TABS[i].id)}
      />

      <DemoLayout
        rightPanel={
          <>
            <PanelHeader label="로그" onReset={handleReset} />

            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하거나\n키보드를 사용해보세요"}
            />
          </>
        }
      >
        {/* Semantic HTML tab */}
        {activeTab === "semantic" && (
          <>
            <button
              onClick={handleToggleSemantic}
              className={`self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                showGoodVersion
                  ? "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
                  : "border-accent-magenta text-accent-magenta bg-accent-magenta-dim hover:bg-[#ff2d8a33]"
              }`}
            >
              {showGoodVersion ? "✅ 시맨틱 HTML" : "❌ div 남용"} 보기
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-2">
                  {SEMANTIC_COMPARISON.bad.label}
                </div>
                <pre
                  className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto transition-opacity duration-300 ${
                    showGoodVersion ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <code className="text-accent-magenta">
                    {SEMANTIC_COMPARISON.bad.code}
                  </code>
                </pre>
              </div>
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-2">
                  {SEMANTIC_COMPARISON.good.label}
                </div>
                <pre
                  className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto transition-opacity duration-300 ${
                    showGoodVersion ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <code className="text-accent-green">
                    {SEMANTIC_COMPARISON.good.code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Live preview */}
            <div>
              <SectionHeader>스크린 리더 인식 결과</SectionHeader>
              <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
                {showGoodVersion ? (
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green leading-[2]">
                    <div>📢 banner: &quot;사이트명&quot; (heading level 1)</div>
                    <div>📢 navigation: 2개 링크 발견</div>
                    <div>
                      📢 main: article &quot;제목&quot; (heading level 2)
                    </div>
                    <div>📢 contentinfo: &quot;© 2024&quot;</div>
                  </div>
                ) : (
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta leading-[2]">
                    <div>📢 group: &quot;사이트명&quot; (구조 불명)</div>
                    <div>
                      📢 group: &quot;홈&quot; &quot;소개&quot; (역할 불명)
                    </div>
                    <div>
                      📢 group: &quot;제목&quot; &quot;본문...&quot; (역할 불명)
                    </div>
                    <div>📢 group: &quot;© 2024&quot; (역할 불명)</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ARIA tab */}
        {activeTab === "aria" && (
          <>
            <button
              onClick={handleAriaToggle}
              className="self-start font-[family-name:var(--font-mono)] text-[11px] px-4 py-2 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
              aria-expanded={ariaExpanded}
              aria-controls="demo-menu"
            >
              메뉴 {ariaExpanded ? "닫기" : "열기"} (aria-expanded=
              {String(ariaExpanded)})
            </button>

            <div className="grid grid-cols-2 gap-4">
              {ARIA_EXAMPLES.map((example) => (
                <div key={example.id}>
                  <div
                    className={`font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider mb-2 ${
                      example.id === "after"
                        ? "text-accent-green"
                        : "text-accent-magenta"
                    }`}
                  >
                    {example.label}
                  </div>
                  <pre
                    className={`font-[family-name:var(--font-mono)] text-[11px] bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto ${
                      example.id === "after"
                        ? "text-accent-green"
                        : "text-accent-magenta"
                    }`}
                  >
                    {example.html}
                  </pre>
                  {example.issues.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {example.issues.map((issue, i) => (
                        <div
                          key={i}
                          className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta"
                        >
                          ⚠️ {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Live ARIA demo */}
            <div
              id="demo-menu"
              role="navigation"
              aria-hidden={!ariaExpanded}
              className={`bg-bg-deep rounded-lg border border-border-subtle p-4 transition-all duration-300 ${
                ariaExpanded
                  ? "opacity-100 max-h-[200px]"
                  : "opacity-30 max-h-[40px] overflow-hidden"
              }`}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-2">
                aria-hidden={String(!ariaExpanded)}
              </div>
              <div className="flex gap-2">
                {["홈", "소개", "서비스"].map((item) => (
                  <button
                    key={item}
                    role="menuitem"
                    tabIndex={ariaExpanded ? 0 : -1}
                    onClick={() =>
                      addLog(`✅ "${item}" 클릭 (role="menuitem")`)
                    }
                    className="font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded border border-border-subtle text-text-secondary bg-bg-surface cursor-pointer hover:border-accent-cyan hover:text-accent-cyan transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Keyboard tab */}
        {activeTab === "keyboard" && (
          <>
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary leading-[1.8] bg-bg-deep rounded-lg p-4">
              <span className="text-accent-cyan">Tab</span> — 포커스 이동 |{" "}
              <span className="text-accent-cyan">Arrow</span> — 항목 간 이동 |{" "}
              <span className="text-accent-cyan">Enter/Space</span> — 선택 |{" "}
              <span className="text-accent-cyan">Home/End</span> — 처음/끝으로
            </div>

            <div>
              <SectionHeader>키보드 네비게이션 테스트</SectionHeader>
              <div
                role="menubar"
                aria-label="메인 네비게이션"
                className="flex gap-2"
              >
                {kbItems.map((item, i) => (
                  <button
                    key={item}
                    ref={(el) => {
                      navItemsRef.current[i] = el;
                    }}
                    role="menuitem"
                    tabIndex={
                      focusedIndex === i || (focusedIndex === -1 && i === 0)
                        ? 0
                        : -1
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
        )}
      </DemoLayout>
    </>
  );
}
