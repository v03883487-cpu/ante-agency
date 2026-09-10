"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#services", label: "Услуги" },
  { href: "/streamers", label: "Стримеры" },
  { href: "/brands", label: "Бренды" },
  { href: "/cases", label: "Кейсы" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-white px-6 py-5 sm:px-12">
      <Link href="/" aria-label="Ante — на главную" className="font-display text-xl font-black tracking-tight text-white">
        ANTE<span aria-hidden>.</span>
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
          className="hidden items-center gap-1.5 rounded-full border border-white px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0A0A0A] sm:flex"
        >
          Партнёрка
          <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/contact"
          className="rounded-full bg-[#ffffff] px-5 py-2 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-80"
        >
          Связаться
        </Link>
      </div>
    </nav>
  );
}
