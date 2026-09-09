import { SuitMarks } from "./SuitMarks";

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
    <section className="relative overflow-hidden bg-[#0A0B0E] px-6 pb-16 pt-16 text-center text-zinc-50 sm:px-12 sm:pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#F4C95D]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-56 right-[-10%] h-[360px] w-[360px] rounded-full bg-[#22C55E]/10 blur-[110px]" />
      <SuitMarks />
      <div className="relative mx-auto max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#F4C95D]">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-zinc-400">{subtitle}</p>
      </div>
    </section>
  );
}
