export function LoaderAndCursor() {
  return (
    <>
      <div
        id="page-loader"
        className="page-loader"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading"
      >
        <div className="page-loader__stage">
          <div className="page-loader__ring-wrap">
            <svg
              className="page-loader__svg"
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="intro-ring-path"
                  fill="none"
                  d="M 150,150 m -118,0 a 118,118 0 1,1 236,0 a 118,118 0 1,1 -236,0"
                />
              </defs>
              <text className="page-loader__text">
                <textPath href="#intro-ring-path" startOffset="0%">
                  · 36Soma Runners · 36Soma Runners · 36Soma Runners · 36Soma Runners · 36 SOMA
                  RUNNERS · 36Soma Runners · 36Soma Runners · 36Soma Runners · 36Soma Runners ·
                  36Soma Runners ·
                </textPath>
              </text>
            </svg>
          </div>
          <div className="page-loader__center" aria-hidden="true">
            36
          </div>
        </div>
      </div>

      <div className="cursor" id="cursor" aria-hidden="true" data-cursor>
        <span className="cursor__ring"></span>
        <span className="cursor__dot"></span>
      </div>
    </>
  );
}
