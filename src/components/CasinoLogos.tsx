import Link from "next/link";
import { brands } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

export function CasinoLogos({ withLinkToPage = true }: { withLinkToPage?: boolean }) {
  return (
    <section className="border-y border-white/10 bg-[#0A0B0E] px-6 py-14 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Casino &amp; iGaming бренды, с которыми мы работаем в вертикали
          </p>
          {withLinkToPage && (
            <Link href="/brands" className="text-xs font-medium text-[#F4C95D] hover:text-[#F6D57F]">
              Все бренды →
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {brands.map((b) => (
            <a
              key={b.name}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-400 grayscale transition-all hover:border-white/25 hover:text-white hover:grayscale-0"
            >
              <BrandLogo name={b.name} className="text-sm" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
