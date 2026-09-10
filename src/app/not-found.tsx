import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center bg-white px-6 text-center text-white">
      <div className="relative flex flex-col items-center gap-6">
        <span className="font-display text-7xl font-black tracking-tight sm:text-9xl">ANTE.</span>
        <span className="font-display text-7xl font-black text-white/10 sm:text-9xl">404</span>
        <h1 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
          Ставка не сыграла — такой страницы нет
        </h1>
        <p className="max-w-md text-zinc-400">
          Похоже, ссылка устарела или страница переехала. Вернитесь на главную и попробуйте снова.
        </p>
        <Link
          href="/"
          className="rounded-full bg-[#ffffff] px-7 py-3 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-80"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
