"use client";

import { useState, useRef, useCallback } from "react";
import { ToggleSwitch } from "@shared/ui";
import {
  ELEMENTS,
  ANIM_DELAY,
  BOX_CONFIGS,
  LOG_TYPE_STYLES,
} from "./constants";
import type { LogEntry, LogType } from "./constants";

export default function EventBubblingDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showCapture, setShowCapture] = useState(false);
  const [stopProp, setStopProp] = useState(false);
  const [stopAtTarget, setStopAtTarget] = useState(false);
  const [flashingBoxes, setFlashingBoxes] = useState<Set<string>>(new Set());
  const logRef = useRef<HTMLDivElement>(null);

  const flashBox = useCallback((id: string, delay: number) => {
    setTimeout(() => {
      setFlashingBoxes((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setFlashingBoxes((prev) => {
          const next = new Set(prev);
          next.delete(id);

          return next;
        });
      }, 600);
    }, delay);
  }, []);

  const addLogs = useCallback(
    (newLogs: { text: string; type: LogType; delay: number }[]) => {
      newLogs.forEach(({ text, type, delay }) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, { text, type }]);

          if (logRef.current) {
            setTimeout(() => {
              logRef.current!.scrollTop = logRef.current!.scrollHeight;
            }, 10);
          }
        }, delay);
      });
    },
    [],
  );

  const handleClick = useCallback(
    (clickedIndex: number) => {
      const logsToAdd: { text: string; type: LogType; delay: number }[] = [];
      let delay = 0;

      logsToAdd.push({ text: "─── Click Event ───", type: "info", delay: 0 });

      if (showCapture) {
        for (let i = 0; i <= clickedIndex; i++) {
          const el = ELEMENTS[i];
          if (i === clickedIndex) {
            logsToAdd.push({
              text: `▪ ${el.name} (타겟)`,
              type: "target",
              delay,
            });
            flashBox(el.id, delay);
            delay += ANIM_DELAY;
            if (stopAtTarget) {
              logsToAdd.push({
                text: "✕ stopPropagation() — 전파 중단",
                type: "stopped",
                delay,
              });
              addLogs(logsToAdd);
              return;
            }
          } else {
            logsToAdd.push({
              text: `▾ ${el.name} (캡쳐링 ↓)`,
              type: "capture",
              delay,
            });
            flashBox(el.id, delay);
            delay += ANIM_DELAY;
          }
        }
      } else {
        logsToAdd.push({
          text: `▪ ${ELEMENTS[clickedIndex].name} (타겟)`,
          type: "target",
          delay: 0,
        });
        flashBox(ELEMENTS[clickedIndex].id, 0);
        delay = ANIM_DELAY;
        if (stopAtTarget) {
          logsToAdd.push({
            text: "✕ stopPropagation() — 전파 중단",
            type: "stopped",
            delay,
          });
          addLogs(logsToAdd);
          return;
        }
      }

      for (let i = clickedIndex - 1; i >= 0; i--) {
        const el = ELEMENTS[i];
        if (stopProp && i === clickedIndex - 1) {
          logsToAdd.push({
            text: "✕ stopPropagation() — 버블링 중단",
            type: "stopped",
            delay,
          });
          flashBox(el.id, delay);
          addLogs(logsToAdd);
          return;
        }
        logsToAdd.push({
          text: `▴ ${el.name} (버블링 ↑)`,
          type: "bubble",
          delay,
        });
        flashBox(el.id, delay);
        delay += ANIM_DELAY;
      }

      addLogs(logsToAdd);
    },
    [showCapture, stopProp, stopAtTarget, flashBox, addLogs],
  );

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle bg-bg-elevated flex-wrap">
        <ToggleSwitch
          label="캡쳐링 표시"
          checked={showCapture}
          onChange={setShowCapture}
        />
        <div className="w-px h-5 bg-border-subtle" />
        <ToggleSwitch
          label="stopPropagation()"
          checked={stopProp}
          onChange={setStopProp}
        />
        <div className="w-px h-5 bg-border-subtle" />
        <ToggleSwitch
          label="타겟에서 중단"
          checked={stopAtTarget}
          onChange={setStopAtTarget}
        />
      </div>

      {/* Demo body */}
      <div className="grid grid-cols-[1fr_320px] min-h-[380px]">
        <NestedBoxes flashingBoxes={flashingBoxes} onBoxClick={handleClick} />
        <EventLogPanel
          logs={logs}
          logRef={logRef}
          onClear={() => setLogs([])}
        />
      </div>
    </>
  );
}

function NestedBoxes({
  flashingBoxes,
  onBoxClick,
}: {
  flashingBoxes: Set<string>;
  onBoxClick: (index: number) => void;
}) {
  const renderBox = (
    depth: number,
    children: React.ReactNode,
  ): React.ReactNode => {
    if (depth >= BOX_CONFIGS.length) return children;

    const config = BOX_CONFIGS[depth];
    const isFlashing = flashingBoxes.has(config.id);

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onBoxClick(depth);
        }}
        className={`flex items-center justify-center rounded-xl relative cursor-pointer transition-all duration-300 border-2 ${config.size} ${
          isFlashing
            ? `${config.flashBorder} ${config.flashShadow} ${config.flashBg}`
            : `${config.defaultBorder} ${config.defaultBg}`
        }`}
      >
        <BoxLabel text={config.label} color={config.color} />
        {renderBox(depth + 1, children)}
      </div>
    );
  };

  const isButtonFlashing = flashingBoxes.has("box-button");

  return (
    <div className="flex items-center justify-center p-10">
      {renderBox(
        0,
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBoxClick(3);
          }}
          className={`flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 w-[140px] h-[52px] border-2 font-[family-name:var(--font-display)] text-[13px] font-semibold text-accent-amber tracking-wide ${
            isButtonFlashing
              ? "border-accent-amber shadow-[0_0_30px_#ffb80033] bg-gradient-to-br from-[#ffb80033] to-[#ff2d8a33]"
              : "border-[#ffb80055] bg-gradient-to-br from-[#ffb80022] to-[#ff2d8a22]"
          }`}
        >
          Click me
        </button>,
      )}
    </div>
  );
}

function BoxLabel({ text, color }: { text: string; color: string }) {
  return (
    <span
      className={`absolute top-2 left-3 font-[family-name:var(--font-mono)] text-[10px] opacity-60 ${color}`}
    >
      {text}
    </span>
  );
}

function EventLogPanel({
  logs,
  logRef,
  onClear,
}: {
  logs: LogEntry[];
  logRef: React.RefObject<HTMLDivElement | null>;
  onClear: () => void;
}) {
  return (
    <div className="border-l border-border-subtle flex flex-col">
      <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
          Event Log
        </span>
        <button
          onClick={onClear}
          className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
        >
          Clear
        </button>
      </div>
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto p-2 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed"
      >
        {logs.length === 0 ? (
          <div className="text-text-muted text-center px-4 py-10 text-xs leading-[1.8]">
            요소를 클릭하면
            <br />
            이벤트 전파 로그가 표시됩니다
          </div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease] ${LOG_TYPE_STYLES[log.type]}`}
            >
              {log.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
