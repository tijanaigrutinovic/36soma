import { Footer } from "../components/Footer";
import { DocumentaryStrip } from "../components/DocumentaryStrip";
import { Gallery } from "../components/Gallery";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ContactCTA } from "../components/ContactCTA";
import { LoaderAndCursor } from "../components/LoaderAndCursor";
import { Marquee } from "../components/Marquee";
import { MotionOverlay } from "../components/MotionOverlay";
import { Story } from "../components/Story";
import { Schedule } from "../components/Schedule";
import { Vibe } from "../components/Vibe";
import { WhyWeRun } from "../components/WhyWeRun";

export default function HomePageSr() {
  return (
    <>
      <LoaderAndCursor />
      <MotionOverlay />
      <Header locale="sr" />
      <main id="main">
        <Hero locale="sr" />
        <WhyWeRun locale="sr" />
        <DocumentaryStrip locale="sr" />
        <Schedule locale="sr" />
        <Gallery locale="sr" />
        <Marquee
          tight
          text="ASFALT  ·  KORACI  ·  DISANJE  ·  TEŠKE NOGE  ·  ZNOJ  ·  SEMAFORI  ·  GRADSKA SVETLA  ·  ASFALT  ·  KORACI  ·  DISANJE  ·  TEŠKE NOGE  ·  ZNOJ  ·"
        />
        <Story locale="sr" />
        <Marquee
          tight
          invert
          reverse
          text="RANI STARTOVI  ·  DUGAČKE DEONICE  ·  GLASNA EKIPA  ·  ISTA STAZA  ·  DRUGAČIJI DAN  ·  JOŠ PAR KILOMETARA  ·  SUNCE I KAFA POSLE TRENINGA  ·  JOŠ JEDAN KRUG?  ·"
        />
        <Vibe locale="sr" />
        <ContactCTA locale="sr" />
      </main>
      <Footer locale="sr" />
    </>
  );
}
