import { faqItems } from "@/lib/faq";
import { FaqAccordion } from "./FaqAccordion";
import { BarbedWire } from "./BarbedWire";

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-white px-6 pb-28 pt-4 sm:px-12">
      <BarbedWire className="opacity-25" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Частые вопросы</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Вопросы
          </h2>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
