"use client";

import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { brands } from "@/lib/brands";

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Corners({ light = false }: { light?: boolean }) {
  const color = light ? "#FFFFFF" : "var(--accent)";
  return (
    <>
      <span className="corner-bracket corner-bracket--tl" style={{ borderColor: color }} aria-hidden />
      <span className="corner-bracket corner-bracket--tr" style={{ borderColor: color }} aria-hidden />
      <span className="corner-bracket corner-bracket--bl" style={{ borderColor: color }} aria-hidden />
      <span className="corner-bracket corner-bracket--br" style={{ borderColor: color }} aria-hidden />
    </>
  );
}

export function BentoStats() {
  return (
    <section className="relative bg-white px-6 pb-28 sm:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-4"
      >
        <motion.div
          variants={cardVariants}
          className="card-hover group relative col-span-1 rounded-3xl border border-white/10 bg-white p-8 sm:col-span-2 sm:row-span-2 sm:p-10"
        >
          <Corners />
          <span className="text-6xl font-bold text-white sm:text-7xl font-display">
            <CountUp to={120} suffix="M+" />
          </span>
          <p className="mt-3 text-base text-zinc-400">охват аудитории</p>
          <svg viewBox="0 0 200 60" className="mt-8 w-full text-[var(--accent)]">
            <path
              d="M2 48 C 30 40, 40 52, 60 38 S 90 20, 110 26 S 150 8, 170 14 S 190 6, 198 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <motion.div variants={cardVariants} className="card-hover group relative rounded-3xl border border-white/10 bg-white p-8">
          <Corners />
          <span className="text-5xl font-bold text-white font-display">
            <CountUp to={1400} suffix="+" />
          </span>
          <p className="mt-3 text-base text-zinc-400">стримеров</p>
        </motion.div>

        <motion.div variants={cardVariants} className="card-hover group relative rounded-3xl border border-white/10 bg-white p-8">
          <Corners />
          <span className="text-5xl font-bold text-white font-display">
            <CountUp to={brands.length} />
          </span>
          <p className="mt-3 text-base text-zinc-400">брендов</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="pulse-glow card-hover group relative col-span-1 flex flex-col justify-between rounded-3xl border border-white/10 bg-[var(--accent)] p-8 text-white sm:col-span-2"
        >
          <Corners light />
          <span className="text-5xl font-bold font-display">24/7</span>
          <p className="mt-3 text-base text-white/80">сопровождение кампаний</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
