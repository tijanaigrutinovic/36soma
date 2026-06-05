"use client";

import { useThemeToggle } from "../lib/useThemeToggle";

type ThemeToggleProps = {
  locale?: "en" | "sr";
  className?: string;
};

const copy = {
  en: {
    night: "Night",
    day: "Day",
    toDay: "Switch to day mode",
    toNight: "Switch to night mode",
  },
  sr: {
    night: "Noć",
    day: "Dan",
    toDay: "Prebaci na dan",
    toNight: "Prebaci na noć",
  },
} as const;

export function ThemeToggle({ locale = "en", className }: ThemeToggleProps) {
  const { isDark, toggle } = useThemeToggle();
  const t = locale === "sr" ? copy.sr : copy.en;

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle--bib ${isDark ? "theme-toggle--night" : "theme-toggle--day"}${className ? ` ${className}` : ""}`}
      onClick={toggle}
      aria-label={isDark ? t.toDay : t.toNight}
      aria-pressed={!isDark}
      title={isDark ? t.toDay : t.toNight}
    >
      <span className="theme-toggle__bib-card" aria-hidden="true">
        <span className="theme-toggle__bib-face theme-toggle__bib-face--front">
          <span className="theme-toggle__bib-pin theme-toggle__bib-pin--l" />
          <span className="theme-toggle__bib-pin theme-toggle__bib-pin--r" />
          <span className="theme-toggle__bib-num">36</span>
          <span className="theme-toggle__bib-title">{t.night}</span>
        </span>
        <span className="theme-toggle__bib-face theme-toggle__bib-face--back">
          <span className="theme-toggle__bib-pin theme-toggle__bib-pin--l" />
          <span className="theme-toggle__bib-pin theme-toggle__bib-pin--r" />
          <span className="theme-toggle__bib-num">36</span>
          <span className="theme-toggle__bib-title">{t.day}</span>
        </span>
      </span>
    </button>
  );
}
