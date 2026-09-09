import { faqItems } from "@/lib/faq";
import { SuitMarks } from "./SuitMarks";
import { FaqAccordion } from "./FaqAccordion";

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-[#0A0B0E] px-6 pb-28 sm:px-12">
      <SuitMarks />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F4C95D]">Частые вопросы</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Всё, что нужно знать перед запуском
          </h2>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
