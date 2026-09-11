"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { basePath } from "@/lib/site";

const links = [
  { href: "/#services", label: "Услуги" },
  { href: "/streamers", label: "Стримеры" },
  { href: "/geo", label: "Гео" },
  { href: "/cases", label: "Кейсы" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-white px-6 py-5 sm:px-12">
      <Link href="/" aria-label="Ante — на главную" className="font-display text-xl font-bold uppercase tracking-tight text-white">
        ANTE<span aria-hidden className="text-[var(--accent)]">.</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-active={pathname === l.href}
            className={`nav-link transition-colors hover:text-white ${pathname === l.href ? "text-white" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/partners"
          className="hidden items-center gap-1.5 rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent)] sm:flex"
        >
          Партнёрка
          <img src={`${basePath}/icons/arrow-diagonal.webp`} alt="" aria-hidden className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/contact"
          className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
        >
          Связаться
        </Link>
      </div>
    </nav>
  );
}
