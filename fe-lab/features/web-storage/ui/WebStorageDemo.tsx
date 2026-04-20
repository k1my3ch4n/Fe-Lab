"use client";

import { useState, useCallback } from "react";
import { STORAGE_TABS } from "../model/constants";
import type { StorageTabId, StorageEntry } from "../model/types";
import { TabBar, DemoLayout, RightPanel, LogPanel } from "@shared/ui";
import { StorageTable } from "./components/StorageTable";
import { EntryList } from "./components/EntryList";

export default function WebStorageDemo() {
  const [activeTab, setActiveTab] = useState<StorageTabId>("local");
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string | null>(null);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-30), text]);
  }, []);

  const storageLabel =
    activeTab === "local"
      ? "localStorage"
      : activeTab === "session"
        ? "sessionStorage"
        : "IndexedDB";

  const handleSet = () => {
    if (!keyInput.trim()) {
      return;
    }

    const now = Date.now();

    setEntries((prev) => {
      const exists = prev.findIndex((e) => e.key === keyInput);

      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = { key: keyInput, value: valueInput, timestamp: now };

        return updated;
      }

      return [...prev, { key: keyInput, value: valueInput, timestamp: now }];
    });

    addLog(`✅ ${storageLabel}.setItem("${keyInput}", "${valueInput}")`);
    setKeyInput("");
    setValueInput("");
  };

  const handleGet = () => {
    if (!keyInput.trim()) {
      return;
    }

    const found = entries.find((e) => e.key === keyInput);

    if (found) {
      setQueryResult(found.value);
      addLog(`🔍 ${storageLabel}.getItem("${keyInput}") → "${found.value}"`);
    } else {
      setQueryResult("null");
      addLog(`🔍 ${storageLabel}.getItem("${keyInput}") → null`);
    }
  };

  const handleRemove = (key: string) => {
    setEntries((prev) => prev.filter((e) => e.key !== key));
    addLog(`🗑️ ${storageLabel}.removeItem("${key}")`);
    setQueryResult(null);
  };

  const handleClear = () => {
    setEntries([]);
    addLog(`🧹 ${storageLabel}.clear()`);
    setQueryResult(null);
  };

  const handleTabChange = (id: StorageTabId) => {
    setActiveTab(id);
    setEntries([]);
    setLogs([]);
    setKeyInput("");
    setValueInput("");
    setQueryResult(null);
  };

  const handleReset = () => {
    setEntries([]);
    setLogs([]);
    setKeyInput("");
    setValueInput("");
    setQueryResult(null);
  };

  const tabsForBar = STORAGE_TABS.map((t) => ({ id: t.id, label: t.label }));
  const activeIndex = STORAGE_TABS.findIndex((t) => t.id === activeTab);

  return (
    <>
      <TabBar
        tabs={tabsForBar}
        activeIndex={activeIndex}
        onTabChange={(i) => handleTabChange(STORAGE_TABS[i].id)}
      />

      <DemoLayout
        rightPanel={
          <RightPanel label="로그" onReset={handleReset}>
            <LogPanel
              logs={logs}
              emptyMessage={"key/value를 입력하고\n버튼을 클릭하세요"}
            />
          </RightPanel>
        }
      >
        {/* Input area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="key"
            className="flex-1 font-mono text-[12px] px-3 py-2 rounded-lg border border-border-subtle bg-bg-deep text-text-primary placeholder:text-text-muted outline-none focus:border-accent-cyan transition-colors"
          />
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="value"
            className="flex-1 font-mono text-[12px] px-3 py-2 rounded-lg border border-border-subtle bg-bg-deep text-text-primary placeholder:text-text-muted outline-none focus:border-accent-cyan transition-colors"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSet}
            className="font-mono text-[11px] px-4 py-2 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
          >
            setItem
          </button>
          <button
            onClick={handleGet}
            className="font-mono text-[11px] px-4 py-2 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
          >
            getItem
          </button>
          <button
            onClick={handleClear}
            className="font-mono text-[11px] px-4 py-2 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
          >
            clear
          </button>
        </div>

        {/* Query result */}
        {queryResult !== null && (
          <div className="font-mono text-[12px] bg-bg-deep rounded-lg p-3 border border-border-subtle">
            <span className="text-text-muted">결과: </span>
            <span className="text-accent-amber">{queryResult}</span>
          </div>
        )}

        <EntryList entries={entries} onRemove={handleRemove} />
        <StorageTable />
      </DemoLayout>
    </>
  );
}
