import type { StorageEntry } from "../../model/types";
import { SectionHeader } from "@shared/ui";

interface EntryListProps {
  entries: StorageEntry[];
  onRemove: (key: string) => void;
}

export function EntryList({ entries, onRemove }: EntryListProps) {
  return (
    <div>
      <SectionHeader>저장된 데이터 ({entries.length}개)</SectionHeader>
      <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto">
        {entries.length === 0 ? (
          <div className="font-mono text-label text-text-muted text-center py-4">
            비어 있음
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.key}
              className="flex items-center justify-between bg-bg-deep rounded-lg px-3 py-2 border border-border-subtle"
            >
              <div className="font-mono text-label">
                <span className="text-accent-cyan">{entry.key}</span>
                <span className="text-text-muted"> : </span>
                <span className="text-accent-amber">{entry.value}</span>
              </div>
              <button
                onClick={() => onRemove(entry.key)}
                className="font-mono text-caption text-text-muted cursor-pointer bg-transparent border-none hover:text-accent-magenta transition-colors"
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
