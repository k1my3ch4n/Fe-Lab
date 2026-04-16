import { type RefObject } from "react";
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
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-5">
            <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-text-muted uppercase tracking-[2px] px-2 mb-1.5">
              {category.name}
            </div>
            {category.topics.map((topic) => (
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
  );
}
