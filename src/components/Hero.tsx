"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { basePath } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={`${basePath}/hero/ante-hero-poster.jpg`}
        className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-125"
      >
        <source src={`${basePath}/hero/ante-hero.mp4`} type="video/mp4" />
        <source src={`${basePath}/hero/ante-hero.webm`} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-end px-6 pb-14 text-center sm:px-12 sm:pb-20"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-[var(--accent)]/60 bg-black/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          1400+ инфлюенсеров уже в базе Ante
        </motion.span>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-zinc-300">
          Ante связывает casino и betting-бренды с проверенными gambling-стримерами и инфлюенсерами — от
          подбора креаторов до запуска кампании и отчётности.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Запустить кампанию
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/streamers"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Каталог стримеров
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
