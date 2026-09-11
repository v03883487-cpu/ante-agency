import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { CasinoLogos } from "@/components/CasinoLogos";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { AmbientBg } from "@/components/AmbientBg";

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

      <CasinoLogos showHeading={false} withLinkToPage={false} />

      <section className="relative overflow-hidden bg-white px-6 pb-28 sm:px-12 pt-16">
        <AmbientBg />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Casino", body: "Слоты и live-игры вживую на стриме." },
            { title: "Betting", body: "Промо-код точно к матчу." },
            { title: "Live Casino", body: "Постоянное амбассадорство." },
          ].map((v) => (
            <div key={v.title} className="card-hover rounded-3xl border border-white/10 bg-white p-8 hover:border-white/30">
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
