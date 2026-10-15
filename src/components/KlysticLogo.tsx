type Props = {
  className?: string;
};

export default function KlysticLogo({ className }: Props) {
  return (
    <div className={`flex items-end gap-3 sm:gap-4 md:gap-5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 196 200"
        className="relative h-[62px] w-auto sm:h-[76px] md:h-[84px] lg:h-[92px] flex-shrink-0 drop-shadow-[0_3px_10px_rgba(11,70,200,0.18)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ribbonBlue2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#26d4ff" />
            <stop offset="40%" stopColor="#0d9fff" />
            <stop offset="100%" stopColor="#0b46c8" />
          </linearGradient>
          <linearGradient id="ribbonWarm2" x1="0.05" y1="0" x2="0.95" y2="1">
            <stop offset="0%" stopColor="#ffd13a" />
            <stop offset="32%" stopColor="#ff802e" />
            <stop offset="65%" stopColor="#ff3667" />
            <stop offset="100%" stopColor="#9d00ff" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 8)">
          <rect x="44" y="4" width="9" height="9" rx="2" fill="#22d3ff" opacity="0.95" />
          <rect x="22" y="14" width="7" height="7" rx="1.4" fill="#0b46c8" opacity="0.95" />
          <rect x="-2" y="48" width="5.5" height="5.5" rx="1.1" fill="#22d3ff" opacity="0.85" />
          <rect x="14" y="38" width="7.5" height="7.5" rx="1.4" fill="#0d9fff" opacity="0.95" />
          <rect x="34" y="32" width="11" height="11" rx="2.2" fill="#0b46c8" opacity="0.95" />
          <rect x="18" y="62" width="8.5" height="8.5" rx="1.7" fill="#5b5cff" opacity="0.95" />
          <rect x="0" y="78" width="7.5" height="7.5" rx="1.4" fill="#7c3dff" opacity="0.95" />
          <rect x="44" y="64" width="13" height="13" rx="2.6" fill="#22d3ff" opacity="0.95" />
          <rect x="62" y="94" width="9.5" height="9.5" rx="1.9" fill="#0d9fff" opacity="0.85" />
          <rect x="38" y="100" width="9.5" height="9.5" rx="1.9" fill="#7c3dff" opacity="0.9" />
          <rect x="18" y="102" width="7.5" height="7.5" rx="1.4" fill="#b13aff" opacity="0.85" />
          <rect x="-8" y="114" width="6.5" height="6.5" rx="1.3" fill="#b13aff" opacity="0.9" />
          <rect x="52" y="116" width="6.5" height="6.5" rx="1.3" fill="#ff2e63" opacity="0.92" />
          <rect x="8" y="128" width="6.5" height="6.5" rx="1.3" fill="#ff3ea5" opacity="0.92" />
          <rect x="34" y="138" width="6.5" height="6.5" rx="1.3" fill="#ff2e63" opacity="0.9" />
        </g>

        <g transform="translate(78, 6)">
          <path
            d="M44,4 C74,4 92,22 92,50 L92,84 C92,104 86,122 74,136 L22,188 C-4,162 -10,130 -2,100 L-2,68 C-2,40 16,18 44,4 Z"
            fill="url(#ribbonBlue2)"
            opacity="0.99"
          />
          <path
            d="M-6,102 C-6,82 2,62 20,40 L38,20 C34,20 28,22 24,26 C8,38 -2,64 -2,92 L-2,108 C-2,126 6,140 20,152 L8,150 C-2,140 -6,128 -6,112 Z"
            fill="#071233"
            opacity="0.14"
          />
          <path
            d="M28,4 C28,4 52,50 68,72 C82,92 92,110 92,128 C92,152 80,170 58,170 C40,170 28,160 18,146 L58,106 C70,90 76,78 76,64 C76,46 60,24 28,4 Z"
            fill="url(#ribbonWarm2)"
            opacity="0.99"
          />
          <path
            d="M28,4 C28,4 52,50 68,72 C82,92 92,110 92,128 C92,152 80,170 58,170 C40,170 28,160 18,146 L28,136 C40,148 50,154 58,154 C76,154 82,142 82,126 C82,114 74,98 58,78 C40,52 28,32 22,20 C22,12 24,8 28,4 Z"
            fill="#000000"
            opacity="0.07"
          />
        </g>
      </svg>

      <div className="flex flex-col items-start leading-none gap-[10px] sm:gap-3 md:gap-[14px]">
        <div className="relative flex items-baseline font-display font-extrabold tracking-[-0.02em] text-ink-950 select-none">
          <span className="relative inline-block text-[44px] sm:text-[56px] md:text-[62px] lg:text-[68px] leading-none">
            K
            <span
              className="pointer-events-none absolute left-[26%] top-[38%] block w-[34%] h-[46%] skew-x-[-14deg]"
              style={{
                background:
                  "linear-gradient(135deg,#26d4ff 0%,#7c3dff 55%,#ff2ec2 100%)",
              }}
              aria-hidden="true"
            />
          </span>
          <span className="text-[44px] sm:text-[56px] md:text-[62px] lg:text-[68px] leading-none tracking-tight">
            lyst
          </span>
          <span className="relative inline-block text-[44px] sm:text-[56px] md:text-[62px] lg:text-[68px] leading-none">
            i
            <span
              className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 h-[16%] w-[74%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #ffd066 0%, #ff7034 45%, #ff1f82 100%)",
                boxShadow: "0 0 22px rgba(255, 60, 120, 0.35)",
              }}
              aria-hidden="true"
            />
          </span>
          <span className="text-[44px] sm:text-[56px] md:text-[62px] lg:text-[68px] leading-none">
            c
          </span>
        </div>

        <div
          className="font-display font-bold uppercase text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.22em]"
          aria-hidden="false"
        >
          <span
            className="bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0d9fff 0%, #5b5cff 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ADVANCED&nbsp;WEB
          </span>
          &nbsp;
          <span
            className="bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #7c3dff 0%, #b13aff 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            SOLUTIONS
          </span>
          <span className="mx-1 text-ink-900/40">.</span>
          <span
            className="bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff3ea5 0%, #ff2e63 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            SOFTWARE
          </span>
          <span className="mx-1 text-ink-900/40">.</span>
          <span
            className="bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff2e63 0%, #ff802e 55%, #ffb020 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            SAAS
          </span>
          <span className="ml-1 text-ink-900/40">.</span>
        </div>
      </div>
    </div>
  );
}
