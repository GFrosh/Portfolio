/**
 * Static fallback for the hero. No JS, no canvas: an SVG grid + gradient bloom
 * that renders as part of the initial HTML, so LCP never waits on three.js.
 * Also the poster shown under prefers-reduced-motion, saveData and low-end
 * devices.
 */
export function HeroPoster() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(760px 460px at 74% 26%, rgba(34,211,238,0.16), transparent 66%), radial-gradient(620px 420px at 88% 78%, rgba(59,130,246,0.14), transparent 62%)",
        }}
      />
      <svg
        className="absolute right-[-12%] top-[-6%] h-[130%] w-[85%] opacity-[0.5]"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="posterEdges" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <g stroke="url(#posterEdges)" strokeWidth="0.9">
          <circle cx="300" cy="300" r="180" />
          <circle cx="300" cy="300" r="120" />
          <circle cx="300" cy="300" r="60" />
          <path d="M300 90 L480 400 L120 400 Z" />
          <path d="M300 510 L120 200 L480 200 Z" />
          <path d="M120 400 L480 400 M120 200 L480 200 M300 90 L300 510" />
        </g>
        {[
          [300, 90],
          [480, 400],
          [120, 400],
          [300, 510],
          [120, 200],
          [480, 200],
          [480, 300],
          [120, 300],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#7dd3fc" />
        ))}
      </svg>
    </div>
  );
}
