import { useRef, useEffect } from "react";
import type { SimMessage, ProtocolInfo } from "../../model/types";
import { MessageArrow } from "./MessageArrow";
import { SectionHeader, InfoCard } from "@shared/ui";

export function SimulationView({
  protocol,
  activeTab,
  messages,
  isRunning,
}: {
  protocol: ProtocolInfo;
  activeTab: "websocket" | "sse";
  messages: SimMessage[];
  isRunning: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Protocol Info */}
      <div>
        <SectionHeader>Connection Flow</SectionHeader>
        <div className="flex flex-col gap-1.5">
          {protocol.connectionFlow.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[12px] font-mono"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-caption font-bold shrink-0"
                style={{
                  background: `${protocol.color}22`,
                  color: protocol.color,
                  border: `1px solid ${protocol.color}44`,
                }}
              >
                {i + 1}
              </span>
              <span className="text-text-secondary">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual: Client <-> Server */}
      <div>
        <SectionHeader>Message Flow Simulation</SectionHeader>
        <div className="relative bg-bg-deep rounded-lg p-4 min-h-[200px]">
          {/* Client / Server Labels */}
          <div className="flex justify-between mb-4">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-label font-bold font-mono"
                style={{
                  borderColor: "#00e5ff66",
                  background: "#00e5ff11",
                  color: "#00e5ff",
                }}
              >
                Client
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="font-mono text-caption font-semibold"
                  style={{ color: protocol.color }}
                >
                  {activeTab === "websocket" ? "ws://" : "HTTP (SSE)"}
                </span>
                <div
                  className="w-full h-px"
                  style={{ background: `${protocol.color}44` }}
                />
                <span className="font-mono text-[9px] text-text-muted">
                  {activeTab === "websocket" ? "양방향" : "단방향 →"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-label font-bold font-mono"
                style={{
                  borderColor: "#00e67666",
                  background: "#00e67611",
                  color: "#00e676",
                }}
              >
                Server
              </div>
            </div>
          </div>

          {/* Message Lines */}
          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto">
            {messages.map((msg) => (
              <MessageArrow key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 0 && !isRunning && (
            <div className="text-text-muted text-center text-label font-mono py-6">
              시뮬레이션을 시작하세요
            </div>
          )}
        </div>
      </div>

      {/* Protocol Details */}
      <div className="grid grid-cols-2 gap-3">
        <InfoCard
          label="통신 방향"
          value={protocol.direction}
          color={protocol.color}
        />
        <InfoCard
          label="프로토콜"
          value={protocol.protocol}
          color={protocol.color}
        />
      </div>
    </>
  );
}
