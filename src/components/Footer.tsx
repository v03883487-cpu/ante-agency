import { AnimatedLogo } from "./AnimatedLogo";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-[#0A0B0E] px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Готовы поднять ставки?
        </h2>
        <p className="max-w-md text-zinc-400">
          Расскажите о бренде и целях кампании — подберём стримеров и запустим размещение.
        </p>
        <a
          href="mailto:hello@ante.agency"
          className="rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-7 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
        >
          hello@ante.agency
        </a>

        <div className="mt-10 flex w-full flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <AnimatedLogo size="sm" />
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Ante. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
