export function MiniChart() {
  return (
    <svg
      viewBox="0 0 520 180"
      className="h-[180px] w-full"
      role="img"
      aria-label="Mock performance chart"
    >
      <defs>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
        </linearGradient>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
      </defs>

      {/* grid */}
      <g opacity="0.55">
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={40}
            x2={500}
            y1={22 + i * 22}
            y2={22 + i * 22}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* area */}
      <path
        d="M40 145
           C 90 138, 120 110, 160 116
           C 210 124, 240 88, 290 92
           C 340 96, 360 58, 410 62
           C 455 66, 475 42, 500 38
           L 500 170
           L 40 170 Z"
        fill="url(#fill)"
      />

      {/* line */}
      <path
        d="M40 145
           C 90 138, 120 110, 160 116
           C 210 124, 240 88, 290 92
           C 340 96, 360 58, 410 62
           C 455 66, 475 42, 500 38"
        fill="none"
        stroke="url(#stroke)"
        strokeWidth="2.25"
      />

      {/* points */}
      {[
        [40, 145],
        [160, 116],
        [290, 92],
        [410, 62],
        [500, 38],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill="rgba(255,255,255,0.9)" />
      ))}
    </svg>
  );
}

