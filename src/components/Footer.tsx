import Link from "next/link";
import { AnimatedLogo } from "./AnimatedLogo";

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
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A0B0E] px-6 pb-10 pt-10 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Link href="/" aria-label="Ante — на главную">
            <AnimatedLogo size="sm" />
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

      <p className="mx-auto mt-10 max-w-5xl border-t border-white/10 pt-6 text-xs text-zinc-600">
        © {new Date().getFullYear()} Ante. Все права защищены.
      </p>
    </footer>
  );
}
