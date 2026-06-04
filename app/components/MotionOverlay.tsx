export function MotionOverlay() {
  return (
    <>
      <div className="run-lane js-run-lane" aria-hidden="true" />
      <div className="hr-line" aria-hidden="true">
        <div className="hr-line__track">
          <div className="hr-line__progress js-hr-progress" />
        </div>
        <span className="hr-line__pulse js-hr-pulse">🐇</span>
      </div>
      <div className="distance-hud js-distance-hud" aria-live="polite">
        <span className="distance-hud__label">DISTANCE</span>
        <span className="distance-hud__value js-distance-value">0.0 KM</span>
        <span className="distance-hud__status js-distance-status">Keep the pace.</span>
        <button className="distance-hud__btn js-distance-reset" type="button">
          New run
        </button>
      </div>
    </>
  );
}
