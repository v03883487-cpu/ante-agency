"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  { title: "Подбор стримеров", body: "Найдём стримеров под ключ, любые гео и охваты." },
  { title: "Медиабаинг", body: "Брифы, форматы, размещение под ключ." },
  { title: "Комплаенс", body: "Рекламные ограничения по гео закрыты." },
  { title: "Отчётность", body: "Охваты, переходы, конверсии — адаптируемся под любую необходимую отчётность." },
];

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Что мы делаем</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Полный цикл
            </h2>
          </div>
          <a href="#contact" className="group flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-60">
            Обсудить
            <img src={`${basePath}/icons/arrow-right.webp`} alt="" aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.title}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-6 py-8 text-left"
                >
                  <span className="font-display text-lg font-bold text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 font-display text-2xl font-semibold sm:text-3xl ${isOpen ? "text-white" : "text-zinc-500"}`}>
                    {s.title}
                  </span>
                  <img
                    src={`${basePath}/icons/${isOpen ? "x-circle" : "plus-circle"}.webp`}
                    alt=""
                    aria-hidden
                    className="h-9 w-9 shrink-0"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-8 pl-14 text-lg text-zinc-400">{s.body}</p>
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
