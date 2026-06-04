import { sectionId } from "../lib/sections";
import { SiteImage } from "./SiteImage";

type GalleryLayout = "tile" | "wide" | "tall";

type GalleryImage = {
  src: string;
  altEn: string;
  altSr: string;
  w: number;
  h: number;
  layout: GalleryLayout;
  /** Optional extra class(es), e.g. `gallery__cell--ivanjica` */
  className?: string;
};

/** Paths in `DocumentaryStrip` excluded. Chaotic dense-grid mix — layouts follow native orientation where it helps. */
const images: GalleryImage[] = [
  {
    src: "/media/FK2A0717.webp",
    altEn: "Training or race day",
    altSr: "Trening ili trka",
    w: 1200,
    h: 1800,
    layout: "tall",
  },
  {
    src: "/media/342A2143.webp",
    altEn: "36Soma Runners training in Kraljevo",
    altSr: "36Soma Runners — trening u Kraljevu",
    w: 1600,
    h: 1066,
    layout: "tile",
  },
  {
    src: "/media/Trka Kraljeva-Photo-ShadowHunter (211 of 1390).webp",
    altEn: "Kraljevo race",
    altSr: "Trka Kraljeva",
    w: 2000,
    h: 1200,
    layout: "wide",
  },
  {
    src: "/media/556477393_1365505102249197_7285480681888508783_n.webp",
    altEn: "Crew hanging out",
    altSr: "Druženje ekipe",
    w: 1080,
    h: 1080,
    layout: "tile",
  },
  {
    src: "/media/FK2A0837.webp",
    altEn: "Day or night on the route",
    altSr: "Noć ili dan na stazi",
    w: 2000,
    h: 1200,
    layout: "wide",
    className: "gallery__cell--center",
  },
  {
    src: "/media/B78A3234.webp",
    altEn: "Running frame",
    altSr: "Trčanje — kadar",
    w: 1600,
    h: 1066,
    layout: "tile",
  },
  {
    src: "/media/_42A5971.webp",
    altEn: "36Soma Runners moment",
    altSr: "36Soma Runners — trenutak",
    w: 1600,
    h: 1066,
    layout: "tall",
  },
  {
    src: "/media/54610912360_60e941aa44_o.webp",
    altEn: "36Soma Runners",
    altSr: "36Soma Runners",
    w: 2000,
    h: 1200,
    layout: "wide",
  },
  {
    src: "/media/FK2A1292.webp",
    altEn: "In stride",
    altSr: "U pokretu",
    w: 1200,
    h: 1200,
    layout: "tile",
  },
  {
    src: "/media/FK2A1154.webp",
    altEn: "Night training group on the track",
    altSr: "Grupa na večernjem treningu na stazi",
    w: 2000,
    h: 1333,
    layout: "wide",
    className: "gallery__cell--center",
  },
  {
    src: "/media/B78A2944.webp",
    altEn: "Running in Kraljevo",
    altSr: "Trčanje u Kraljevu",
    w: 1600,
    h: 1066,
    layout: "tile",
  },
  {
    src: "/media/FK2A0720.webp",
    altEn: "36Soma Runners in motion",
    altSr: "36Soma Runners u pokretu",
    w: 1600,
    h: 1066,
    layout: "tile",
    className: "gallery__cell--center",
  },
  {
    src: "/media/342A3870.webp",
    altEn: "Shared pace",
    altSr: "Zajednički tempo",
    w: 1200,
    h: 1200,
    layout: "tile",
  },
  {
    src: "/media/B78A2998.webp",
    altEn: "Track and city",
    altSr: "Staza i grad",
    w: 1600,
    h: 1066,
    layout: "tile",
  },
  {
    src: "/media/555752439_1365559292243778_5822336822088664470_n.webp",
    altEn: "Team portrait",
    altSr: "Portret ekipe",
    w: 1080,
    h: 1080,
    layout: "tile",
  },
  {
    src: "/media/342A4218.webp",
    altEn: "Crew in motion",
    altSr: "Ekipa u pokretu",
    w: 1200,
    h: 1200,
    layout: "tile",
  },
  {
    src: "/media/B78A3156.webp",
    altEn: "Crew at training",
    altSr: "Ekipa na treningu",
    w: 2000,
    h: 1200,
    layout: "wide",
  },
  {
    src: "/media/pp25-eh (1152).webp",
    altEn: "Running crew",
    altSr: "Trkačka ekipa",
    w: 1200,
    h: 1200,
    layout: "tile",
    className: "gallery__cell--top",
  },
  {
    src: "/media/54610814993_23e7d32cdf_o.webp",
    altEn: "Race or training moment",
    altSr: "Trka ili trening",
    w: 1200,
    h: 1200,
    layout: "tile",
  },
  {
    src: "/media/342A3849.webp",
    altEn: "Crew on the track",
    altSr: "Ekipa na stazi",
    w: 1200,
    h: 1200,
    layout: "tile",
  },
  
  {
    src: "/media/IMG_6219.webp",
    altEn: "36Soma Runners on the route",
    altSr: "36Soma Runners na stazi",
    w: 2000,
    h: 1335,
    layout: "wide",
  },
  {
    src: "/media/54610857900_1cb6c33c64_o.webp",
    altEn: "Crew moment after the run",
    altSr: "Trenutak ekipe posle trčanja",
    w: 2000,
    h: 1333,
    layout: "tile",
  },
  {
    src: "/media/342A4215.webp",
    altEn: "Running crew together",
    altSr: "Trčanje i ekipa",
    w: 2000,
    h: 1200,
    layout: "wide",
  },
  {
    src: "/media/ivanjica.webp",
    altEn: "Runners celebrating at the finish line in Ivanjica",
    altSr: "Trkači slave na cilju u Ivanjici",
    w: 1200,
    h: 1200,
    layout: "wide",
    className: "gallery__cell--center",
  },
];

const layoutClass: Record<GalleryLayout, string> = {
  tile: "gallery__cell gallery__cell--tile js-gallery-cell",
  wide: "gallery__cell gallery__cell--wide js-gallery-cell",
  tall: "gallery__cell gallery__cell--tall js-gallery-cell",
};

type GalleryProps = {
  locale?: "en" | "sr";
};

export function Gallery({ locale = "en" }: GalleryProps) {
  const isSr = locale === "sr";
  return (
    <section id={sectionId(isSr ? "sr" : "en", "gallery")} className="section section--gallery">
      <div className="section__inner">
        <p className="story__eyebrow js-gallery-eyebrow">{isSr ? "Galerija" : "Gallery"}</p>
        <h2 className="section__heading section__heading--xl js-section-title">
          {isSr ? "Kadrove koje nosimo sa staze" : "Moments we carry from the track"}
        </h2>
        <p className="gallery__intro js-gallery-intro">
          {isSr
            ? "Izlasci sunca, startne linije i smeh posle treninga. Ovi kadrovi bolje opisuju klub nego bilo koji slogan."
            : "Sunrises, race starts, and the laughs after the run. These frames show the club better than any slogan."}
        </p>
        <ul className="gallery">
          {images.map((img) => (
            <li
              key={img.src}
              className={[layoutClass[img.layout], img.className].filter(Boolean).join(" ")}
            >
              <SiteImage
                src={img.src}
                alt={isSr ? img.altSr : img.altEn}
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
