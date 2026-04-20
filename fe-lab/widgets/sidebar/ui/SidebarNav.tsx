"use client";

import { type RefObject, useState } from "react";
import { type Category } from "@entities/topic";
import { ThemeToggle } from "@shared/ui";
import NavItem from "./NavItem";
import SearchInput from "./SearchInput";

interface SidebarNavProps {
  isCollapsed: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  filteredCategories: Category[];
}

export default function SidebarNav({
  isCollapsed,
  search,
  onSearchChange,
  searchInputRef,
  filteredCategories,
}: SidebarNavProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const effectiveCollapsed = search ? new Set<string>() : collapsedCategories;

  const toggleCategory = (name: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  if (isCollapsed) {
    return (
      <div className="flex-1 flex flex-col items-center pt-3 gap-2">
        <ThemeToggle />
      </div>
    );
  }

  return (
    <>
      <SearchInput
        ref={searchInputRef}
        value={search}
        onChange={onSearchChange}
      />
      <nav className="flex-1 p-3 overflow-y-auto">
        {filteredCategories.map((category) => {
          const isCollapsedCategory = effectiveCollapsed.has(category.name);
          return (
            <div key={category.name} className="mb-3">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between px-2 mb-1.5 group"
              >
                <span className="font-mono text-caption font-semibold text-text-muted uppercase tracking-[2px]">
                  {category.name}
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className={`text-text-muted transition-transform duration-200 ${isCollapsedCategory ? "-rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                className="grid transition-all duration-200"
                style={{ gridTemplateRows: isCollapsedCategory ? "0fr" : "1fr" }}
              >
                <div className="overflow-hidden">
                  {category.topics.map((topic) => (
                    <NavItem key={topic.id} {...topic} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {filteredCategories.length === 0 && (
          <div className="text-text-muted text-xs text-center py-8">
            검색 결과가 없습니다
          </div>
        )}
      </nav>
    </>
  );
}
