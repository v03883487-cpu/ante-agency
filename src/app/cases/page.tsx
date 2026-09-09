import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Кейсы инфлюенс-кампаний",
  description: "Примеры формата кейсов Ante для gambling и iGaming брендов: охват, вовлечённость и результаты кампаний.",
  alternates: { canonical: "/cases" },
};

const cases = [
  { brand: "Casino-бренд A", metric: "3.2M", label: "просмотров интеграций", format: "Twitch-стримы + клипы" },
  { brand: "Betting-бренд B", metric: "+68%", label: "рост регистраций за месяц", format: "Betting-амбассадорство" },
  { brand: "Live Casino-бренд C", metric: "140+", label: "интеграций у 40 креаторов", format: "Live Casino посевы" },
  { brand: "Slots-бренд D", metric: "5.4M", label: "суммарный охват", format: "Slots-кампания на YouTube" },
];

export default function CasesPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/cases" label="Кейсы" />
      <PageHeader
        eyebrow="Результаты"
        title="Кейсы"
        subtitle="Формат презентации результатов кампаний — цифры приведены как пример структуры отчётности."
      />
      <section className="bg-white px-6 pb-10 sm:px-12">
        <div className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-500">
          <p>
            Каждая кампания Ante закрывается отчётом: охваты, переходы по трекинговым ссылкам и, где это
            технически доступно, конверсии в депозиты. Ниже — иллюстрация того, как выглядит такой отчёт
            по структуре, до того как в него подставят цифры и брендинг конкретного партнёра.
          </p>
        </div>
      </section>
      <section className="bg-white px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <div key={c.brand} className="rounded-3xl border border-black/10 bg-white p-6">
              <span className="text-xs uppercase tracking-widest text-zinc-500">{c.brand} · {c.format}</span>
              <p className="mt-3 font-display text-4xl font-black text-[#0A0A0A]">{c.metric}</p>
              <p className="mt-1 text-sm text-zinc-500">{c.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-zinc-500">
          Кейсы демонстрируют формат подачи результатов. Названия брендов и цифры — иллюстративные, реальные
          кейсы публикуются после согласования с партнёром.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
