import { notFound } from "next/navigation";
import { Topbar } from "@widgets/topbar";
import { TopicPageLayout } from "@shared/ui";
import { getTopic } from "@entities/topic";
import { featureConfigs } from "@shared/config/featureConfigs";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  const config = featureConfigs[slug];

  if (!config) {
    return (
      <>
        <Topbar topicId={slug} />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="text-5xl mb-6">🚧</div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary mb-3">
            Coming Soon
          </h1>
          <p className="text-text-secondary text-sm max-w-md leading-relaxed">
            <span className="text-accent-cyan font-medium">{topic.name}</span>{" "}
            토픽은 현재 준비 중입니다.
            <br />곧 인터랙티브 데모와 면접 질문이 추가될 예정입니다.
          </p>
        </div>
      </>
    );
  }

  const { codeExamples, interviewQuestions } = await config.getData();

  return (
    <TopicPageLayout
      topicId={slug}
      concept={config.concept}
      demo={{ ...config.demo, children: <config.Demo /> }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
