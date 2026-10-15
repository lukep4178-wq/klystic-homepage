import { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import CalendarPopover from "./CalendarPopover";
import { useMeetingsStore, toDateKey } from "@/store/useMeetingsStore";

function useNow() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function greeting(hour: number): { text: string; accent: string } {
  if (hour < 5) return { text: "Burning the midnight oil", accent: "text-klystic-purple" };
  if (hour < 12) return { text: "Good morning", accent: "text-klystic-blue" };
  if (hour < 17) return { text: "Good afternoon", accent: "text-klystic-orange" };
  if (hour < 21) return { text: "Good evening", accent: "text-klystic-pink" };
  return { text: "Good night", accent: "text-klystic-indigo" };
}

export default function WelcomeHero() {
  const now = useNow();
  const greet = greeting(now.getHours());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateTriggerRef = useRef<HTMLButtonElement | null>(null);
  const todayKey = toDateKey(now);
  const todayCount = useMeetingsStore(
    (s) => s.meetings[todayKey]?.length ?? 0,
  );

  return (
    <section className="relative z-10 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10">
      <div className="container max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-glow-soft animate-fade-up opacity-0"
          style={{ animationDelay: "180ms", animationFillMode: "forwards" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-klystic-green opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-klystic-green" />
          </span>
          Klystic Intranet <span className="text-ink-400">·</span> Systems online
        </div>

        <h1
          className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-ink-950 animate-fade-up opacity-0"
          style={{ animationDelay: "280ms", animationFillMode: "forwards" }}
        >
          <span className={`${greet.accent}`}>{greet.text}</span>
          <br className="hidden sm:block" />
          <span className="inline-flex items-baseline gap-3">
            Welcome to{" "}
            <span className="text-brand-gradient">Klystic</span>
            <Sparkles className="inline-block h-6 w-6 md:h-8 md:w-8 text-klystic-orange -translate-y-1" strokeWidth={2.2} />
          </span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-ink-500 animate-fade-up opacity-0"
          style={{ animationDelay: "380ms", animationFillMode: "forwards" }}
        >
          Your daily launchpad. Jump straight into search, inbox, and the tools
          your team relies on — all from one beautifully organized space.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up opacity-0"
          style={{ animationDelay: "480ms", animationFillMode: "forwards" }}
        >
          <button
            ref={dateTriggerRef}
            type="button"
            onClick={() => setCalendarOpen((o) => !o)}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white/70 border border-white px-4 py-2 text-sm font-medium text-ink-800 shadow-glow-soft backdrop-blur hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-klystic-indigo/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative">
              <CalendarDays className="h-4 w-4 text-klystic-indigo group-hover:scale-110 transition-transform" strokeWidth={2} />
              {todayCount > 0 ? (
                <span className="absolute -top-1.5 -right-2 h-4 min-w-[16px] inline-flex items-center justify-center rounded-full bg-brand-gradient text-white text-[9px] font-bold px-1 ring-2 ring-white">
                  {todayCount}
                </span>
              ) : null}
            </span>
            <span className="truncate">{formatDay(now)}</span>
            <span className="ml-0.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold text-klystic-indigo bg-klystic-indigo/10 ring-1 ring-klystic-indigo/20">
              Open
            </span>
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white px-4 py-2 text-sm font-medium text-ink-800 shadow-glow-soft backdrop-blur">
            <Clock3 className="h-4 w-4 text-klystic-pink" strokeWidth={2} />
            <span className="tabular-nums">{formatTime(now)}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow">
            <Sparkles className="h-4 w-4" strokeWidth={2.1} />
            Let&apos;s build something great today
          </span>
        </div>
      </div>

      <CalendarPopover
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        anchorRef={dateTriggerRef as React.RefObject<HTMLElement>}
        initialDate={now}
      />
    </section>
  );
}
