import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { CasinoLogos } from "@/components/CasinoLogos";
import { BentoStats } from "@/components/BentoStats";
import { Services } from "@/components/Services";
import { StreamersPreview } from "@/components/StreamersPreview";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { faqItems } from "@/lib/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <TrustBand />
      <CasinoLogos limit={12} />
      <BentoStats />
      <Services />
      <StreamersPreview />
      <FAQ />
      <CtaBand />
    </>
  );
}
