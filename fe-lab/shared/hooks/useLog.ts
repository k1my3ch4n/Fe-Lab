"use client";

import { useState, useCallback } from "react";

interface LogEntry {
  text: string;
  color?: string;
}

type Log = string | LogEntry;

export default function useLog() {
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = useCallback((text: string, color?: string) => {
    setLogs((prev) => [...prev, color ? { text, color } : text]);
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);

  return { logs, addLog, clearLogs };
}
