"use client";

import { getCategories } from "@entities/topic";
import NavItem from "./NavItem";

export default function Sidebar() {
  const categories = getCategories();

  return (
    <aside className="bg-bg-surface border-r border-border-subtle flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="px-5 pt-6 pb-5 border-b border-border-subtle">
        <div className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-magenta rounded-lg flex items-center justify-center text-base font-bold text-black">
            F
          </div>
          <div>
            FE Lab
            <div className="text-[11px] text-text-muted font-normal mt-1 tracking-[2px] uppercase">
              Interview Prep
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.name} className="mb-5">
            <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-text-muted uppercase tracking-[2px] px-2 mb-1.5">
              {cat.name}
            </div>
            {cat.topics.map((topic) => (
              <NavItem key={topic.id} {...topic} />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
