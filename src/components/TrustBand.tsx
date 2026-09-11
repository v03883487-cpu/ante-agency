import { CountUp } from "./CountUp";
import { BarbedWire } from "./BarbedWire";

export function TrustBand() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white px-6 py-20 text-center sm:px-12">
      <BarbedWire className="text-white/[0.06]" />
      <h2 className="relative font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
        <CountUp to={1400} suffix="+" /> стримеров
      </h2>
    </section>
  );
}
