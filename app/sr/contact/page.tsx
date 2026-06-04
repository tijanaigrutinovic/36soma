import { ContactForm } from "../../components/ContactForm";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { CLUB_EMAIL, clubMailto } from "../../lib/contact";

export default function ContactPageSr() {
  return (
    <>
      <Header locale="sr" />

      <main id="main">
        <section className="section section--cta" style={{ minHeight: "100vh", paddingTop: "8rem" }}>
          <div className="section__inner cta">
            <p className="story__eyebrow">Kontakt forma</p>
            <h1 className="section__heading section__heading--xl">Pošalji nam poruku</h1>
            <p className="cta__text">
              Ako dolaziš prvi put, javi se porukom. Uvek se nalazimo na{" "}
              <strong>Gradskoj terasi</strong> u Kraljevu.
            </p>
            <p className="cta__text" style={{ marginTop: "-0.25rem", fontSize: "0.95rem" }}>
              Adresa kluba: Tomislava Andrica Dzigija 53, Kraljevo, Raski okrug, 36000 Srbija.
            </p>
            <p className="cta__text cta__text--email">
              Ili nam piši na{" "}
              <a className="cta__email" href={clubMailto}>
                {CLUB_EMAIL}
              </a>
              .
            </p>

            <ContactForm locale="sr" />
          </div>
        </section>
      </main>
      <Footer locale="sr" />
    </>
  );
}
