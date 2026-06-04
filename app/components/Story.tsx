type StoryProps = {
  locale?: "en" | "sr";
};

export function Story({ locale = "en" }: StoryProps) {
  const isSr = locale === "sr";
  return (
    <section id="prica" className="section section--story">
      <div className="section__inner section--story__grid">
        <div className="story__head">
          <p className="story__eyebrow js-story-eyebrow">{isSr ? "Priča" : "About"}</p>
          <h2 className="section__heading section__heading--xl js-section-title">
            {isSr ? "Nastali u Kraljevu. Rasli uz kilometre." : "Built in Kraljevo. Grown on the run."}
          </h2>
        </div>
        <div className="story__body">
          <p className="story__p story__p--big js-story-line">
            {isSr
              ? "36Soma Runners su počeli kao mala ekipa koja se nalazila na trčanju u Kraljevu."
              : "36Soma Runners started as a few people meeting up for runs in Kraljevo."}
          </p>
          <p className="story__p js-story-line">
            {isSr
              ? "Negde između dužina, odlazaka na trke i razgovora posle treninga, to je postala prava ekipa. Neko trenira ozbiljno, neko samo želi kretanje posle posla, ali svi dele isti osećaj pripadnosti."
              : "Somewhere between long runs, race trips, and post-session talks, it became a crew. Some train seriously. Some just need movement after work. Everyone shares the same route home."}
          </p>
        </div>
        <blockquote className="manifest js-manifest">
          <p className="manifest__line">{isSr ? "Ista ruta. Različit ritam." : "Same route. Different pace."}</p>
          <p className="manifest__line">{isSr ? "Kontinuitet je važniji od poređenja, svake nedelje." : "Consistency over comparison, every week."}</p>
          <p className="manifest__line">{isSr ? "U ovoj ekipi niko ne ostaje iza." : "Nobody gets left behind on this crew."}</p>
          <p className="manifest__line manifest__line--kick">
            {isSr ? "Dobri ljudi su važniji od brzih splitova." : "Good people matter more than fast splits."}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
