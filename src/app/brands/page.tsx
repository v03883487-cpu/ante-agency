import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BrandLogo } from "@/components/BrandLogo";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { brands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Casino и iGaming бренды-партнёры",
  description:
    "Casino, betting и iGaming бренды, с которыми Ante запускает инфлюенс-кампании — от подбора стримеров до медиабаинга и отчётности.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/brands" label="Бренды" />
      <PageHeader
        eyebrow="Наши вертикали"
        title="Бренды"
        subtitle="Casino, betting, live-casino — от посева до амбассадорства."
      />

      <section className="bg-white px-6 pb-16 sm:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {brands.map((b) => (
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
      </section>

      <section className="bg-white px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Casino", body: "Слоты и live-игры вживую на стриме." },
            { title: "Betting", body: "Промо-код точно к матчу." },
            { title: "Live Casino", body: "Постоянное амбассадорство." },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl border border-white/10 bg-white p-8">
              <h3 className="font-display text-2xl font-bold text-white">{v.title}</h3>
              <p className="mt-3 text-lg text-zinc-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
