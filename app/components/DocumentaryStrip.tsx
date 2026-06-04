import { SiteImage } from "./SiteImage";

const docsEn = [
  {
    src: "/media/IMG_6212.webp",
    alt: "Crew during warm-up in Kraljevo",
    title: "First kilometers",
    meta: "Terrace / route debate / 18:50",
  },
  {
    src: "/media/night-pace.webp",
    alt: "Night run in downtown Kraljevo",
    title: "City lights after 8PM",
    meta: "Heavy breathing / cold air",
  },
  {
    src: "/media/FK2A1173.webp",
    alt: "Race day atmosphere with runners",
    title: "Start line silence",
    meta: "Legs tired / crew loud",
  },
  {
    src: "/media/342A3769.webp",
    alt: "Post-run crew moment",
    title: "Coffee after cooldown",
    meta: "Same route / different mood",
  },
  {
    src: "/media/Trka Kraljeva-Photo-ShadowHunter (26 of 1390).webp",
    alt: "Club runners together on the square after race day in Kraljevo",
    title: "One more lap?",
    meta: "Pace picks up naturally",
  },
];

const docsSr = [
  {
    src: "/media/IMG_6212.webp",
    alt: "Ekipa tokom zagrevanja u Kraljevu",
    title: "Prvi kilometri",
    meta: "Terasa / dogovor rute / 18:50",
  },
  {
    src: "/media/night-pace.webp",
    alt: "Noćno trčanje kroz centar Kraljeva",
    title: "Gradska svetla posle 20h",
    meta: "Teško disanje / hladan vazduh",
  },
  {
    src: "/media/FK2A1173.webp",
    alt: "Atmosfera na dan trke",
    title: "Tišina pred start",
    meta: "Noge umorne / ekipa glasna",
  },
  {
    src: "/media/342A3769.webp",
    alt: "Trenutak ekipe posle trčanja",
    title: "Kafa posle hlađenja",
    meta: "Ista ruta / drugačiji osećaj",
  },
  {
    src: "/media/Trka Kraljeva-Photo-ShadowHunter (26 of 1390).webp",
    alt: "Grupa trkača na trgu u Kraljevu posle trke",
    title: "Još jedan krug?",
    meta: "Tempo sam raste",
  },
];

type DocumentaryStripProps = {
  locale?: "en" | "sr";
};

export function DocumentaryStrip({ locale = "en" }: DocumentaryStripProps) {
  const isSr = locale === "sr";
  const docs = isSr ? docsSr : docsEn;
  return (
    <section className="doc-strip section js-doc-strip" aria-label="Run documentary strip">
      <div className="section__inner">
        <div className="doc-strip__head">
          <p className="story__eyebrow js-doc-eyebrow">{isSr ? "Run dokumentarac" : "Run documentary"}</p>
          <h2 className="section__heading section__heading--xl js-section-title">
            {isSr ? "Svako trčanje ostavi kadar." : "Every run leaves a scene."}
          </h2>
        </div>
        <div className="doc-strip__viewport js-doc-viewport">
          <div className="doc-strip__rail js-doc-rail">
            {docs.map((item) => (
              <article key={item.src} className="doc-strip__card js-doc-card">
                <SiteImage src={item.src} alt={item.alt} width={1600} height={1066} loading="lazy" />
                <div className="doc-strip__meta">
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
