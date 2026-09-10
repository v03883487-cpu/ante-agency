import Link from "next/link";
import { brands } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

export function CasinoLogos({ withLinkToPage = true }: { withLinkToPage?: boolean }) {
  const track = [...brands, ...brands];

  return (
    <section className="border-y border-white/10 bg-white py-14">
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Casino &amp; iGaming бренды, с которыми мы работаем в вертикали
          </p>
          {withLinkToPage && (
            <Link href="/brands" className="text-xs font-medium text-white hover:opacity-60">
              Все бренды →
            </Link>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 [animation-play-state:running] hover:[animation-play-state:paused]">
          {track.map((b, i) => (
            <a
              key={`${b.name}-${i}`}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="group shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-white/40"
            >
              <BrandLogo name={b.name} logo={b.logo} className="text-sm" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
