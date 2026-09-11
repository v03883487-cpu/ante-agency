import { CountUp } from "./CountUp";

export function TrustBand() {
  return (
    <section className="border-t border-white/10 bg-white px-6 py-20 text-center sm:px-12">
      <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
        <CountUp to={1400} suffix="+" /> стримеров
      </h2>
    </section>
  );
}
