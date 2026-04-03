export type StorageTabId = "local" | "session" | "indexed";

export interface StorageEntry {
  key: string;
  value: string;
  timestamp: number;
}
