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
        title="Стримеры"
        subtitle="Twitch, Kick, YouTube — ссылки на настоящие каналы."
      />
      <section className="bg-white px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {streamers.map((s) => (
            <StreamerCard key={s.handle} streamer={s} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-base text-zinc-400">
          Показана часть ростера — полный список по брифу.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
