import { SiteImage } from "./SiteImage";

import { sectionHash } from "../lib/sections";

type HeroProps = {
  locale?: "en" | "sr";
};

export function Hero({ locale = "en" }: HeroProps) {
  const isSr = locale === "sr";
  const loc = isSr ? "sr" : "en";
  return (
    <section id="top" className="hero hero--media" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <SiteImage
          className="hero__media-img"
          src="/media/342A2254.webp"
          alt={isSr ? "36Soma Runners na stazi u Kraljevu" : "36Soma Runners on the track in Kraljevo"}
          width={1600}
          height={1066}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__noise" aria-hidden="true" />
      <div className="hero__scan" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__water js-hero-parallax" aria-hidden="true">
        36
      </div>
      <div className="hero__layout">
        <div className="hero__main">
          <p className="hero__tag js-reveal">{isSr ? "Kraljevo · trkački kolektiv" : "Kraljevo · running collective"}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">
              <span className="js-hero-word">36</span> <span className="js-hero-word">soma</span>
            </span>
            <span className="hero__title-line hero__title-line--accent js-hero-runners">runners</span>
          </h1>
          <p className="hero__lead js-reveal">
            <span className="hero__lead-inner js-hero-lead">
              {isSr
                ? "Trkački kolektiv iz Kraljeva. Dovoljno brzo da se oznojiš. Dovoljno mirno da ostanemo zajedno."
                : "Running collective from Kraljevo. Fast enough to sweat. Slow enough to stay together."}
            </span>
          </p>
        </div>
        <aside className="hero__aside">
          <div className="hero__stat js-reveal">
            <span className="hero__stat-label">{isSr ? "pristup" : "mindset"}</span>
            <span className="hero__stat-value">{isSr ? "bez ega" : "no ego"}</span>
            <span className="hero__stat-note">{isSr ? "dobri ljudi &gt; brzi splitovi" : "good people > fast splits"}</span>
          </div>
          <div className="hero__stat js-reveal">
            <span className="hero__stat-label">Kraljevo</span>
            <span className="hero__stat-value">{isSr ? "zajedno" : "together"}</span>
            <span className="hero__stat-note">{isSr ? "ista ruta · različit ritam" : "same route · different pace"}</span>
          </div>
          <div className="hero__meta">
            <a className="hero__scroll hero__scroll--primary js-reveal magnetic" href={sectionHash(loc, "training")} data-magnetic>
              {isSr ? "Treninzi · raspored" : "Training · schedule"}
            </a>
            <a className="hero__scroll js-reveal magnetic" href={sectionHash(loc, "gallery")} data-magnetic>
              {isSr ? "Galerija" : "Gallery"}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
