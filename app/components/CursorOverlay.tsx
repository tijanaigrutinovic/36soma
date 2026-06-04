export function CursorOverlay() {
  return (
    <div className="cursor" id="cursor" aria-hidden="true" data-cursor>
      <span className="cursor__ring"></span>
      <span className="cursor__dot"></span>
    </div>
  );
}
