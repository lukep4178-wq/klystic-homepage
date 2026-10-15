import { Heart } from "lucide-react";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10 w-full pb-8 pt-4 animate-fade-up opacity-0"
      style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
    >
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/70 px-4 py-5 rounded-2xl bg-white/40 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
            <span className="inline-block h-2 w-2 rounded-full bg-klystic-indigo shadow-[0_0_0_3px_rgba(91,92,255,0.15)]" />
            <span>
              © {year} <span className="font-bold text-ink-800">Klystic</span> —
              Advanced Web Solutions · Software · SaaS
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-ink-500">
            Built with <Heart className="h-3.5 w-3.5 text-klystic-pink" fill="currentColor" /> for the team
          </div>
        </div>
      </div>
    </footer>
  );
}
