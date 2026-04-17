"use client";

import { useState, useEffect } from "react";
import { PROTOCOL_FLOWS } from "../model/constants";
import {
  TabBar,
  DemoLayout,
  RightPanel,
  ActionButton,
  LogPanel,
  SectionHeader,
} from "@shared/ui";
import { useLog } from "@shared/hooks";
import { ProtocolFlowCard, TlsHandshakeVisualization } from "./components";

export default function HttpProtocolDemo() {
  const [activeTab, setActiveTab] = useState<"compare" | "tls">("compare");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  const { logs, addLog, clearLogs } = useLog();

  const handleReset = () => {
    setAnimating(false);
    setProgress([0, 0, 0]);
    clearLogs();
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

  const tabs = [
    { id: "compare", label: "HTTP 버전 비교" },
    { id: "tls", label: "TLS 핸드셰이크" },
  ];
  const activeIndex = activeTab === "compare" ? 0 : 1;

  return (
    <>
      <TabBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabChange={(i) => {
          setActiveTab(i === 0 ? "compare" : "tls");
          handleReset();
        }}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              activeTab === "compare" ? (
                <>
                  <ActionButton
                    variant="cyan"
                    onClick={handleAnimate}
                    disabled={animating}
                  >
                    {animating ? "전송 중..." : "요청 3개 동시 전송"}
                  </ActionButton>
                  <ActionButton
                    variant="amber"
                    onClick={() => {
                      addLog("HTTP/1.1: Connection: keep-alive");
                      addLog("→ 같은 TCP 커넥션으로 다음 요청 재사용");
                      addLog("→ 3-way handshake 비용 절감");
                    }}
                  >
                    Keep-Alive 시뮬레이션
                  </ActionButton>
                  <ActionButton
                    variant="green"
                    onClick={() => {
                      addLog("브라우저 도메인당 동시 연결 수: 6개");
                      addLog("→ HTTP/1.1: 도메인 샤딩으로 우회");
                      addLog("→ HTTP/2: 멀티플렉싱으로 해결");
                    }}
                  >
                    커넥션 제한 확인
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton
                    variant="cyan"
                    onClick={() => {
                      clearLogs();
                      addLog("1. Client → Server: ClientHello");
                      addLog("   (지원 암호 스위트, 랜덤 값)");
                      addLog("2. Server → Client: ServerHello");
                      addLog("   (인증서, 선택 암호, 랜덤 값)");
                      addLog("3. 키 교환 (ECDHE)");
                      addLog("   (Pre-Master Secret 생성)");
                      addLog("4. 대칭 키 확정 → 암호화 통신 시작 ✓");
                    }}
                  >
                    TLS 1.3 핸드셰이크 실행
                  </ActionButton>
                  <ActionButton
                    variant="magenta"
                    onClick={() => {
                      addLog("HTTP: 평문 전송 → 도청 가능 ⚠️");
                      addLog("HTTPS: TLS 암호화 → 안전 ✓");
                      addLog("차이점:");
                      addLog("  - 포트: 80 vs 443");
                      addLog("  - 인증서: 불필요 vs 필수");
                      addLog("  - SEO: 불리 vs 유리 (Google 우대)");
                    }}
                  >
                    HTTP vs HTTPS 비교
                  </ActionButton>
                </>
              )
            }
          >
            <LogPanel
              logs={logs}
              emptyMessage={"버튼을 클릭하여\nHTTP 프로토콜 동작을 확인하세요"}
            />
          </RightPanel>
        }
      >
        {activeTab === "compare" ? (
          <>
            <div className="flex flex-col gap-4">
              {PROTOCOL_FLOWS.map((flow, i) => (
                <ProtocolFlowCard
                  key={flow.version.id}
                  flow={flow}
                  progress={progress[i]}
                />
              ))}
            </div>

            <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
              <SectionHeader>총 소요 시간 비교</SectionHeader>
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
          <div className="flex flex-col gap-3">
            <SectionHeader>TLS 1.3 핸드셰이크 과정</SectionHeader>
            <TlsHandshakeVisualization />
          </div>
        )}
      </DemoLayout>
    </>
  );
}
