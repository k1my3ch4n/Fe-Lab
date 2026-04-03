"use client";

import { usePathname } from "next/navigation";
import { getTopic } from "@entities/topic";
import TopbarLink from "./TopbarLink";

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
    <header className="flex items-center justify-between mb-10 pb-6 border-b border-border-subtle">
      <nav
        aria-label="breadcrumb"
        className="font-[family-name:var(--font-mono)] text-xs text-text-muted"
      >
        {topic.category} /{" "}
        <span className="text-accent-cyan">{topic.name}</span>
      </nav>
      <nav aria-label="토픽 바로가기" className="hidden md:flex gap-2">
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
      </nav>
    </header>
  );
}
