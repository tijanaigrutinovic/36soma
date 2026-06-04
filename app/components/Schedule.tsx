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
                <strong>Utorak je rezervisan za probijanje leda i nove ljude.</strong> Ako dolaziš prvi
                put, to je tvoj dan. Javi nam se preko Instagrama, WhatsApp-a ili Strave — pitaj šta god
                ti treba ili samo reci kada možeš da dođeš. Uvek se nalazimo na{" "}
                <strong>Gradskoj terasi</strong> u Kraljevu.
              </p>
            </>
          ) : (
            <>
              <p>
                Most runs start the same way: someone stretching, someone late, someone already asking
                for coffee after. We meet at <strong>City Terrace</strong>, then head out together.
              </p>
              <p>
                <strong>Tuesday is for breaking the ice and meeting new people.</strong> If it&apos;s
                your first time, that&apos;s your day. Reach out on Instagram, WhatsApp, or Strava — ask
                anything, or just tell us when you can come. We always meet at <strong>City Terrace</strong>{" "}
                in Kraljevo.
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
              {isSr ? "večernje trčanje · tvoj prvi dan" : "evening run · your first day"}
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
