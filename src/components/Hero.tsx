"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
    <section className="relative flex flex-col bg-white px-6 pb-20 pt-16 text-white sm:px-12 sm:pt-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          1400+ инфлюенсеров уже в базе Ante
        </motion.span>

        <motion.div variants={item} className="relative mt-8 w-full max-w-2xl rounded-3xl bg-[#ffffff] p-6 sm:p-10">
          <Image
            src={`${basePath}/brand/ante-wordmark.webp`}
            alt="Ante — influence agency for gambling"
            width={1600}
            height={1132}
            priority
            className="w-full"
          />
        </motion.div>

        <motion.p variants={item} className="mt-8 max-w-xl text-lg text-zinc-400">
          Ante связывает casino и betting-бренды с проверенными gambling-стримерами и инфлюенсерами — от
          подбора креаторов до запуска кампании и отчётности.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 rounded-full bg-[#ffffff] px-7 py-3 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-80"
          >
            Запустить кампанию
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/streamers"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Каталог стримеров
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
