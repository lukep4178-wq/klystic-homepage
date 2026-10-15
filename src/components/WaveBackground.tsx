export default function WaveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7faff] to-canvas" />

      <div className="absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full bg-wave-1 opacity-80 animate-float-slow" />
      <div
        className="absolute -bottom-48 -left-32 h-[620px] w-[780px] rounded-[40%] bg-wave-2 opacity-75 animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute -bottom-32 -right-24 h-[520px] w-[580px] rounded-[45%] bg-wave-3 opacity-80 animate-float-slow"
        style={{ animationDelay: "-6s" }}
      />

      <div className="absolute inset-0 dot-texture opacity-90" />
      <div className="absolute inset-0 dot-texture-right opacity-80" />

      <svg
        className="absolute bottom-0 left-0 w-[120%] -translate-x-[10%] opacity-70"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ height: "clamp(220px, 38vw, 420px)" }}
      >
        <defs>
          <linearGradient id="waveBottomA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#5b5cff" stopOpacity="0.28" />
            <stop offset="75%" stopColor="#8a2be2" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ff3ea5" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="waveBottomB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b5cff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#8a2be2" stopOpacity="0.24" />
            <stop offset="75%" stopColor="#ff3ea5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="waveBottomC" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#ff3ea5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveBottomC)"
          d="M0,280 C240,340 360,220 560,260 C760,300 860,400 1080,340 C1260,290 1340,300 1440,320 L1440,420 L0,420 Z"
        />
        <path
          fill="url(#waveBottomB)"
          d="M0,320 C200,280 340,380 560,320 C780,260 900,360 1120,300 C1280,258 1360,340 1440,360 L1440,420 L0,420 Z"
        />
        <path
          fill="url(#waveBottomA)"
          d="M0,370 C220,330 360,410 580,360 C800,310 920,390 1140,340 C1300,302 1380,380 1440,394 L1440,420 L0,420 Z"
        />
      </svg>
    </div>
  );
}
