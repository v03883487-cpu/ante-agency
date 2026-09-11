import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { WorldTierMap } from "@/components/WorldTierMap";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/FadeIn";
import { tier1Countries, tier2Countries, tier3Note } from "@/lib/geoTiers";

export const metadata: Metadata = {
  title: "Гео покрытие: Tier 1, Tier 2, Tier 3",
  description: "Карта гео, с которыми работает Ante — основной фокус на Tier 1 и Tier 2, Tier 3 покрыт точечно.",
  alternates: { canonical: "/geo" },
};

export default function GeoPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/geo" label="Гео" />
      <PageHeader
        eyebrow="Покрытие"
        title="Гео"
        subtitle="Основной фокус — Tier 1 и Tier 2. Tier 3 закрываем точечно."
      />

      <section className="bg-white px-6 pb-20 sm:px-12">
        <FadeIn className="mx-auto max-w-4xl">
          <WorldTierMap />
        </FadeIn>
      </section>

      <section className="bg-white px-6 pb-28 sm:px-12">
        <StaggerGroup className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <StaggerItem className="rounded-3xl border border-white/10 bg-white p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Tier 1</span>
            <ul className="mt-3 space-y-1 text-sm text-zinc-300">
              {tier1Countries.map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-3xl border border-white/10 bg-white p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-100">Tier 2</span>
            <ul className="mt-3 space-y-1 text-sm text-zinc-300">
              {tier2Countries.map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-3xl border border-white/10 bg-white p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tier 3</span>
            <p className="mt-3 text-sm text-zinc-400">{tier3Note}</p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <CtaBand />
    </>
  );
}
