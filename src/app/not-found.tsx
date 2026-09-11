import Link from "next/link";
import { BarbedWire } from "@/components/BarbedWire";
import { basePath } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-white px-6 text-center text-white">
      <img
        src={`${basePath}/textures/crack-glass.webp`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <BarbedWire />
      <div className="relative flex flex-col items-center gap-6">
        <span className="font-display text-7xl font-bold tracking-tight sm:text-9xl">
          ANTE<span className="text-[var(--accent)]">.</span>
        </span>
        <span className="font-display text-7xl font-bold text-white/10 sm:text-9xl">404</span>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Ставка не сыграла — такой страницы нет
        </h1>
        <p className="max-w-md text-zinc-400">
          Похоже, ссылка устарела или страница переехала. Вернитесь на главную и попробуйте снова.
        </p>
        <Link
          href="/"
          className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
