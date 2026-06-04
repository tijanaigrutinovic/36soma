type VibeProps = {
  locale?: "en" | "sr";
};

export function Vibe({ locale = "en" }: VibeProps) {
  const isSr = locale === "sr";
  return (
    <section id="vibe" className="vibe" aria-label="Club atmosphere">
      <div className="vibe__inner">
        <p className="vibe__kicker js-vibe-kicker">{isSr ? "Kako jedan trening stvarno izgleda" : "How one run actually feels"}</p>
        <div className="vibe__stage">
          <p className="vibe__slide js-vibe-slide" data-index="0">
            {isSr ? "STAZA" : "TRACK"}
          </p>
          <p className="vibe__slide js-vibe-slide" data-index="1">
            {isSr ? "RITAM" : "RHYTHM"}
          </p>
          <p className="vibe__slide js-vibe-slide" data-index="2">
            {isSr ? "EKIPA" : "CREW"}
          </p>
          <p className="vibe__slide js-vibe-slide" data-index="3">
            {isSr ? "FINIŠ" : "FINISH"}
          </p>
        </div>
        <p className="vibe__sub js-vibe-sub">
          {isSr
            ? "Neko kaže da je umoran. Posle trećeg kilometra mu niko ne veruje. Razgovori se prekidaju i vraćaju između semafora, plejlisti i promena tempa. Uvek se na kraju pojavi isto pitanje: još jedan krug?"
            : "Someone says they are tired. Nobody believes them after kilometer three. Conversations split and reconnect between traffic lights, playlists, and pace changes. At some point, someone always asks: one more lap?"}
        </p>
      </div>
    </section>
  );
}
