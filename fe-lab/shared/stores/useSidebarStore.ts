"use client";

import { create } from "zustand";

interface SidebarState {
  collapsed: boolean;
  drawerOpen: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const useSidebarStore = create<SidebarState>()((set) => ({
  collapsed: false,
  drawerOpen: false,
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
  openDrawer: () => set({ drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
}));

export default useSidebarStore;
