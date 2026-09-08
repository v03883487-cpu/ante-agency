"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function BentoStats() {
  return (
    <section className="relative bg-[#0A0B0E] px-6 pb-28 sm:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-4"
      >
        <motion.div
          variants={cardVariants}
          className="col-span-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:col-span-2 sm:row-span-2"
        >
          <span className="text-4xl font-bold text-white sm:text-5xl font-display">120M+</span>
          <p className="mt-2 text-sm text-zinc-400">суммарный охват аудитории стримеров-партнёров</p>
          <svg viewBox="0 0 200 60" className="mt-6 w-full text-[#F4C95D]">
            <path
              d="M2 48 C 30 40, 40 52, 60 38 S 90 20, 110 26 S 150 8, 170 14 S 190 6, 198 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <motion.div variants={cardVariants} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <span className="text-3xl font-bold text-white font-display">40+</span>
          <p className="mt-2 text-sm text-zinc-400">gambling-стримеров и инфлюенсеров</p>
        </motion.div>

        <motion.div variants={cardVariants} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <span className="text-3xl font-bold text-white font-display">18</span>
          <p className="mt-2 text-sm text-zinc-400">casino / iGaming брендов-партнёров</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="col-span-1 flex flex-col justify-between rounded-3xl border border-[#F4C95D]/20 bg-gradient-to-br from-[#F4C95D]/10 to-transparent p-6 sm:col-span-2"
        >
          <span className="text-3xl font-bold text-white font-display">24/7</span>
          <p className="mt-2 text-sm text-zinc-400">
            сопровождение кампаний — от брифа и подбора креаторов до модерации и отчётности
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
