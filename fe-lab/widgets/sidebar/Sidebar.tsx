"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { getCategories } from "@entities/topic";
import { useKeyboardNav } from "@shared/hooks";
import NavItem from "./NavItem";
import SearchInput from "./SearchInput";
import ThemeToggle from "@shared/ui/ThemeToggle";
import SidebarToggle from "./SidebarToggle";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const categories = getCategories();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const clearSearch = useCallback(() => setSearch(""), []);
  useKeyboardNav(searchInputRef, clearSearch);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) {
      return categories;
    }

    const query = search.toLowerCase();

    return categories
      .map((cat) => ({
        ...cat,
        topics: cat.topics.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.id.toLowerCase().includes(query) ||
            cat.name.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.topics.length > 0);
  }, [categories, search]);

  return (
    <aside
      className="bg-bg-surface border-r border-border-subtle flex flex-col overflow-hidden transition-[width] duration-300"
      style={{ width: collapsed ? 60 : 260 }}
    >
      {/* Header */}
      {collapsed ? (
        <header className="px-3 pt-6 pb-5 border-b border-border-subtle flex flex-col items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-magenta rounded-lg flex items-center justify-center text-base font-bold text-black shrink-0">
            F
          </div>
          <SidebarToggle collapsed={collapsed} onToggle={onToggle} />
        </header>
      ) : (
        <header className="px-5 pt-6 pb-5 border-b border-border-subtle flex items-center justify-between">
          <div className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-magenta rounded-lg flex items-center justify-center text-base font-bold text-black shrink-0">
              F
            </div>
            <div>
              FE Lab
              <div className="text-[11px] text-text-muted font-normal mt-1 tracking-[2px] uppercase">
                Interview Prep
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <SidebarToggle collapsed={collapsed} onToggle={onToggle} />
          </div>
        </header>
      )}

      {/* Navigation */}
      {collapsed ? (
        <div className="flex-1 flex flex-col items-center pt-3 gap-2">
          <ThemeToggle />
        </div>
      ) : (
        <>
          <SearchInput
            ref={searchInputRef}
            value={search}
            onChange={setSearch}
          />
          <nav className="flex-1 p-3 overflow-y-auto">
            {filteredCategories.map((cat) => (
              <div key={cat.name} className="mb-5">
                <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-text-muted uppercase tracking-[2px] px-2 mb-1.5">
                  {cat.name}
                </div>
                {cat.topics.map((topic) => (
                  <NavItem key={topic.id} {...topic} />
                ))}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className="text-text-muted text-xs text-center py-8">
                검색 결과가 없습니다
              </div>
            )}
          </nav>
        </>
      )}
    </aside>
  );
}
