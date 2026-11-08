export function StaticGraph() {
  return (
    <svg
      className="hero-poster h-full min-h-[280px] w-full"
      viewBox="0 0 400 240"
      role="img"
      aria-label="Abstract network topology"
    >
      <rect width="400" height="240" className="fill-[var(--cp-void)]" />
      {[...Array(12)].map((_, i) => {
        const x = 40 + (i % 4) * 90;
        const y = 40 + Math.floor(i / 4) * 70;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" className="fill-[var(--cp-accent)]" />
            {i < 11 && (
              <line
                x1={x}
                y1={y}
                x2={x + 50}
                y2={y + (i % 2 === 0 ? 30 : -20)}
                className="stroke-[var(--cp-accent-muted)]"
                strokeOpacity="0.55"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
