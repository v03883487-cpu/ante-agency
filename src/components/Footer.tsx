import Link from "next/link";

const columns = [
  {
    title: "Агентство",
    links: [
      { href: "/#services", label: "Услуги" },
      { href: "/#cases", label: "Кейсы" },
      { href: "/#contact", label: "Связаться" },
    ],
  },
  {
    title: "Креаторы",
    links: [
      { href: "/#streamers", label: "Каталог стримеров" },
      { href: "/#geo", label: "Гео" },
    ],
  },
  {
    title: "Партнёрам",
    links: [{ href: "/partners", label: "Партнёрская программа" }],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-white px-6 pb-10 pt-10 sm:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-2), transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Link href="/" aria-label="Ante — на главную" className="font-display text-2xl uppercase tracking-tight text-white">
            ANTE<span aria-hidden className="text-[var(--accent)]">.</span>
          </Link>
          <p className="mt-4 text-sm text-zinc-400">
            Influence-агентство для gambling и iGaming.
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="relative mx-auto mt-10 max-w-5xl border-t border-white/10 pt-6 text-xs text-zinc-400">
        © {new Date().getFullYear()} Ante. Все права защищены.
      </p>
    </footer>
  );
}
