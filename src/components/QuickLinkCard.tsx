import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type QuickLinkData = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  iconImg?: string;
  iconImgAlt?: string;
  badge?: string;
  theme: {
    accent: string;
    ring: string;
    iconBg: string;
    iconText: string;
    pill: string;
    pillText: string;
    arrowHoverBg: string;
    arrowHoverText: string;
  };
};

type Props = {
  data: QuickLinkData;
  index: number;
};

export default function QuickLinkCard({ data, index }: Props) {
  const Icon = data.icon;
  const baseDelay = 560;
  const stepDelay = 110;
  const delay = baseDelay + index * stepDelay;

  const isDisabled = data.href === "#";

  return (
    <a
      href={data.href}
      target={isDisabled ? undefined : "_blank"}
      rel={isDisabled ? undefined : "noopener noreferrer"}
      aria-disabled={isDisabled || undefined}
      onClick={isDisabled ? (e) => e.preventDefault() : undefined}
      className={`group relative block w-full rounded-3xl glass-card ${data.theme.ring} p-6 sm:p-7 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 ${data.theme.accent} animate-fade-up opacity-0 ${isDisabled ? "pointer-events-none" : ""}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
      aria-label={`Open ${data.title} in a new tab`}
    >
      <div
        className={`pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full ${data.theme.iconBg} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${data.theme.iconBg} ${data.theme.iconText} shadow-lg ring-1 ring-white/80`}
          aria-hidden="true"
        >
          {data.iconImg ? (
            <img
              src={data.iconImg}
              alt={data.iconImgAlt ?? data.title}
              className="h-[92%] w-[92%] object-contain"
              draggable={false}
            />
          ) : Icon ? (
            <Icon className="h-7 w-7" strokeWidth={2} />
          ) : null}
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white border border-white shadow-md text-ink-400 transition-all duration-400 group-hover:rotate-45 group-hover:shadow-lg ${data.theme.arrowHoverBg} ${data.theme.arrowHoverText}`}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-bold tracking-tight text-ink-950">
            {data.title}
          </h3>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${data.theme.pill} ${data.theme.pillText} ring-1 ring-white/60`}
          >
            {data.badge ?? "Open"}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {data.description}
        </p>
      </div>

      <div className="relative mt-6 flex items-center justify-between text-xs font-semibold text-ink-400">
        <span className="truncate max-w-[70%]">
          {data.href === "#" ? "URL to be provided" : stripProtocol(data.href)}
        </span>
        <span
          className={`inline-flex items-center gap-1 ${data.theme.iconText} transition-transform duration-400 group-hover:translate-x-1`}
        >
          Visit
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </div>
    </a>
  );
}

function stripProtocol(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + (u.pathname && u.pathname !== "/" ? u.pathname : "");
  } catch {
    return url;
  }
}
