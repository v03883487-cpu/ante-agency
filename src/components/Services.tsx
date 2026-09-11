"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "@/components/Icon";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  return (
    <section id="services" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Что мы делаем</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Полный цикл
            </h2>
          </div>
          <a href="#contact" className="group flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-60">
            Обсудить
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="max-w-3xl border-t border-white/10 pt-8 text-xl leading-relaxed text-zinc-300 sm:text-2xl"
        >
          Находим стримеров под ключ — под любые гео и охваты, договариваемся о форматах и размещении,
          закрываем рекламные ограничения по каждому гео и ведём отчётность по охватам, переходам и
          конверсиям на всём протяжении кампании.
        </motion.p>
      </div>
    </section>
  );
}
