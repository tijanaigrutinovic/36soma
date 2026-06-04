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

            <form className="cta__links" style={{ maxWidth: "42rem", width: "100%", gap: "0.85rem" }}>
              <input
                required
                name="name"
                placeholder="Ime i prezime"
                style={{ width: "100%", padding: "0.9rem 1rem", background: "#101010", color: "#f2f2ec", border: "1px solid #3a3a36" }}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                style={{ width: "100%", padding: "0.9rem 1rem", background: "#101010", color: "#f2f2ec", border: "1px solid #3a3a36" }}
              />
              <textarea
                required
                name="message"
                placeholder="Poruka"
                rows={6}
                style={{ width: "100%", padding: "0.9rem 1rem", background: "#101010", color: "#f2f2ec", border: "1px solid #3a3a36" }}
              />
              <button className="btn btn--magnetic" type="submit">
                Pošalji
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer locale="sr" />
    </>
  );
}
