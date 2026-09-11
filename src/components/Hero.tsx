"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icon";

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
    <section className="relative flex min-h-[82vh] w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center sm:px-12">
      <div
        aria-hidden
        className="drift-slow pointer-events-none absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="drift-slow-reverse pointer-events-none absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-2), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(244,241,234,0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-[var(--accent)]/50 bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-100 backdrop-blur-md"
        >
          1400+ стримеров для твоего бренда
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-8 font-display text-8xl uppercase leading-none tracking-tight text-white sm:text-[10rem]"
        >
          ANTE<span aria-hidden className="text-[var(--accent)]">.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-xl text-zinc-300 sm:text-2xl">
          Инфлюенс-агентство полного цикла.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="pulse-glow group flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[#0b0c10] transition-opacity hover:opacity-85"
          >
            Запустить кампанию
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#streamers"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Каталог стримеров
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
