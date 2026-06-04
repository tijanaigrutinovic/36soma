"use client";

import { useForm, ValidationError } from "@formspree/react";
import { FORMSPREE_FORM_ID } from "../lib/formspree";

type ContactFormProps = {
  locale?: "en" | "sr";
};

export function ContactForm({ locale = "en" }: ContactFormProps) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const isSr = locale === "sr";

  if (state.succeeded) {
    return (
      <p className="contact-form__status contact-form__status--success" role="status">
        {isSr
          ? "Hvala! Poruka je poslata — javljamo se uskoro."
          : "Thanks! Your message was sent — we'll get back to you soon."}
      </p>
    );
  }

  return (
    <form className="contact-form cta__links" onSubmit={handleSubmit} noValidate>
      <input
        className="contact-form__field"
        required
        type="text"
        name="name"
        autoComplete="name"
        placeholder={isSr ? "Ime i prezime" : "Full name"}
        disabled={state.submitting}
      />
      <ValidationError prefix={isSr ? "Ime" : "Name"} field="name" errors={state.errors} className="contact-form__error" />
      <input
        className="contact-form__field"
        required
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        disabled={state.submitting}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} className="contact-form__error" />
      <textarea
        className="contact-form__field contact-form__field--area"
        required
        name="message"
        placeholder={isSr ? "Poruka" : "Message"}
        rows={6}
        disabled={state.submitting}
      />
      <ValidationError
        prefix={isSr ? "Poruka" : "Message"}
        field="message"
        errors={state.errors}
        className="contact-form__error"
      />
      <input type="text" name="_gotcha" className="contact-form__honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn--magnetic" type="submit" disabled={state.submitting}>
        {state.submitting ? (isSr ? "Šaljem…" : "Sending…") : isSr ? "Pošalji" : "Send"}
      </button>
      <ValidationError errors={state.errors} className="contact-form__error contact-form__error--form" />
    </form>
  );
}
