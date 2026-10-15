import { Globe, Mail, ClipboardList } from "lucide-react";
import QuickLinkCard, { type QuickLinkData } from "./QuickLinkCard";

const LINKS: QuickLinkData[] = [
  {
    id: "google",
    title: "Google",
    description:
      "Search the web, find docs, and jump straight into the Google ecosystem.",
    href: "https://www.google.com",
    icon: Globe,
    theme: {
      accent: "focus-visible:ring-klystic-orange/40",
      ring: "card-ring-google",
      iconBg:
        "bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05]",
      iconText: "text-white",
      pill: "bg-[#EA4335]/10",
      pillText: "text-[#c5221f]",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-[#4285F4] group-hover:via-[#EA4335] group-hover:to-[#FBBC05]",
      arrowHoverText: "group-hover:text-white",
    },
  },
  {
    id: "webmail",
    title: "Webmail",
    description:
      "Check your inbox, manage conversations, and stay on top of messages.",
    href: "https://sv51.byethost51.org:2096/cpsess2166909244/webmail/jupiter/index.html?mailclient=none",
    icon: Mail,
    theme: {
      accent: "focus-visible:ring-klystic-blue/40",
      ring: "card-ring-webmail",
      iconBg:
        "bg-gradient-to-br from-klystic-blue via-klystic-indigo to-[#7b9dff]",
      iconText: "text-white",
      pill: "bg-klystic-blue/10",
      pillText: "text-klystic-blue",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-klystic-blue group-hover:via-klystic-indigo group-hover:to-[#7b9dff]",
      arrowHoverText: "group-hover:text-white",
    },
  },
  {
    id: "keplerio",
    title: "Keplerio",
    description:
      "Head over to keplerio.com for analytics, dashboards, and project intelligence.",
    href: "https://keplerio.com",
    iconImg: "/Keplerio-simple.png",
    iconImgAlt: "Keplerio",
    theme: {
      accent: "focus-visible:ring-klystic-purple/40",
      ring: "card-ring-keplerio",
      iconBg: "bg-white",
      iconText: "text-klystic-purple",
      pill: "bg-klystic-purple/10",
      pillText: "text-klystic-purple",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-klystic-indigo group-hover:via-klystic-purple group-hover:to-klystic-pink",
      arrowHoverText: "group-hover:text-white",
    },
  },
  {
    id: "tarklen",
    title: "Tarklen",
    description:
      "Project & operations, planning & coordination — all in one on tarklen.com.",
    href: "https://tarklen.com/",
    iconImg: "/Tarklen-logo.png",
    iconImgAlt: "Tarklen",
    theme: {
      accent: "focus-visible:ring-klystic-orange/40",
      ring: "card-ring-knoten",
      iconBg: "bg-white",
      iconText: "text-klystic-orange",
      pill: "bg-klystic-orange/10",
      pillText: "text-klystic-orange",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-klystic-orange group-hover:via-klystic-pink group-hover:to-klystic-purple",
      arrowHoverText: "group-hover:text-white",
    },
  },
];

const UAT_LINKS: QuickLinkData[] = [
  {
    id: "keplerio-uat",
    title: "Keplerio UAT",
    description:
      "User Acceptance Testing for Keplerio — validate analytics, dashboards, and intelligence features before production rollout.",
    href: "https://uat-keplerio.au/",
    iconImg: "/Keplerio-simple.png",
    iconImgAlt: "Keplerio",
    badge: "UAT",
    theme: {
      accent: "focus-visible:ring-klystic-purple/40",
      ring: "card-ring-keplerio",
      iconBg: "bg-white",
      iconText: "text-klystic-purple",
      pill: "bg-klystic-purple/10",
      pillText: "text-klystic-purple",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-klystic-indigo group-hover:via-klystic-purple group-hover:to-klystic-pink",
      arrowHoverText: "group-hover:text-white",
    },
  },
  {
    id: "tarklen-uat",
    title: "Tarklen UAT",
    description:
      "User Acceptance Testing for Tarklen — verify project & operations planning, coordination, and workflow updates pre-release.",
    href: "https://knotenplanner.com/",
    iconImg: "/Tarklen-logo.png",
    iconImgAlt: "Tarklen",
    badge: "UAT",
    theme: {
      accent: "focus-visible:ring-klystic-orange/40",
      ring: "card-ring-knoten",
      iconBg: "bg-white",
      iconText: "text-klystic-orange",
      pill: "bg-klystic-orange/10",
      pillText: "text-klystic-orange",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-klystic-orange group-hover:via-klystic-pink group-hover:to-klystic-purple",
      arrowHoverText: "group-hover:text-white",
    },
  },
  {
    id: "testcases",
    title: "Test Cases",
    description:
      "Regression & UAT test suites, runbooks, coverage reports, and script execution portal.",
    href: "https://uatscripts-klystic.au/login",
    icon: ClipboardList,
    theme: {
      accent: "focus-visible:ring-klystic-teal/40",
      ring: "card-ring-knoten",
      iconBg:
        "bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500",
      iconText: "text-white",
      pill: "bg-cyan-500/10",
      pillText: "text-cyan-700",
      arrowHoverBg:
        "group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:via-sky-500 group-hover:to-indigo-500",
      arrowHoverText: "group-hover:text-white",
    },
  },
];

export default function QuickLinkGrid() {
  return (
    <div className="relative z-10 w-full">
      <section className="w-full pb-14 md:pb-16">
        <div className="container max-w-5xl">
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-950">
                Your quick links
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                Click a tile to open in a new tab.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1 rounded-full bg-white/70 border border-white px-1.5 py-1.5 text-xs font-semibold text-ink-500 backdrop-blur">
              {LINKS.map((l, i) => (
                <span
                  key={l.id}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i === 0
                          ? "#EA4335"
                          : i === 1
                          ? "#1e90ff"
                          : i === 2
                          ? "#8a2be2"
                          : "#f97316",
                    }}
                  />
                  {l.title}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {LINKS.map((link, i) => (
              <QuickLinkCard key={link.id} data={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-24">
        <div className="container max-w-5xl">
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-amber-700 ring-1 ring-white/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                Testing
              </div>
              <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-950">
                UAT &amp; Test Cases
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                Product staging environments and test documentation — validate releases before they ship to production.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1 rounded-full bg-white/70 border border-white px-1.5 py-1.5 text-xs font-semibold text-ink-500 backdrop-blur">
              {UAT_LINKS.map((l, i) => (
                <span
                  key={l.id}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i === 0
                          ? "#8a2be2"
                          : i === 1
                          ? "#f97316"
                          : "#0891b2",
                    }}
                  />
                  {l.title}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {UAT_LINKS.map((link, i) => (
              <QuickLinkCard
                key={link.id}
                data={link}
                index={LINKS.length + i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
