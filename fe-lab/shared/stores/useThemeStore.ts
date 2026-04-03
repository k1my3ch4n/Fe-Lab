"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      mounted: false,
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";

        set({ theme: next });

        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(next);
      },
    }),
    {
      name: "fe-lab-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(state.theme);

        useThemeStore.setState({ mounted: true });
      },
    },
  ),
);

export default useThemeStore;
