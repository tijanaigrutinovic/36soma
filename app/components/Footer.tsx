import { CLUB_EMAIL, clubMailto } from "../lib/contact";

type FooterProps = {
  locale?: "en" | "sr";
};

export function Footer({ locale = "en" }: FooterProps) {
  const isSr = locale === "sr";
  return (
    <footer className="site-footer">
      <div className="site-footer__mega" aria-hidden="true">
        <span>RUN</span>
        <span>RUN</span>
        <span>RUN</span>
      </div>
      <div className="site-footer__reach">
        <span className="site-footer__reach-label">{isSr ? "Piši nam" : "Write us"}</span>
        <a className="site-footer__email" href={clubMailto}>
          {CLUB_EMAIL}
        </a>
      </div>
      <div className="site-footer__row">
        <p className="site-footer__legal">
          © <span id="year"></span> 36Soma Runners · {isSr ? "Sva prava zadržana." : "All rights reserved."}
        </p>
        <div className="site-footer__socials" aria-label="Social links">
          <a
            className="site-footer__social"
            href="https://www.instagram.com/36soma.runners/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="36Soma Runners on Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
              <circle cx="12" cy="12" r="4.1" />
              <circle cx="17.45" cy="6.55" r="1.2" />
            </svg>
          </a>
          <a
            className="site-footer__social"
            href="https://chat.whatsapp.com/CSGPtzYS9Vm56dXSY45C2s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="36Soma Runners on WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.05 4a8 8 0 0 0-6.9 12.05L4 20l4.1-1.1A8 8 0 1 0 12.05 4Z" />
              <path d="M15.8 13.84c-.2-.1-1.14-.56-1.32-.62-.17-.07-.3-.1-.42.1-.13.2-.49.62-.6.75-.12.13-.23.15-.43.05-.2-.1-.83-.3-1.58-.96-.58-.52-.97-1.16-1.08-1.36-.12-.2-.01-.3.09-.4.09-.1.2-.24.3-.35.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.43-1.03-.59-1.42-.16-.38-.32-.33-.43-.34h-.37c-.13 0-.33.05-.5.25-.17.2-.66.64-.66 1.56 0 .92.67 1.81.76 1.94.1.13 1.31 1.99 3.17 2.79.44.19.79.31 1.06.4.45.14.86.12 1.18.07.36-.05 1.14-.47 1.3-.93.16-.46.16-.85.11-.93-.04-.08-.17-.13-.37-.23Z" />
            </svg>
          </a>
          <a
            className="site-footer__social"
            href="https://strava.app.link/fEF18dZmS2b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="36Soma Runners on Strava"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.7 4 5.1 14.8h3.3l2.3-4.5 2.3 4.5h3.3L10.7 4Z" />
              <path d="m15.6 15.9-2.2 4.1h3l.7-1.4.7 1.4h3l-2.2-4.1h-3Z" />
            </svg>
          </a>
        </div>
        <p className="site-footer__tag">{isSr ? "VIDIMO SE NA SLEDEĆEM TRENINGU." : "SEE YOU NEXT RUN."}</p>
      </div>
    </footer>
  );
}
