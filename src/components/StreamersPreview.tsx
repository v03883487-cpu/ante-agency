"use client";

import { motion } from "framer-motion";
import { streamers } from "@/lib/streamers";
import { StreamerCard } from "./StreamerCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export function StreamersPreview() {
  return (
    <section id="streamers" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Наши креаторы</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Стримеры
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {streamers.map((s) => (
            <motion.div
              key={s.handle}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            >
              <StreamerCard streamer={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
