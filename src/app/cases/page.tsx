import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { brands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Кейсы инфлюенс-кампаний",
  description: "Примеры формата кейсов Ante для gambling и iGaming брендов: охват, вовлечённость и результаты кампаний.",
  alternates: { canonical: "/cases" },
};

const cases = [
  { brand: brands[0].name, metric: "3.2M", label: "просмотров интеграций", format: "Twitch-стримы + клипы" },
  { brand: brands[2].name, metric: "+68%", label: "рост регистраций за месяц", format: "Betting-амбассадорство" },
  { brand: brands[4].name, metric: "140+", label: "интеграций у 40 креаторов", format: "Live Casino посевы" },
  { brand: brands[6].name, metric: "5.4M", label: "суммарный охват", format: "Slots-кампания на YouTube" },
];

export default function CasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Результаты"
        title="Кейсы"
        subtitle="Формат презентации результатов кампаний — цифры приведены как пример структуры отчётности."
      />
      <section className="bg-[#0A0B0E] px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <div key={c.brand} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <span className="text-xs uppercase tracking-widest text-zinc-500">{c.brand} · {c.format}</span>
              <p className="mt-3 font-display text-4xl font-bold text-white">{c.metric}</p>
              <p className="mt-1 text-sm text-zinc-400">{c.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-zinc-600">
          Кейсы демонстрируют формат подачи результатов. Реальные цифры и брендинг публикуются после согласования с партнёром.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
