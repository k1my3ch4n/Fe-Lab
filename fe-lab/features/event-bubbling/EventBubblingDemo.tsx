"use client";

import { useState, useRef, useCallback } from "react";
import { ToggleSwitch } from "@shared/ui";
import { ELEMENTS, ANIM_DELAY } from "./constants";
import type { LogEntry, LogType } from "./types";
import NestedBoxes from "./components/NestedBoxes";
import EventLogPanel from "./components/EventLogPanel";

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
