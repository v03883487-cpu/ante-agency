"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/lib/faq";
import { SuitMarks } from "./SuitMarks";

export function FAQ() {
  const [open, setOpen] = useState(0);

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

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className={`font-display text-base font-semibold sm:text-lg ${isOpen ? "text-white" : "text-zinc-400"}`}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-base text-white"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
