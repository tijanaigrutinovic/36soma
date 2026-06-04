type WhyWeRunProps = {
  locale?: "en" | "sr";
};

export function WhyWeRun({ locale = "en" }: WhyWeRunProps) {
  const isSr = locale === "sr";
  const lines = isSr
    ? ["ZA EKIPU", "ZA KILOMETRE", "ZA HAOS", "ZA KAFU POSLE TRČANJA"]
    : ["FOR THE CREW", "FOR THE MILES", "FOR THE CHAOS", "FOR THE POST-RUN COFFEE"];
  return (
    <section className="section section--why" aria-labelledby="why-title">
      <div className="section__inner">
        <p className="story__eyebrow js-why-eyebrow">{isSr ? "Zašto trčimo" : "Why we run"}</p>
        <h2 id="why-title" className="section__heading section__heading--xl js-section-title">
          {isSr ? "Ekipa na prvom mestu. Tempo na drugom." : "Community first. Pace second."}
        </h2>
        <div className="why__stack">
          {lines.map((line) => (
            <p key={line} className="why__line js-why-line js-speed-text">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
