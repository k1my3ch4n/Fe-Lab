interface ThreadDiagramProps {
  uiBlocked: boolean;
  isRunning: boolean;
  activeTab: "main" | "worker";
}

export function ThreadDiagram({
  uiBlocked,
  isRunning,
  activeTab,
}: ThreadDiagramProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-lg border p-3 transition-all duration-300"
        style={{
          borderColor: uiBlocked ? "#ff2d8a44" : "#00e5ff44",
          background: uiBlocked ? "#ff2d8a08" : "#00e5ff08",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-mono text-caption font-semibold"
            style={{ color: uiBlocked ? "#ff2d8a" : "#00e5ff" }}
          >
            Main Thread
          </span>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded"
            style={{
              background: uiBlocked ? "#ff2d8a22" : "#00e67622",
              color: uiBlocked ? "#ff2d8a" : "#00e676",
            }}
          >
            {uiBlocked ? "BLOCKED" : "IDLE"}
          </span>
        </div>
        <div className="font-mono text-label text-text-secondary">
          UI 렌더링, 이벤트 처리, DOM 조작
        </div>
      </div>

      {activeTab === "worker" && (
        <div
          className="rounded-lg border p-3 transition-all duration-300"
          style={{
            borderColor: isRunning ? "#00e67644" : "#b388ff44",
            background: isRunning ? "#00e67608" : "#b388ff08",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-mono text-caption font-semibold"
              style={{ color: isRunning ? "#00e676" : "#b388ff" }}
            >
              Worker Thread
            </span>
            <span
              className="font-mono text-[9px] px-2 py-0.5 rounded"
              style={{
                background: isRunning ? "#ffb80022" : "#b388ff22",
                color: isRunning ? "#ffb800" : "#b388ff",
              }}
            >
              {isRunning ? "COMPUTING" : "READY"}
            </span>
          </div>
          <div className="font-mono text-label text-text-secondary">
            별도 스레드에서 연산 수행, UI 블로킹 없음
          </div>
        </div>
      )}
    </div>
  );
}
