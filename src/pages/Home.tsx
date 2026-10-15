import WaveBackground from "@/components/WaveBackground";
import BrandHeader from "@/components/BrandHeader";
import WelcomeHero from "@/components/WelcomeHero";
import QuickLinkGrid from "@/components/QuickLinkGrid";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <WaveBackground />
      <BrandHeader />
      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col">
          <WelcomeHero />
          <QuickLinkGrid />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
