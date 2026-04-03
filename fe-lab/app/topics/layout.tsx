import { Sidebar } from "@widgets/sidebar";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[260px_1fr] h-screen">
      <Sidebar />
      <main
        className="overflow-y-auto relative"
        style={{
          background: `
            radial-gradient(ellipse 600px 400px at 70% 10%, #00e5ff06 0%, transparent 100%),
            radial-gradient(ellipse 400px 300px at 30% 80%, #ff2d8a04 0%, transparent 100%),
            var(--bg-deep)
          `,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-10 py-8 pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
