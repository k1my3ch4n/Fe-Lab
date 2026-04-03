"use client";

import { useTheme } from "./ThemeProvider";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="w-8 h-8 rounded-md border border-border-subtle bg-transparent
        flex items-center justify-center cursor-pointer
        transition-all duration-200
        hover:border-accent-cyan hover:text-accent-cyan text-text-muted"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
