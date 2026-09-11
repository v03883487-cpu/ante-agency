"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-7 text-left"
            >
              <span className={`font-display text-xl font-semibold sm:text-2xl ${isOpen ? "text-white" : "text-zinc-500"}`}>
                {item.q}
              </span>
              <img
                src={`${basePath}/icons/${isOpen ? "x-circle" : "plus-circle"}.webp`}
                alt=""
                aria-hidden
                className="h-8 w-8 shrink-0"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 text-lg text-zinc-400">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
