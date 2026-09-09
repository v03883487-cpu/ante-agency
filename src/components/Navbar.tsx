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
    <nav className="relative z-20 flex items-center justify-between border-b border-black/10 bg-white px-6 py-5 sm:px-12">
      <Link href="/" aria-label="Ante — на главную" className="font-display text-xl font-black tracking-tight text-[#0A0A0A]">
        ANTE<span aria-hidden>.</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-zinc-600 sm:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-active={pathname === l.href}
            className={`nav-link transition-colors hover:text-[#0A0A0A] ${pathname === l.href ? "text-[#0A0A0A]" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/partners"
          className="hidden items-center gap-1.5 rounded-full border border-[#0A0A0A] px-5 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white sm:flex"
        >
          Партнёрка
          <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/contact"
          className="rounded-full bg-[#0A0A0A] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
        >
          Связаться
        </Link>
      </div>
    </nav>
  );
}
