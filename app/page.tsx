import { Footer } from "./components/Footer";
import { DocumentaryStrip } from "./components/DocumentaryStrip";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ContactCTA } from "./components/ContactCTA";
import { LoaderAndCursor } from "./components/LoaderAndCursor";
import { Marquee } from "./components/Marquee";
import { MotionOverlay } from "./components/MotionOverlay";
import { Story } from "./components/Story";
import { Schedule } from "./components/Schedule";
import { Vibe } from "./components/Vibe";
import { WhyWeRun } from "./components/WhyWeRun";

export default function HomePage() {
  return (
    <>
      <LoaderAndCursor />
      <MotionOverlay />
      <Header locale="en" />
      <main id="main">
        <Hero locale="en" />
        <WhyWeRun locale="en" />
        <DocumentaryStrip locale="en" />
        <Schedule locale="en" />
        <Gallery locale="en" />
        <Marquee
          tight
          text="ASPHALT  ·  FOOTSTEPS  ·  BREATHING  ·  HEAVY LEGS  ·  SWEAT  ·  TRAFFIC LIGHTS  ·  CITY LIGHTS  ·  ASPHALT  ·  FOOTSTEPS  ·  BREATHING  ·  HEAVY LEGS  ·  SWEAT  ·  TRAFFIC LIGHTS  ·  CITY LIGHTS  ·"
        />
        <Story locale="en" />
        <Marquee
          tight
          invert
          reverse
          text="EARLY STARTS  ·  LONG RUNS  ·  LOUD CREW  ·  SAME TRACK  ·  DIFFERENT DAY  ·  A FEW MORE KILOMETERS  ·  SUNRISE AND POST-RUN COFFEE  ·  ONE MORE LAP?  ·"
        />
        <Vibe locale="en" />
        <ContactCTA locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
