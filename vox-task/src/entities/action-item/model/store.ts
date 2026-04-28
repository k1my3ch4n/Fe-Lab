import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ActionItem, ActionItemStatus } from './types';

interface ActionItemStore {
  items: ActionItem[];
  addItem: (raw: Omit<ActionItem, 'id' | 'status' | 'createdAt'>) => void;
  removeItem: (id: string) => void;
  updateStatus: (id: string, status: ActionItemStatus) => void;
  updateItem: (id: string, patch: Partial<Pick<ActionItem, 'content' | 'assignee' | 'dueDate'>>) => void;
  clearAll: () => void;
}

const chromeLocalStorage = {
  getItem: (name: string) =>
    new Promise<string | null>((resolve) => {
      chrome.storage.local.get(name, (result) => {
        resolve((result[name] as string) ?? null);
      });
    }),
  setItem: (name: string, value: string) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.set({ [name]: value }, resolve);
    }),
  removeItem: (name: string) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.remove(name, resolve);
    }),
};

export const useActionItemStore = create<ActionItemStore>()(
  persist(
    (set) => ({
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

      updateItem: (id, patch) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),

      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'action-items',
      storage: createJSONStorage(() => chromeLocalStorage),
    },
  ),
);
