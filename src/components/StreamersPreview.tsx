import Link from "next/link";
import { streamers } from "@/lib/streamers";
import { StreamerCard } from "./StreamerCard";

export function StreamersPreview() {
  return (
    <section id="streamers" className="relative bg-[#0A0B0E] px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F4C95D]">Наши креаторы</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Стримеры и инфлюенсеры Ante
            </h2>
          </div>
          <Link href="/streamers" className="flex items-center gap-1 text-sm font-medium text-[#F4C95D] hover:text-[#F6D57F]">
            Весь каталог (1400+) <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {streamers.slice(0, 8).map((s) => (
            <StreamerCard key={s.handle} streamer={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
