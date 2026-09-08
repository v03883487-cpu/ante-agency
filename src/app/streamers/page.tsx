import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StreamerCard } from "@/components/StreamerCard";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { streamers } from "@/lib/streamers";

export const metadata: Metadata = {
  title: "Наши стримеры и инфлюенсеры",
  description:
    "Официальные стримеры-партнёры Ante на Twitch, Kick и YouTube — с реальными каналами и охватом gambling-аудитории.",
  alternates: { canonical: "/streamers" },
};

export default function StreamersPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/streamers" label="Стримеры" />
      <PageHeader
        eyebrow="Наш ростер"
        title="Стримеры и инфлюенсеры"
        subtitle="Официальные партнёры Ante на Twitch, Kick и YouTube — ссылки ведут на их настоящие каналы."
      />
      <section className="bg-[#0A0B0E] px-6 pb-10 sm:px-12">
        <div className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-400">
          <p>
            База Ante — 1400+ gambling-стримеров и инфлюенсеров на Kick, Twitch и YouTube: от нишевых
            slots-каналов с горячей вовлечённой аудиторией до крупных casino-стримеров с сотнями тысяч
            подписчиков. Ниже — часть ростера, ранжированная по реальному числу подписчиков на площадке,
            а не по накрученным метрикам.
          </p>
        </div>
      </section>
      <section className="bg-[#0A0B0E] px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {streamers.map((s) => (
            <StreamerCard key={s.handle} streamer={s} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-zinc-500">
          Показана часть ростера — полный список креаторов под конкретное гео и нишу предоставляем по брифу.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
