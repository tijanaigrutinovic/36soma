"use client";

import { useCallback, useEffect, useState } from "react";
import { applyTheme, getResolvedTheme, type Theme } from "./theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const onRoot = document.documentElement.getAttribute("data-theme");
  return onRoot === "light" || onRoot === "dark" ? onRoot : getResolvedTheme();
}

export function useThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    window.addEventListener("36soma-theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("36soma-theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }, []);

  return {
    theme,
    toggle,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
