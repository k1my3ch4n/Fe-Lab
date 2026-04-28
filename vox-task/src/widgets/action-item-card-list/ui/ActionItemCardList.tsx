import { useState } from 'react';
import { useActionItemStore } from '@/entities/action-item/model';
import { ActionItemCard } from '@/entities/action-item/ui';
import type { ActionItemStatus } from '@/entities/action-item/model';

type FilterTab = 'all' | ActionItemStatus;

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: '전체', value: 'all' },
  { label: '대기', value: 'pending' },
  { label: '완료', value: 'done' },
  { label: '취소', value: 'dismissed' },
];

export function ActionItemCardList() {
  const { items, updateStatus, updateItem, removeItem, clearAll } = useActionItemStore();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter((item) => item.status === activeFilter);

  return (
    <section className="flex flex-col gap-3 w-full">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">
          액션 아이템
          {items.length > 0 && (
            <span className="ml-2 text-xs font-normal text-gray-400">
              {items.length}개
            </span>
          )}
        </h2>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            전체 삭제
          </button>
        )}
      </header>

      <nav className="flex gap-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <ul className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-0.5">
        {filteredItems.length === 0 ? (
          <li className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm gap-1">
            <span className="text-2xl">📋</span>
            <span>
              {activeFilter === 'all'
                ? '아직 액션 아이템이 없습니다'
                : `${FILTER_TABS.find((tab) => tab.value === activeFilter)?.label} 항목이 없습니다`}
            </span>
          </li>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id}>
              <ActionItemCard
                item={item}
                onStatusChange={updateStatus}
                onRemove={removeItem}
                onUpdate={updateItem}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
