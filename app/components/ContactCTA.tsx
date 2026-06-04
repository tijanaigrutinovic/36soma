import { sectionId } from "../lib/sections";
import { SiteImage } from "./SiteImage";

type ContactCTAProps = {
  locale?: "en" | "sr";
};

export function ContactCTA({ locale = "en" }: ContactCTAProps) {
  const isSr = locale === "sr";
  const visualAlt = isSr
    ? "36Soma Runners na treningu u Kraljevu"
    : "36Soma Runners training together in Kraljevo";
  return (
    <section id={sectionId(isSr ? "sr" : "en", "contact")} className="section section--cta">
      <div className="section__inner">
        <div className="cta">
          <div className="cta__layout">
            <div className="cta__copy">
              <p className="story__eyebrow js-cta-eyebrow">{isSr ? "Kontakt" : "Contact"}</p>
              <h2 className="section__heading section__heading--xl js-section-title">
                {isSr ? "Želiš da se pridružiš?" : "Want to join a run?"}
              </h2>
              <p className="cta__text js-cta-text">
                {isSr ? (
                  <>
                    Javi nam se preko Instagrama, WhatsApp-a ili Strave. Pitaj šta god ti treba ili nam
                    samo reci kada možeš da dođeš prvi put. Uvek se nalazimo na{" "}
                    <strong>Gradskoj terasi</strong> u Kraljevu.
                  </>
                ) : (
                  <>
                    Reach out on Instagram, WhatsApp, or Strava. Ask anything, or just tell us when you can
                    come to your first session. We always meet at <strong>City Terrace</strong> in Kraljevo.
                  </>
                )}
              </p>
              <div className="cta__links">
                <a
                  className="btn btn--magnetic magnetic js-cta-btn"
                  href="https://www.instagram.com/36soma.runners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  aria-label="36Soma Runners on Instagram"
                >
                  Instagram
                </a>
                <a
                  className="btn btn--ghost btn--magnetic magnetic js-cta-btn"
                  href="https://chat.whatsapp.com/CSGPtzYS9Vm56dXSY45C2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  aria-label="36Soma Runners WhatsApp group"
                >
                  WhatsApp
                </a>
                <a
                  className="btn btn--ghost btn--magnetic magnetic js-cta-btn"
                  href="https://strava.app.link/fEF18dZmS2b"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  aria-label="36Soma Runners on Strava"
                >
                  Strava
                </a>
              </div>
            </div>
            <figure className="cta__visual">
              <SiteImage
                src="/media/B78A2967.webp"
                alt={visualAlt}
                width={1200}
                height={1800}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
