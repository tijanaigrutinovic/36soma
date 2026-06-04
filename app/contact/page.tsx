import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CLUB_EMAIL, clubMailto } from "../lib/contact";

export default function ContactPage() {
  return (
    <>
      <Header locale="en" />

      <main id="main">
        <section className="section section--cta" style={{ minHeight: "100vh", paddingTop: "8rem" }}>
          <div className="section__inner cta">
            <p className="story__eyebrow">Contact form</p>
            <h1 className="section__heading section__heading--xl">Send us a message</h1>
            <p className="cta__text">
              If it is your first time, send us a message first. We always meet at{" "}
              <strong>City Terrace</strong> in Kraljevo.
            </p>
            <p className="cta__text" style={{ marginTop: "-0.25rem", fontSize: "0.95rem" }}>
              Club address: Tomislava Andrica Dzigija 53, Kraljevo, Raski County, 36000 Serbia.
            </p>
            <p className="cta__text cta__text--email">
              Or email us at{" "}
              <a className="cta__email" href={clubMailto}>
                {CLUB_EMAIL}
              </a>
              .
            </p>

            <ContactForm locale="en" />
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
