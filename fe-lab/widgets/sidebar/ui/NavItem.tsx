"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Difficulty, difficultyConfig } from "@entities/topic";

interface NavItemProps {
  id: string;
  name: string;
  color: string;
  difficulty: Difficulty;
  implemented: boolean;
}

export default function NavItem({
  id,
  name,
  color,
  difficulty,
  implemented,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/topics/${id}`;
  const badge = difficultyConfig[difficulty];

  return (
    <Link
      href={`/topics/${id}`}
      className={`
        group relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer
        transition-all duration-200 text-[13px] font-normal no-underline
        ${
          isActive
            ? "bg-accent-cyan-dim text-accent-cyan font-medium"
            : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
        }
        ${!implemented ? "opacity-60" : ""}
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-accent-cyan rounded-r-sm" />
      )}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: color }}
      />
      {name}
      <span
        className={`
          font-[var(--font-mono)] text-[9px] font-semibold px-1.5 py-0.5
          rounded ml-auto tracking-wider ${badge.className}
        `}
      >
        {badge.label}
      </span>
    </Link>
  );
}
