import { useState } from 'react';
import { Badge } from '@/shared/ui';
import type { ActionItem, ActionItemStatus } from '../model/types';

interface ActionItemCardProps {
  item: ActionItem;
  onStatusChange: (id: string, status: ActionItemStatus) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Pick<ActionItem, 'content' | 'assignee' | 'dueDate'>>) => void;
}

const STATUS_BADGE_VARIANT: Record<ActionItemStatus, 'default' | 'success' | 'error'> = {
  pending: 'default',
  done: 'success',
  dismissed: 'error',
};

const STATUS_LABEL: Record<ActionItemStatus, string> = {
  pending: '대기',
  done: '완료',
  dismissed: '취소',
};

export function ActionItemCard({ item, onStatusChange, onRemove, onUpdate }: ActionItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    content: item.content,
    assignee: item.assignee ?? '',
    dueDate: item.dueDate ?? '',
  });

  const handleEditStart = () => {
    setDraft({
      content: item.content,
      assignee: item.assignee ?? '',
      dueDate: item.dueDate ?? '',
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!draft.content.trim()) { return; }
    onUpdate(item.id, {
      content: draft.content.trim(),
      assignee: draft.assignee.trim() || null,
      dueDate: draft.dueDate.trim() || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleToggleDone = () => {
    onStatusChange(item.id, item.status === 'done' ? 'pending' : 'done');
  };

  const handleDismiss = () => {
    onStatusChange(item.id, 'dismissed');
  };

  if (isEditing) {
    return (
      <article className="rounded-lg border border-blue-300 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full resize-none rounded border border-gray-200 p-2 text-sm text-gray-800 focus:border-blue-400 focus:outline-none"
            rows={3}
            value={draft.content}
            onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
            placeholder="내용을 입력하세요"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:border-blue-400 focus:outline-none"
              value={draft.assignee}
              onChange={(event) => setDraft((prev) => ({ ...prev, assignee: event.target.value }))}
              placeholder="담당자 (선택)"
            />
            <input
              type="date"
              className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:border-blue-400 focus:outline-none"
              value={draft.dueDate}
              onChange={(event) => setDraft((prev) => ({ ...prev, dueDate: event.target.value }))}
            />
          </div>
          <nav className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded px-3 py-1 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40"
              onClick={handleSave}
              disabled={!draft.content.trim()}
            >
              저장
            </button>
          </nav>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <header className="mb-2 flex items-start justify-between gap-2">
        <Badge variant={STATUS_BADGE_VARIANT[item.status]}>
          {STATUS_LABEL[item.status]}
        </Badge>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="수정"
            className="text-gray-400 hover:text-blue-500 transition-colors text-xs px-1"
            onClick={handleEditStart}
          >
            ✏️
          </button>
          <button
            type="button"
            aria-label="삭제"
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => onRemove(item.id)}
          >
            ✕
          </button>
        </div>
      </header>

      <p className={`text-sm text-gray-800 ${item.status === 'done' ? 'line-through text-gray-400' : ''}`}>
        {item.content}
      </p>

      <footer className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        {item.assignee && (
          <span className="flex items-center gap-1">
            <span>👤</span>
            <span>{item.assignee}</span>
          </span>
        )}
        {item.dueDate && (
          <span className="flex items-center gap-1">
            <span>📅</span>
            <span>{item.dueDate}</span>
          </span>
        )}
        <time className="ml-auto" dateTime={new Date(item.createdAt).toISOString()}>
          {new Date(item.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </time>
      </footer>

      <nav className="mt-3 flex gap-2" aria-label="액션 아이템 컨트롤">
        <button
          type="button"
          className="rounded px-2 py-1 text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
          onClick={handleToggleDone}
        >
          {item.status === 'done' ? '되돌리기' : '완료'}
        </button>
        {item.status !== 'dismissed' && (
          <button
            type="button"
            className="rounded px-2 py-1 text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={handleDismiss}
          >
            취소
          </button>
        )}
      </nav>
    </article>
  );
}
