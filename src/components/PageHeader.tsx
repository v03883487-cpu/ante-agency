import { BarbedWire } from "./BarbedWire";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-16 text-center text-white sm:px-12 sm:pt-24">
      <BarbedWire className="text-white/10" />
      <div className="relative mx-auto max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">{eyebrow}</span>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-7xl">{title}</h1>
        <p className="mt-4 text-lg text-zinc-400">{subtitle}</p>
      </div>
    </section>
  );
}
