"use client";

import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  locale?: "en" | "sr";
};

export function Header({ locale = "en" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const isSr = locale === "sr";
  const base = isSr ? "/sr" : "";

  return (
    <header className="site-header">
      <Link className="logo" href={`${base}/#top`} aria-label="36Soma Runners — back to top">
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
        <a href={`${base}/#top`} onClick={closeMenu}>{isSr ? "Početna" : "Home"}</a>
        <a href={`${base}/#prica`} onClick={closeMenu}>{isSr ? "Priča" : "About"}</a>
        <a href={`${base}/#slike`} onClick={closeMenu}>{isSr ? "Galerija" : "Gallery"}</a>
        <a href={`${base}/#termini`} onClick={closeMenu}>{isSr ? "Treninzi" : "Training"}</a>
        <a href={`${base}/contact`} onClick={closeMenu}>{isSr ? "Kontakt" : "Contact"}</a>
        <div className="nav__lang">
          <a href="/#top" onClick={closeMenu} aria-label="Switch to English">EN</a>
          <span>/</span>
          <a href="/sr/#top" onClick={closeMenu} aria-label="Prebaci na srpski">SR</a>
        </div>
      </nav>
    </header>
  );
}
