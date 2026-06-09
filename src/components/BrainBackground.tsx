type Path = { d: string; delay: number; duration: number };
type Node = { cx: number; cy: number; r: number; delay: number };

const paths: Path[] = [
  { d: "M -50 120 Q 200 50 350 180 T 700 200 T 1100 100", delay: 0, duration: 6 },
  { d: "M -50 700 Q 200 600 400 680 T 800 620 T 1250 700", delay: 1, duration: 7 },
  { d: "M 1250 80 Q 1000 200 850 150 T 500 280 T 100 250", delay: 2, duration: 8 },
  { d: "M 600 -50 Q 580 200 700 380 T 750 700 T 700 850", delay: 0.5, duration: 9 },
  { d: "M 100 0 Q 200 300 350 400 T 200 700 T 300 850", delay: 1.5, duration: 7 },
  { d: "M 1100 -50 Q 950 250 1000 450 T 900 750", delay: 2.5, duration: 8 },
  { d: "M 350 180 Q 400 280 500 320 T 650 380", delay: 0, duration: 5 },
  { d: "M 850 150 Q 800 250 750 320 T 700 380", delay: 1, duration: 5 },
  { d: "M 700 200 Q 650 350 580 450 T 500 600", delay: 3, duration: 6 },
  { d: "M 400 680 Q 500 600 600 580 T 750 500", delay: 2, duration: 6 },
];

const nodes: Node[] = [
  { cx: 350, cy: 180, r: 3, delay: 0 },
  { cx: 700, cy: 200, r: 4, delay: 0.8 },
  { cx: 850, cy: 150, r: 3, delay: 1.6 },
  { cx: 500, cy: 320, r: 3, delay: 0.4 },
  { cx: 750, cy: 320, r: 3, delay: 1.2 },
  { cx: 580, cy: 450, r: 4, delay: 2 },
  { cx: 1000, cy: 450, r: 3, delay: 2.4 },
  { cx: 400, cy: 680, r: 4, delay: 0.2 },
  { cx: 800, cy: 620, r: 3, delay: 1 },
  { cx: 650, cy: 380, r: 4, delay: 2.8 },
  { cx: 200, cy: 700, r: 3, delay: 1.4 },
  { cx: 900, cy: 750, r: 3, delay: 0.6 },
];

export default function BrainBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1200" height="800" fill="url(#bg-glow)" />

        {paths.map((p, i) => (
          <g key={`path-${i}`}>
            <path
              d={p.d}
              fill="none"
              stroke="#10b981"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            <path
              d={p.d}
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="brain-pulse"
              style={{
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          </g>
        ))}

        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 3}
              fill="#10b981"
              className="brain-node-glow"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#34d399"
              className="brain-node-core"
              style={{ animationDelay: `${n.delay}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
