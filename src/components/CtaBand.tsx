import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 text-center sm:px-12">
      <div
        aria-hidden
        className="drift-slow pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6">
        <h2 className="font-display text-6xl uppercase tracking-tight text-white sm:text-8xl">
          Поднять ставки?
        </h2>
        <p className="max-w-md text-lg text-zinc-400">Подберём стримеров под ваш бренд.</p>
        <Link
          href="/#contact"
          className="pulse-glow rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold text-[#0b0c10] transition-opacity hover:opacity-85"
        >
          Оставить заявку
        </Link>
      </div>
    </section>
  );
}
