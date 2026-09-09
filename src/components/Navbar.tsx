"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "./AnimatedLogo";

const links = [
  { href: "/#services", label: "Услуги" },
  { href: "/streamers", label: "Стримеры" },
  { href: "/brands", label: "Бренды" },
  { href: "/cases", label: "Кейсы" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 flex items-center justify-between bg-[#0A0B0E] px-6 py-6 sm:px-12">
      <Link href="/" aria-label="Ante — на главную">
        <AnimatedLogo size="sm" />
      </Link>
      <div className="hidden items-center gap-8 text-sm text-zinc-300 sm:flex">
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
          className="hidden items-center gap-1.5 rounded-full bg-[#D7FF3F] px-5 py-2 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105 sm:flex"
        >
          Партнёрка
          <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Связаться
        </Link>
      </div>
    </nav>
  );
}
