"use client";

import { useState, useEffect, useCallback } from "react";
import { PROTOCOL_FLOWS, TLS_HANDSHAKE_STEPS } from "./constants";

export default function HttpProtocolDemo() {
  const [activeTab, setActiveTab] = useState<"compare" | "tls">("compare");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setAnimating(false);
    setProgress([0, 0, 0]);
    setLogs([]);
  };

  const handleAnimate = () => {
    handleReset();
    setAnimating(true);
  };

  useEffect(() => {
    if (!animating) {
      return;
    }

    let step = 0;
    const maxSteps = 50;
    const interval = setInterval(() => {
      step++;
      const pct = (step / maxSteps) * 100;

      setProgress(
        PROTOCOL_FLOWS.map((flow) => {
          const elapsed = (pct / 100) * flow.totalTime;
          let acc = 0;
          let completedSteps = 0;

          for (const s of flow.steps) {
            acc += s.duration;
            if (elapsed >= acc) completedSteps++;
          }

          return Math.min(100, (completedSteps / flow.steps.length) * 100);
        }),
      );

      if (step === 10) addLog("HTTP/3: QUIC 핸드셰이크 완료 (0-RTT)");
      if (step === 15) addLog("HTTP/2: TCP + TLS 핸드셰이크 완료");
      if (step === 20) addLog("HTTP/1.1: TCP + TLS 핸드셰이크 완료");
      if (step === 25) addLog("HTTP/3: 모든 요청 완료 ✓");
      if (step === 30) addLog("HTTP/2: 멀티플렉싱으로 동시 응답 ✓");
      if (step === 45) addLog("HTTP/1.1: 순차 요청 완료 ✓");

      if (step >= maxSteps) {
        clearInterval(interval);
        setAnimating(false);
        setProgress([100, 100, 100]);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [animating, addLog]);

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["compare", "tls"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              handleReset();
            }}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab === "compare" ? "HTTP 버전 비교" : "TLS 핸드셰이크"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {activeTab === "compare" ? (
            <>
              {/* Protocol comparison */}
              <div className="flex flex-col gap-4">
                {PROTOCOL_FLOWS.map((flow, i) => (
                  <div
                    key={flow.version.id}
                    className="rounded-lg border border-border-subtle bg-bg-deep p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-[family-name:var(--font-mono)] text-[13px] font-bold"
                        style={{ color: flow.version.color }}
                      >
                        {flow.version.label}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                        {flow.description}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-8 bg-bg-surface rounded overflow-hidden mb-2">
                      {flow.steps.map((step, j) => {
                        const widthPct = (step.duration / flow.totalTime) * 100;
                        const leftPct = flow.steps
                          .slice(0, j)
                          .reduce(
                            (a, s) => a + (s.duration / flow.totalTime) * 100,
                            0,
                          );
                        const isActive =
                          progress[i] > (j / flow.steps.length) * 100;
                        return (
                          <div
                            key={j}
                            className="absolute top-0 h-full flex items-center justify-center transition-opacity duration-300"
                            style={{
                              left: `${leftPct}%`,
                              width: `${widthPct}%`,
                              backgroundColor: `${step.color}${isActive ? "44" : "15"}`,
                              borderRight:
                                j < flow.steps.length - 1
                                  ? "1px solid var(--bg-deep)"
                                  : undefined,
                            }}
                          >
                            <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted truncate px-1">
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {flow.features.map((f) => (
                        <span
                          key={f}
                          className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-0.5 rounded bg-bg-surface text-text-muted"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Latency comparison */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                  총 소요 시간 비교
                </div>
                <div className="flex gap-4">
                  {PROTOCOL_FLOWS.map((flow) => (
                    <div key={flow.version.id} className="flex-1 text-center">
                      <div
                        className="font-[family-name:var(--font-mono)] text-[18px] font-bold"
                        style={{ color: flow.version.color }}
                      >
                        {flow.totalTime}ms
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                        {flow.version.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* TLS Handshake visualization */
            <div className="flex flex-col gap-3">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-1">
                TLS 1.3 핸드셰이크 과정
              </div>
              <div className="flex gap-8">
                {/* Client column */}
                <div className="flex flex-col items-center gap-0 flex-1">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan font-semibold mb-3 px-3 py-1.5 rounded-lg bg-accent-cyan-dim border border-accent-cyan/30">
                    Client
                  </div>
                  <div className="w-px bg-border-subtle flex-1 min-h-[250px] relative">
                    {TLS_HANDSHAKE_STEPS.map((step, i) => (
                      <div
                        key={i}
                        className="absolute left-4 flex flex-col gap-0.5"
                        style={{ top: `${i * 70 + 10}px` }}
                      >
                        <span
                          className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                          style={{ color: step.color }}
                        >
                          {step.label}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                          {step.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex flex-col gap-0 w-20">
                  <div className="h-[35px]" />
                  {TLS_HANDSHAKE_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="h-[70px] flex items-center justify-center"
                    >
                      <div
                        className="font-[family-name:var(--font-mono)] text-[14px]"
                        style={{ color: step.color }}
                      >
                        {i % 2 === 0 ? "→" : "←"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Server column */}
                <div className="flex flex-col items-center gap-0 flex-1">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green font-semibold mb-3 px-3 py-1.5 rounded-lg bg-accent-green-dim border border-accent-green/30">
                    Server
                  </div>
                  <div className="w-px bg-border-subtle flex-1 min-h-[250px]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              실행
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            {activeTab === "compare" ? (
              <>
                <button
                  onClick={handleAnimate}
                  disabled={animating}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33] disabled:opacity-50"
                >
                  {animating ? "전송 중..." : "요청 3개 동시 전송"}
                </button>
                <button
                  onClick={() => {
                    addLog("HTTP/1.1: Connection: keep-alive");
                    addLog("→ 같은 TCP 커넥션으로 다음 요청 재사용");
                    addLog("→ 3-way handshake 비용 절감");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  Keep-Alive 시뮬레이션
                </button>
                <button
                  onClick={() => {
                    addLog("브라우저 도메인당 동시 연결 수: 6개");
                    addLog("→ HTTP/1.1: 도메인 샤딩으로 우회");
                    addLog("→ HTTP/2: 멀티플렉싱으로 해결");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  커넥션 제한 확인
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("1. Client → Server: ClientHello");
                    addLog("   (지원 암호 스위트, 랜덤 값)");
                    addLog("2. Server → Client: ServerHello");
                    addLog("   (인증서, 선택 암호, 랜덤 값)");
                    addLog("3. 키 교환 (ECDHE)");
                    addLog("   (Pre-Master Secret 생성)");
                    addLog("4. 대칭 키 확정 → 암호화 통신 시작 ✓");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  TLS 1.3 핸드셰이크 실행
                </button>
                <button
                  onClick={() => {
                    addLog("HTTP: 평문 전송 → 도청 가능 ⚠️");
                    addLog("HTTPS: TLS 암호화 → 안전 ✓");
                    addLog("차이점:");
                    addLog("  - 포트: 80 vs 443");
                    addLog("  - 인증서: 불필요 vs 필수");
                    addLog("  - SEO: 불리 vs 유리 (Google 우대)");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  HTTP vs HTTPS 비교
                </button>
              </>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                HTTP 프로토콜 동작을 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
