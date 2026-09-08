import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StreamerCard } from "@/components/StreamerCard";
import { CtaBand } from "@/components/CtaBand";
import { streamers } from "@/lib/streamers";

export const metadata: Metadata = {
  title: "Каталог gambling-стримеров и инфлюенсеров",
  description:
    "1400+ проверенных gambling-стримеров и инфлюенсеров на Twitch, Kick и YouTube — подбор креаторов под гео, аудиторию и бюджет кампании.",
  alternates: { canonical: "/streamers" },
};

export default function StreamersPage() {
  return (
    <>
      <PageHeader
        eyebrow="1400+ креаторов"
        title="Каталог стримеров и инфлюенсеров"
        subtitle="Проверенные gambling-креаторы на Twitch, Kick и YouTube — с реальной статистикой, а не накрученными цифрами."
      />
      <section className="bg-[#0A0B0E] px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {streamers.map((s) => (
            <StreamerCard key={s.handle} streamer={s} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-zinc-500">
          Показаны примеры из базы — полный список 1400+ креаторов доступен под NDA после брифинга.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
