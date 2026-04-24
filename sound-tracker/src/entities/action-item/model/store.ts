import { create } from 'zustand';
import type { ActionItem, ActionItemStatus } from './types';

interface ActionItemStore {
  items: ActionItem[];
  addItem: (raw: Omit<ActionItem, 'id' | 'status' | 'createdAt'>) => void;
  removeItem: (id: string) => void;
  updateStatus: (id: string, status: ActionItemStatus) => void;
  clearAll: () => void;
}

export const useActionItemStore = create<ActionItemStore>((set) => ({
  items: [],

  addItem: (raw) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...raw,
          id: crypto.randomUUID(),
          status: 'pending' as const,
          createdAt: Date.now(),
        },
      ],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    })),

  clearAll: () => set({ items: [] }),
}));
