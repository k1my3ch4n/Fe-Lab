import { Badge } from '@/shared/ui';
import type { ActionItem, ActionItemStatus } from '../model/types';

interface ActionItemCardProps {
  item: ActionItem;
  onStatusChange: (id: string, status: ActionItemStatus) => void;
  onRemove: (id: string) => void;
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

export function ActionItemCard({ item, onStatusChange, onRemove }: ActionItemCardProps) {
  const handleToggleDone = () => {
    onStatusChange(item.id, item.status === 'done' ? 'pending' : 'done');
  };

  const handleDismiss = () => {
    onStatusChange(item.id, 'dismissed');
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <header className="mb-2 flex items-start justify-between gap-2">
        <Badge variant={STATUS_BADGE_VARIANT[item.status]}>
          {STATUS_LABEL[item.status]}
        </Badge>
        <button
          type="button"
          aria-label="삭제"
          className="text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => onRemove(item.id)}
        >
          ✕
        </button>
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
          className="rounded px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-green-100 hover:text-green-700 transition-colors"
          onClick={handleToggleDone}
        >
          {item.status === 'done' ? '되돌리기' : '완료'}
        </button>
        {item.status !== 'dismissed' && (
          <button
            type="button"
            className="rounded px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-red-100 hover:text-red-700 transition-colors"
            onClick={handleDismiss}
          >
            취소
          </button>
        )}
      </nav>
    </article>
  );
}
