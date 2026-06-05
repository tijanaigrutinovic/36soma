"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { blogPostHref } from "../lib/blog";
import { asset } from "../lib/asset";
import { localeSwitchTargets, normalizePathname } from "../lib/locale";
import { sectionHash } from "../lib/sections";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  locale?: "en" | "sr";
};

function isHomePath(pathname: string | null): boolean {
  const path = normalizePathname(pathname ?? "/");
  return path === "/" || path === "/sr";
}

export function Header({ locale = "en" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const [overHero, setOverHero] = useState(isHome);
  const isSr = locale === "sr";
  const lang = localeSwitchTargets(pathname ?? "/");

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    const hero = document.querySelector(".hero");
    if (!hero) {
      setOverHero(false);
      return;
    }

    const update = () => {
      const headerEl = document.querySelector(".site-header");
      const headerH = headerEl?.getBoundingClientRect().height ?? 68;
      const rect = hero.getBoundingClientRect();
      setOverHero(rect.bottom > headerH);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  const closeMenu = () => setMenuOpen(false);
  const loc = locale;
  const base = isSr ? "/sr" : "";
  /** Plain <a> tags need asset(); Next <Link> already applies basePath. */
  const page = (path: string) => asset(`${base}${path}`);
  return (
    <header
      className={`site-header ${isHome && overHero ? "site-header--over-hero" : "site-header--solid"}`}
    >
      <a className="logo" href={asset(isSr ? "/sr/" : "/")} aria-label="36Soma Runners — back to top">
        <span className="logo__num">36</span><span className="logo__num-span">Soma Runners</span>
      </a>

      <div className="site-header__actions">
        <ThemeToggle locale={locale} className="theme-toggle--bar" />
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="main-nav" className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
        <div className="nav__links">
          <a href={page(sectionHash(loc, "story"))} onClick={closeMenu}>
            {isSr ? "Priča" : "About"}
          </a>
          <a href={page(sectionHash(loc, "gallery"))} onClick={closeMenu}>
            {isSr ? "Galerija" : "Gallery"}
          </a>
          <a href={page(sectionHash(loc, "training"))} onClick={closeMenu}>
            {isSr ? "Treninzi" : "Training"}
          </a>
          <a href={blogPostHref(locale)} onClick={closeMenu}>
            Blog
          </a>
          <a href={page("/contact/")} onClick={closeMenu}>
            {isSr ? "Kontakt" : "Contact"}
          </a>
        </div>
        <div className="nav__tools">
          <ThemeToggle locale={locale} className="theme-toggle--menu" />
          <div className="nav__lang">
            <a href={asset(lang.en)} onClick={closeMenu} aria-label="Switch to English">
              EN
            </a>
            <span>/</span>
            <a href={asset(lang.sr)} onClick={closeMenu} aria-label="Prebaci na srpski">
              SR
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
