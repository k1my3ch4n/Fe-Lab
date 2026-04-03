"use client";

import useThemeStore from "@shared/stores/useThemeStore";

// zustand persist 하이드레이션을 트리거하기 위한 래퍼
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 스토어 구독 — persist 하이드레이션 활성화
  useThemeStore();
  return <>{children}</>;
}
