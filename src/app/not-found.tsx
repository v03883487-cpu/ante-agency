import Link from "next/link";
import { AnimatedLogo } from "@/components/AnimatedLogo";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#0A0B0E] px-6 text-center text-zinc-50">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#F4C95D]/10 blur-[120px]" />
      <div className="relative flex flex-col items-center gap-6">
        <AnimatedLogo size="lg" />
        <span className="font-display text-7xl font-bold text-white/10 sm:text-9xl">404</span>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Ставка не сыграла — такой страницы нет
        </h1>
        <p className="max-w-md text-zinc-400">
          Похоже, ссылка устарела или страница переехала. Вернитесь на главную и попробуйте снова.
        </p>
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-7 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
