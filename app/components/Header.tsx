"use client";

import Link from "next/link";
import { useState } from "react";
import { asset } from "../lib/asset";
import { sectionHash } from "../lib/sections";

type HeaderProps = {
  locale?: "en" | "sr";
};

export function Header({ locale = "en" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const isSr = locale === "sr";
  const loc = isSr ? "sr" : "en";
  const base = isSr ? "/sr" : "";
  const page = (path: string) => asset(`${base}${path}`);

  return (
    <header className="site-header">
      <Link className="logo" href={page("/#top")} aria-label="36Soma Runners — back to top">
        <span className="logo__num">36</span><span className="logo__num-span">Soma Runners</span>
      </Link>

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

      <nav id="main-nav" className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
        <a href={page(sectionHash(loc, "story"))} onClick={closeMenu}>
          {isSr ? "Priča" : "About"}
        </a>
        <a href={page(sectionHash(loc, "gallery"))} onClick={closeMenu}>
          {isSr ? "Galerija" : "Gallery"}
        </a>
        <a href={page(sectionHash(loc, "training"))} onClick={closeMenu}>
          {isSr ? "Treninzi" : "Training"}
        </a>
        <a href={page("/contact/")} onClick={closeMenu}>
          {isSr ? "Kontakt" : "Contact"}
        </a>
        <div className="nav__lang">
          <a href={asset("/#top")} onClick={closeMenu} aria-label="Switch to English">EN</a>
          <span>/</span>
          <a href={asset("/sr/#top")} onClick={closeMenu} aria-label="Prebaci na srpski">SR</a>
        </div>
      </nav>
    </header>
  );
}
