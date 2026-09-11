import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { BentoStats } from "@/components/BentoStats";
import { Services } from "@/components/Services";
import { StreamersPreview } from "@/components/StreamersPreview";
import { GeoSection } from "@/components/GeoSection";
import { CasesSection } from "@/components/CasesSection";
import { ContactSection } from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <BentoStats />
      <Services />
      <StreamersPreview />
      <GeoSection />
      <CasesSection />
      <ContactSection />
      <CtaBand />
    </>
  );
}
