"use client";

import { create } from "zustand";

interface ViewportState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useViewportStore = create<ViewportState>()(() => ({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
}));

function updateViewport() {
  const width = window.innerWidth;

  useViewportStore.setState({
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  });
}

if (typeof window !== "undefined") {
  updateViewport();
  window.addEventListener("resize", updateViewport);
}

export default useViewportStore;
