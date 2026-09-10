"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    title: "Подбор стримеров",
    body: "Находим и проверяем gambling-стримеров и инфлюенсеров под гео, аудиторию и бюджет кампании — с реальной статистикой, а не накрученными цифрами.",
  },
  {
    title: "Медиабаинг и интеграции",
    body: "Ведём переговоры, готовим брифы, согласовываем форматы интеграций и запускаем размещения под ключ.",
  },
  {
    title: "Комплаенс и ограничения",
    body: "Знаем рекламные ограничения по гео для gambling/betting и следим, чтобы креативы и посевы им соответствовали.",
  },
  {
    title: "Отчётность и аналитика",
    body: "Трекаем охваты, переходы и конверсии по каждой интеграции, даём прозрачный отчёт по кампании.",
  },
];

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Что мы делаем</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Полный цикл инфлюенс-маркетинга для gambling-брендов
            </h2>
          </div>
          <a href="#contact" className="flex items-center gap-1 text-sm font-medium text-white hover:opacity-60">
            Обсудить кампанию <span aria-hidden>→</span>
          </a>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.title}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-6 py-6 text-left"
                >
                  <span className="font-display text-sm font-bold text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 font-display text-lg font-semibold sm:text-xl ${isOpen ? "text-white" : "text-zinc-500"}`}>
                    {s.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-white"
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
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 pl-11 text-sm leading-relaxed text-zinc-400">{s.body}</p>
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
