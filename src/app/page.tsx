import { Hero } from "@/components/Hero";
import { BentoStats } from "@/components/BentoStats";
import { Services } from "@/components/Services";
import { LogoShowcase } from "@/components/LogoShowcase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoStats />
      <Services />
      <LogoShowcase />
      <Footer />
    </>
  );
}
