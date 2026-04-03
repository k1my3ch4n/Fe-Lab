import Link from "next/link";
import { getCategories, categoryIcons } from "@entities/topic";

export default function Home() {
  const categories = getCategories();
  const totalTopics = categories.reduce(
    (sum, cat) => sum + cat.topics.length,
    0,
  );

  return (
    <div className="min-h-screen overflow-y-auto bg-bg-deep">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-accent-cyan to-accent-magenta bg-clip-text text-transparent">
            FE Lab
          </span>
        </h1>

        <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl text-text-secondary mb-3">
          프론트엔드 면접 대비 인터랙티브 학습 플랫폼
        </p>

        <p className="text-text-muted text-sm sm:text-base max-w-lg leading-relaxed mb-8">
          {categories.length}개 카테고리, {totalTopics}개 토픽의 인터랙티브
          데모와 면접 질문으로
          <br className="hidden sm:block" />
          프론트엔드 핵심 개념을 깊이 있게 학습하세요.
        </p>

        <Link
          href="/topics/event-bubbling"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan-dim border border-accent-cyan text-accent-cyan font-[family-name:var(--font-mono)] text-sm font-medium transition-all hover:bg-accent-cyan hover:text-bg-deep"
        >
          학습 시작하기
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-text-primary mb-6">
          카테고리
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const firstTopic = category.topics[0];
            return (
              <Link
                key={category.name}
                href={`/topics/${firstTopic.id}`}
                className="group block rounded-xl border border-border-subtle bg-bg-surface p-5 transition-all hover:border-border-active hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-elevated border border-border-subtle text-text-secondary font-[family-name:var(--font-mono)] text-xs font-semibold group-hover:border-border-active">
                    {categoryIcons[category.name] ?? "??"}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-text-primary">
                      {category.name}
                    </h3>
                    <span className="text-text-muted text-xs">
                      {category.topics.length}개 토픽
                    </span>
                  </div>
                </div>

                <ul className="space-y-1">
                  {category.topics.map((topic) => (
                    <li
                      key={topic.id}
                      className="text-text-secondary text-sm truncate"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                        style={{ backgroundColor: topic.color }}
                      />
                      {topic.name}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
