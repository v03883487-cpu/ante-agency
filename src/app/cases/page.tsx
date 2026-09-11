import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { StaggerGroup, StaggerItem } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Кейсы инфлюенс-кампаний",
  description: "Примеры формата кейсов Ante для gambling и iGaming брендов: охват, вовлечённость и результаты кампаний.",
  alternates: { canonical: "/cases" },
};

const cases = [
  { brand: "Casino A", metric: "3.2M", label: "просмотров", format: "Twitch" },
  { brand: "Betting B", metric: "+68%", label: "регистраций", format: "Амбассадорство" },
  { brand: "Live Casino C", metric: "140+", label: "интеграций", format: "Посевы" },
  { brand: "Slots D", metric: "5.4M", label: "охват", format: "YouTube" },
];

export default function CasesPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/cases" label="Кейсы" />
      <PageHeader
        eyebrow="Результаты"
        title="Кейсы"
        subtitle="Пример структуры отчётности по кампаниям."
      />
      <section className="bg-white px-6 pb-28 sm:px-12">
        <StaggerGroup className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <StaggerItem key={c.brand} className="card-hover rounded-3xl border border-white/10 bg-white p-8 hover:border-white/30">
              <span className="text-xs uppercase tracking-widest text-zinc-400">{c.brand} · {c.format}</span>
              <p className="mt-3 font-display text-6xl font-bold text-white">{c.metric}</p>
              <p className="mt-2 text-lg text-zinc-400">{c.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-zinc-500">
          Иллюстративные цифры — реальные кейсы по согласованию с партнёром.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
