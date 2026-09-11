import { CountUp } from "./CountUp";

export function TrustBand() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white px-6 py-20 text-center sm:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <h2 className="relative font-display text-6xl uppercase tracking-tight text-white sm:text-8xl">
        <CountUp to={1400} suffix="+" /> стримеров
      </h2>
    </section>
  );
}
