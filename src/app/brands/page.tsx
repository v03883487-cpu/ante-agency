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
        title="Casino & iGaming бренды"
        subtitle="Работаем с операторами casino, betting и live-casino — от разового посева до долгосрочного амбассадорства."
      />

      <section className="bg-[#0A0B0E] px-6 pb-10 sm:px-12">
        <div className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-400">
          <p>
            Ante выстраивает инфлюенс-маркетинг для gambling и iGaming операторов на стыке трёх вертикалей —
            casino, sports betting и live casino. Для каждого бренда мы подбираем стримеров, чья аудитория
            реально конвертируется в депозиты, а не просто даёт охват ради охвата: смотрим на гео, язык
            платформы (Kick, Twitch, YouTube) и формат подачи контента у конкретного креатора.
          </p>
        </div>
      </section>

      <section className="bg-[#0A0B0E] px-6 pb-16 sm:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {brands.map((b) => (
            <a
              key={b.name}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-6 text-center transition-colors hover:border-[#F4C95D]/30"
            >
              <BrandLogo
                name={b.name}
                logo={b.logo}
                className="flex-col gap-2 text-sm text-zinc-300 transition-colors group-hover:text-white [&_svg]:h-7 [&_svg]:w-7 [&_svg]:text-[#F4C95D] [&_img]:h-8 [&_img]:w-8"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0B0E] px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              title: "Casino",
              body: "Слоты, live-casino и джекпот-игры — интеграции у стримеров, которые органично играют в ваш продукт в реальном времени, а не зачитывают рекламный текст между раундами.",
            },
            {
              title: "Betting",
              body: "Ставки на спорт и киберспорт — синхронизируем посевы с расписанием крупных матчей и турниров, чтобы промо-код появлялся именно тогда, когда аудитория готова сделать ставку.",
            },
            {
              title: "Live Casino",
              body: "Живые дилеры и шоу-форматы — выстраиваем амбассадорство и регулярные интеграции на канале, а не разовые упоминания, которые забываются на следующий день.",
            },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-display text-lg font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
