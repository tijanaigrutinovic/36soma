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

            <form className="cta__links" style={{ maxWidth: "42rem", width: "100%", gap: "0.85rem" }}>
              <input
                required
                name="name"
                placeholder="Full name"
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
                placeholder="Message"
                rows={6}
                style={{ width: "100%", padding: "0.9rem 1rem", background: "#101010", color: "#f2f2ec", border: "1px solid #3a3a36" }}
              />
              <button className="btn btn--magnetic" type="submit">
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
