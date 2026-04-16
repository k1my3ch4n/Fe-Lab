"use client";

import { useSidebarStore, useViewportStore } from "@shared/stores";

export function useSidebarBehavior() {
  const { collapsed, toggleCollapsed, closeDrawer } = useSidebarStore();
  const { isMobile } = useViewportStore();

  const isCollapsed = isMobile ? false : collapsed;
  const handleToggle = isMobile ? closeDrawer : toggleCollapsed;

  return { isCollapsed, handleToggle };
}
