import { CountUp } from "./CountUp";

export function TrustBand() {
  return (
    <section className="border-t border-white/10 bg-white px-6 py-16 text-center sm:px-12">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Свыше <CountUp to={1400} suffix="+" /> инфлюенсеров по стримингу в базе
      </h2>
    </section>
  );
}
