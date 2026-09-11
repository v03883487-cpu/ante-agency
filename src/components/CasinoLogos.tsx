import Link from "next/link";
import { brands } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

export function CasinoLogos({
  withLinkToPage = true,
  showHeading = true,
  limit,
}: {
  withLinkToPage?: boolean;
  showHeading?: boolean;
  limit?: number;
}) {
  const list = limit ? brands.slice(0, limit) : brands;

  return (
    <section className="border-y border-white/10 bg-white px-6 py-20 sm:px-12">
      <div className="mx-auto max-w-5xl">
        {showHeading && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Кому доверяют</span>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Портфолио
              </h2>
            </div>
            {withLinkToPage && (
              <Link href="/brands" className="text-sm font-medium text-white hover:opacity-60">
                Все бренды →
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {list.map((b) => (
            <a
              key={b.name}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-3 py-8 text-center transition-colors hover:border-white/30"
            >
              <span className="corner-bracket corner-bracket--tl" aria-hidden />
              <span className="corner-bracket corner-bracket--tr" aria-hidden />
              <span className="corner-bracket corner-bracket--bl" aria-hidden />
              <span className="corner-bracket corner-bracket--br" aria-hidden />
              <BrandLogo
                name={b.name}
                logo={b.logo}
                className="flex-col gap-3 text-sm text-zinc-400 transition-colors group-hover:text-white [&_svg]:h-9 [&_svg]:w-9 [&_svg]:text-white [&_img]:h-10 [&_img]:w-10"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
