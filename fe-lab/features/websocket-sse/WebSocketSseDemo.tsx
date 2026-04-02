"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  PROTOCOLS,
  COMPARISON_TABLE,
  WS_SCENARIO,
  SSE_SCENARIO,
  type SimMessage,
  type ProtocolType,
} from "./constants";

type TabType = "websocket" | "sse" | "comparison";

const TABS: { id: TabType; label: string }[] = [
  { id: "websocket", label: "WebSocket" },
  { id: "sse", label: "SSE" },
  { id: "comparison", label: "비교표" },
];

export default function WebSocketSseDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("websocket");
  const [messages, setMessages] = useState<SimMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenario = activeTab === "websocket" ? WS_SCENARIO : SSE_SCENARIO;

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stopSimulation();
    setMessages([]);
    setCurrentStep(-1);
  }, [stopSimulation]);

  const startSimulation = useCallback(() => {
    reset();
    setIsRunning(true);
    setCurrentStep(0);
  }, [reset]);

  useEffect(() => {
    if (!isRunning || currentStep < 0) {
      return;
    }

    if (currentStep >= scenario.length) {
      setIsRunning(false);
      return;
    }

    const delay = currentStep === 0 ? 400 : 800 + Math.random() * 600;

    intervalRef.current = setTimeout(() => {
      const msg = scenario[currentStep];
      setMessages((prev) => [
        ...prev,
        { ...msg, id: currentStep, timestamp: Date.now() },
      ]);
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isRunning, currentStep, scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    reset();
  }, [activeTab, reset]);

  const protocol = PROTOCOLS.find((p) => p.id === activeTab) ?? PROTOCOLS[0];

  return (
    <>
      {/* Tab Bar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "comparison" ? (
        <ComparisonTable />
      ) : (
        <div className="grid grid-cols-[1fr_300px] min-h-[420px]">
          {/* Left: Visual Flow */}
          <div className="p-6 flex flex-col gap-5">
            {/* Protocol Info */}
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Connection Flow
              </div>
              <div className="flex flex-col gap-1.5">
                {protocol.connectionFlow.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-mono)]"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
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
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Message Flow Simulation
              </div>
              <div className="relative bg-bg-deep rounded-lg p-4 min-h-[200px]">
                {/* Client / Server Labels */}
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold font-[family-name:var(--font-mono)]"
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
                        className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                        style={{ color: protocol.color }}
                      >
                        {activeTab === "websocket" ? "ws://" : "HTTP (SSE)"}
                      </span>
                      <div
                        className="w-full h-px"
                        style={{ background: `${protocol.color}44` }}
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                        {activeTab === "websocket" ? "양방향" : "단방향 →"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold font-[family-name:var(--font-mono)]"
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
                    <MessageArrow
                      key={msg.id}
                      message={msg}
                      protocolColor={protocol.color}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 0 && !isRunning && (
                  <div className="text-text-muted text-center text-[11px] font-[family-name:var(--font-mono)] py-6">
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
          </div>

          {/* Right: Controls + Info */}
          <div className="border-l border-border-subtle flex flex-col">
            <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                시뮬레이션
              </span>
              <button
                onClick={reset}
                className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
              >
                Reset
              </button>
            </div>

            {/* Controls */}
            <div className="p-4 border-b border-border-subtle">
              <button
                onClick={isRunning ? stopSimulation : startSimulation}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200"
                style={{
                  borderColor: protocol.color,
                  color: protocol.color,
                  background: `${protocol.color}11`,
                }}
              >
                {isRunning ? "중지" : "시뮬레이션 시작"}
              </button>
            </div>

            {/* Use Cases */}
            <div className="p-4 border-b border-border-subtle">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-2">
                Use Cases
              </div>
              <div className="flex flex-col gap-1.5">
                {protocol.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary flex items-center gap-1.5"
                  >
                    <span style={{ color: protocol.color }}>*</span>
                    {uc}
                  </div>
                ))}
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-3">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green uppercase tracking-wider mb-1.5">
                  Pros
                </div>
                {protocol.pros.map((p, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary mb-1"
                  >
                    + {p}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta uppercase tracking-wider mb-1.5">
                  Cons
                </div>
                {protocol.cons.map((c, i) => (
                  <div
                    key={i}
                    className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary mb-1"
                  >
                    - {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MessageArrow({
  message,
  protocolColor,
}: {
  message: SimMessage;
  protocolColor: string;
}) {
  const isClient = message.from === "client";
  const color = isClient ? "#00e5ff" : "#00e676";

  return (
    <div
      className="flex items-center gap-2 animate-[logSlide_0.3s_ease]"
      style={{ flexDirection: isClient ? "row" : "row-reverse" }}
    >
      <div
        className="shrink-0 w-2 h-2 rounded-full"
        style={{ background: color }}
      />
      <div
        className="flex-1 font-[family-name:var(--font-mono)] text-[10px] px-2 py-1 rounded"
        style={{
          background: `${color}11`,
          borderLeft: isClient ? `2px solid ${color}66` : "none",
          borderRight: !isClient ? `2px solid ${color}66` : "none",
          color: `${color}`,
          textAlign: isClient ? "left" : "right",
        }}
      >
        <span className="text-text-muted">{isClient ? "C →" : "← S"}</span>{" "}
        {message.text}
      </div>
      <div
        className="shrink-0 w-2 h-2 rounded-full"
        style={{ background: color, opacity: 0.3 }}
      />
    </div>
  );
}

function InfoCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: `${color}22`, background: `${color}08` }}
    >
      <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase tracking-wider mb-1">
        {label}
      </div>
      <div
        className="font-[family-name:var(--font-mono)] text-[11px]"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full font-[family-name:var(--font-mono)] text-[11px] border-collapse">
        <thead>
          <tr>
            <th className="text-left text-text-muted text-[10px] uppercase tracking-wider py-2 px-3 border-b border-border-subtle">
              항목
            </th>
            {PROTOCOLS.map((p) => (
              <th
                key={p.id}
                className="text-left text-[10px] uppercase tracking-wider py-2 px-3 border-b border-border-subtle"
                style={{ color: p.color }}
              >
                {p.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_TABLE.map((row, i) => (
            <tr key={i} className="hover:bg-bg-elevated transition-colors">
              <td className="py-2.5 px-3 text-text-muted border-b border-border-subtle font-semibold">
                {row.label}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.websocket}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.sse}
              </td>
              <td className="py-2.5 px-3 text-text-secondary border-b border-border-subtle">
                {row.longPolling}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Protocol Cards */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {PROTOCOLS.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border p-4"
            style={{ borderColor: `${p.color}33`, background: `${p.color}08` }}
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[12px] font-bold mb-1"
              style={{ color: p.color }}
            >
              {p.fullName}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-3">
              {p.direction}
            </div>
            <div className="flex flex-col gap-1">
              {p.useCases.slice(0, 3).map((uc, i) => (
                <div
                  key={i}
                  className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary"
                >
                  * {uc}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
