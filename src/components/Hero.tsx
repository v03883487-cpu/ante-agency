"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { AnimatedLogo } from "./AnimatedLogo";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const avatarColors = ["#F4C95D", "#E28B2F", "#22C55E", "#6366F1"];

export function Hero() {
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const blobC = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobA.current, { x: 60, y: -40, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(blobB.current, { x: -50, y: 50, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(blobC.current, { x: 30, y: 30, scale: 1.1, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0A0B0E] text-zinc-50">
      <div ref={blobA} className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#E28B2F]/30 blur-[110px]" />
      <div ref={blobB} className="pointer-events-none absolute -right-32 top-1/3 h-[460px] w-[460px] rounded-full bg-[#22C55E]/20 blur-[120px]" />
      <div ref={blobC} className="pointer-events-none absolute bottom-[-160px] left-1/3 h-[380px] w-[380px] rounded-full bg-[#F4C95D]/20 blur-[110px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <AnimatedLogo size="sm" />
        <div className="hidden items-center gap-8 text-sm text-zinc-300 sm:flex">
          <a href="#services" className="transition-colors hover:text-white">Услуги</a>
          <a href="#streamers" className="transition-colors hover:text-white">Стримеры</a>
          <a href="#cases" className="transition-colors hover:text-white">Кейсы</a>
        </div>
        <a
          href="#contact"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Связаться
        </a>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4"
          >
            <div className="flex -space-x-2">
              {avatarColors.map((c, i) => (
                <span
                  key={c}
                  className="h-6 w-6 rounded-full border-2 border-[#0A0B0E]"
                  style={{ background: c, zIndex: avatarColors.length - i }}
                />
              ))}
            </div>
            <span className="text-xs text-zinc-300">
              <span className="font-semibold text-white">40+ стримеров</span> уже работают с Ante
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Превращаем время в эфире{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] bg-clip-text text-transparent">
                в реальные ставки
              </span>
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full text-[#F4C95D]"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M4 13.5C60 5 150 3 296 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>{" "}
            для бренда
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg text-zinc-400">
            Ante связывает казино и беттинг-бренды с проверенными gambling-стримерами и инфлюенсерами —
            от подбора креаторов до запуска кампании и отчётности.
          </motion.p>

          <motion.div variants={item} className="mt-2 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-7 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
            >
              Запустить кампанию
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#streamers"
              className="group flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Каталог стримеров
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
