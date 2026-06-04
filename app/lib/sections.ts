export type SiteLocale = "en" | "sr";

export type SectionKey = "top" | "story" | "gallery" | "training" | "contact";

const SECTION_IDS: Record<SiteLocale, Record<SectionKey, string>> = {
  en: {
    top: "top",
    story: "story",
    gallery: "gallery",
    training: "training",
    contact: "contact",
  },
  sr: {
    top: "top",
    story: "prica",
    gallery: "slike",
    training: "termini",
    contact: "kontakt",
  },
};

export function sectionId(locale: SiteLocale, key: SectionKey): string {
  return SECTION_IDS[locale][key];
}

export function sectionHash(locale: SiteLocale, key: SectionKey): string {
  return `#${sectionId(locale, key)}`;
}
