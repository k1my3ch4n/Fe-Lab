"use client";

import useThemeStore from "@shared/stores/useThemeStore";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useThemeStore();
  const isDark = !mounted || theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="w-8 h-8 rounded-md border border-border-subtle bg-transparent
        flex items-center justify-center cursor-pointer
        transition-all duration-200
        hover:border-accent-cyan hover:text-accent-cyan text-text-muted"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
