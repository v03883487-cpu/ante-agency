import Link from "next/link";
import { streamers } from "@/lib/streamers";
import { StreamerCard } from "./StreamerCard";
import { basePath } from "@/lib/site";

export function StreamersPreview() {
  return (
    <section id="streamers" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Наши креаторы</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Стримеры
            </h2>
          </div>
          <Link href="/streamers" className="group flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-60">
            Весь ростер
            <img src={`${basePath}/icons/arrow-right.webp`} alt="" aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streamers.slice(0, 6).map((s) => (
            <StreamerCard key={s.handle} streamer={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
