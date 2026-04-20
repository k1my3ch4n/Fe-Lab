"use client";

import { useSidebarBehavior } from "../model/useSidebarBehavior";
import { useSidebarSearch } from "../model/useSidebarSearch";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const { isCollapsed, handleToggle } = useSidebarBehavior();
  const { search, setSearch, searchInputRef, filteredCategories } =
    useSidebarSearch();

  return (
    <aside
      className={`bg-bg-surface border-r border-border-subtle flex flex-col overflow-hidden transition-[width] duration-300 ${isCollapsed ? "w-[60px]" : "w-[260px]"}`}
    >
      <SidebarHeader isCollapsed={isCollapsed} onToggle={handleToggle} />
      <SidebarNav
        isCollapsed={isCollapsed}
        search={search}
        onSearchChange={setSearch}
        searchInputRef={searchInputRef}
        filteredCategories={filteredCategories}
      />
    </aside>
  );
}
