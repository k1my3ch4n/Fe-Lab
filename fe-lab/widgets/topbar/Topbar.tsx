"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTopic } from "@entities/topic";

interface TopbarProps {
  topicId: string;
}

export default function Topbar({ topicId }: TopbarProps) {
  const pathname = usePathname();
  const topic = getTopic(topicId);

  if (!topic) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mb-8 pb-5 border-b border-border-subtle">
      <div className="font-[family-name:var(--font-mono)] text-xs text-text-muted">
        {topic.category} /{" "}
        <span className="text-accent-cyan">{topic.name}</span>
      </div>
      <div className="flex gap-2">
        <TopbarLink
          href="/topics/event-bubbling"
          label="이벤트 버블링"
          currentPath={pathname}
        />
        <TopbarLink
          href="/topics/rendering-pipeline"
          label="렌더링 파이프라인"
          currentPath={pathname}
        />
      </div>
    </div>
  );
}

function TopbarLink({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`
        font-[family-name:var(--font-mono)] text-[11px] px-3.5 py-1.5 rounded-md
        border transition-all duration-200 no-underline
        ${
          isActive
            ? "bg-accent-cyan-dim border-accent-cyan text-accent-cyan"
            : "border-border-subtle bg-transparent text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
        }
      `}
    >
      {label}
    </Link>
  );
}
