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
      try {
        chrome.storage.local.get(name, (result) => {
          if (chrome.runtime.lastError) {
            console.error('[storage] getItem 실패:', chrome.runtime.lastError.message);
            resolve(null);
            return;
          }
          resolve((result[name] as string) ?? null);
        });
      } catch (error) {
        console.error('[storage] getItem 예외:', error);
        resolve(null);
      }
    }),
  setItem: (name: string, value: string) =>
    new Promise<void>((resolve) => {
      try {
        chrome.storage.local.set({ [name]: value }, () => {
          if (chrome.runtime.lastError) {
            console.error('[storage] setItem 실패:', chrome.runtime.lastError.message);
          }
          resolve();
        });
      } catch (error) {
        console.error('[storage] setItem 예외:', error);
        resolve();
      }
    }),
  removeItem: (name: string) =>
    new Promise<void>((resolve) => {
      try {
        chrome.storage.local.remove(name, () => {
          if (chrome.runtime.lastError) {
            console.error('[storage] removeItem 실패:', chrome.runtime.lastError.message);
          }
          resolve();
        });
      } catch (error) {
        console.error('[storage] removeItem 예외:', error);
        resolve();
      }
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
