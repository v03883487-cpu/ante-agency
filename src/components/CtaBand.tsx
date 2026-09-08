import Link from "next/link";

export function CtaBand() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 pb-28 text-center sm:px-12">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Готовы поднять ставки?
      </h2>
      <p className="max-w-md text-zinc-400">
        Расскажите о бренде и целях кампании — подберём стримеров и запустим размещение.
      </p>
      <Link
        href="/contact"
        className="rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-7 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
      >
        Оставить заявку
      </Link>
    </section>
  );
}
