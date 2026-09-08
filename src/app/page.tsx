import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { CasinoLogos } from "@/components/CasinoLogos";
import { BentoStats } from "@/components/BentoStats";
import { Services } from "@/components/Services";
import { StreamersPreview } from "@/components/StreamersPreview";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <CasinoLogos />
      <BentoStats />
      <Services />
      <StreamersPreview />
      <CtaBand />
    </>
  );
}
