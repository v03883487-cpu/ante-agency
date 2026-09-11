import Link from "next/link";
import { BarbedWire } from "./BarbedWire";
import { basePath } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 text-center sm:px-12">
      <img
        src={`${basePath}/textures/smoke-frame.webp`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-screen"
      />
      <BarbedWire className="opacity-25" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6">
        <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Поднять ставки?
        </h2>
        <p className="max-w-md text-lg text-zinc-400">Подберём стримеров под ваш бренд.</p>
        <Link
          href="/#contact"
          className="pulse-glow rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-85"
        >
          Оставить заявку
        </Link>
      </div>
    </section>
  );
}
