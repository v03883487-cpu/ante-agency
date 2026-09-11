import { WorldTierMap } from "@/components/WorldTierMap";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/FadeIn";
import { tier1Countries, tier2Countries, tier3Note } from "@/lib/geoTiers";

export function GeoSection() {
  return (
    <section id="geo" className="relative bg-white px-6 pb-28 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Покрытие</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Гео
          </h2>
          <p className="mt-3 max-w-xl text-lg text-zinc-400">
            Основной фокус — Tier 1 и Tier 2. Tier 3 закрываем точечно.
          </p>
        </FadeIn>

        <FadeIn>
          <WorldTierMap />
        </FadeIn>

        <StaggerGroup className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
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
      </div>
    </section>
  );
}
