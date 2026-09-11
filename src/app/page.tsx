import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { BentoStats } from "@/components/BentoStats";
import { Services } from "@/components/Services";
import { StreamersPreview } from "@/components/StreamersPreview";
import { GeoSection } from "@/components/GeoSection";
import { CasesSection } from "@/components/CasesSection";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";
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
      <BentoStats />
      <Services />
      <StreamersPreview />
      <GeoSection />
      <CasesSection />
      <FAQ />
      <ContactSection />
      <CtaBand />
    </>
  );
}
