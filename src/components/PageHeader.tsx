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
    <section className="relative bg-white px-6 pb-16 pt-16 text-center text-[#0A0A0A] sm:px-12 sm:pt-24">
      <div className="relative mx-auto max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-zinc-500">{subtitle}</p>
      </div>
    </section>
  );
}
