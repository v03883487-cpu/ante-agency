import Link from "next/link";

const columns = [
  {
    title: "Агентство",
    links: [
      { href: "/#services", label: "Услуги" },
      { href: "/cases", label: "Кейсы" },
      { href: "/contact", label: "Связаться" },
    ],
  },
  {
    title: "Креаторы и бренды",
    links: [
      { href: "/streamers", label: "Каталог стримеров" },
      { href: "/brands", label: "Casino-бренды" },
    ],
  },
  {
    title: "Партнёрам",
    links: [{ href: "/partners", label: "Партнёрская программа" }],
  },
  {
    title: "Брендбук",
    links: [{ href: "/brand", label: "Логотип для скачивания" }],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-white px-6 pb-10 pt-10 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Link href="/" aria-label="Ante — на главную" className="font-display text-xl font-black tracking-tight text-[#0A0A0A]">
            ANTE<span aria-hidden>.</span>
          </Link>
          <p className="mt-4 text-sm text-zinc-500">
            Influence-агентство полного цикла для gambling и iGaming брендов: подбор стримеров, медиабаинг, отчётность.
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-zinc-500 transition-colors hover:text-[#0A0A0A]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl border-t border-black/10 pt-6 text-xs text-zinc-500">
        © {new Date().getFullYear()} Ante. Все права защищены.
      </p>
    </footer>
  );
}
