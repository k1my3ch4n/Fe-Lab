"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Difficulty } from "@entities/topic";

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
  implemented,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/topics/${id}`;

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
    </Link>
  );
}
