type MarqueeProps = {
  invert?: boolean;
  reverse?: boolean;
  text: string;
  tight?: boolean;
};

export function Marquee({ invert = false, reverse = false, text, tight = false }: MarqueeProps) {
  const cls = `marquee ${invert ? "marquee--invert" : "marquee--dark"} ${tight ? "marquee--tight" : ""} ${reverse ? "js-marquee-rev" : "js-marquee"}`;
  const trackCls = `marquee__track ${reverse ? "marquee__track--rev" : ""}`.trim();

  return (
    <div className={cls} aria-hidden="true">
      <div className={trackCls}>
        <div className="marquee__chunk">{text}</div>
        <div className="marquee__chunk">{text}</div>
      </div>
    </div>
  );
}
