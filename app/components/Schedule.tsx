import { sectionId } from "../lib/sections";

type ScheduleProps = {
  locale?: "en" | "sr";
};

export function Schedule({ locale = "en" }: ScheduleProps) {
  const isSr = locale === "sr";
  const loc = isSr ? "sr" : "en";
  return (
    <section
      id={sectionId(loc, "training")}
      className="section section--schedule"
      aria-labelledby={`${sectionId(loc, "training")}-title`}
    >
      <div className="section__inner section--schedule__inner">
        <p className="story__eyebrow js-termini-eyebrow">{isSr ? "Treninzi" : "Training"}</p>
        <h2
          id={`${sectionId(loc, "training")}-title`}
          className="section__heading section__heading--xl js-section-title"
        >
          {isSr ? "Kada i gde treniramo" : "When and where we train"}
        </h2>
        <div className="schedule__intro js-schedule-intro">
          {isSr ? (
            <>
              <p>
                Većina treninga počinje isto: neko se isteže, neko kasni, neko već pita gde pijemo kafu
                posle. Okupljamo se na <strong>Gradskoj terasi</strong>, pa zajedno krećemo na rutu.
              </p>
              <p>
                <strong>Utorkom je prijem novih članova.</strong> Javi nam se preko Instagrama,
                WhatsApp-a ili Strave. Pitaj šta god ti treba ili nam samo reci kada možeš da dođeš
                prvi put. Uvek se nalazimo na <strong>Gradskoj terasi</strong> u Kraljevu.
              </p>
            </>
          ) : (
            <>
              <p>
                Most runs start the same way: someone stretching, someone late, someone already asking
                for coffee after. We meet at <strong>City Terrace</strong>, then head out together.
              </p>
              <p>
                <strong>Tuesdays are when we welcome new members.</strong> Reach out on Instagram,
                WhatsApp, or Strava — ask anything, or just tell us when you can come for your first
                session. We always meet at <strong>City Terrace</strong> in Kraljevo.
              </p>
            </>
          )}
        </div>
        <div className="schedule__grid">
          <article className="schedule__card js-schedule-card">
            <div className="schedule__card-head">
              <span className="schedule__card-day">{isSr ? "Utorak" : "Tuesday"}</span>
              <span className="schedule__card-type">{isSr ? "Veče" : "Evening"}</span>
            </div>
            <span className="schedule__card-time">20:00</span>
            <span className="schedule__card-note">
              {isSr ? "večernje trčanje · prijem novih članova" : "evening run · new members welcome"}
            </span>
            <span className="schedule__card-meta">{isSr ? "Gradska terasa" : "City Terrace"}</span>
          </article>
          <article className="schedule__card js-schedule-card">
            <div className="schedule__card-head">
              <span className="schedule__card-day">{isSr ? "Četvrtak" : "Thursday"}</span>
              <span className="schedule__card-type">{isSr ? "Veče" : "Evening"}</span>
            </div>
            <span className="schedule__card-time">20:00</span>
            <span className="schedule__card-note">{isSr ? "večernje trčanje" : "evening run"}</span>
            <span className="schedule__card-meta">{isSr ? "Gradska terasa" : "City Terrace"}</span>
          </article>
          <article className="schedule__card js-schedule-card">
            <div className="schedule__card-head">
              <span className="schedule__card-day">{isSr ? "Nedelja" : "Sunday"}</span>
              <span className="schedule__card-type">{isSr ? "Jutro" : "Morning"}</span>
            </div>
            <span className="schedule__card-time">07:00</span>
            <span className="schedule__card-note">{isSr ? "jutarnje trčanje" : "morning run"}</span>
            <span className="schedule__card-meta">{isSr ? "Gradska terasa" : "City Terrace"}</span>
          </article>
        </div>
      </div>
    </section>
  );
}
