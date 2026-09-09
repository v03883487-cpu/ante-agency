import { CountUp } from "./CountUp";

export function TrustBand() {
  return (
    <section className="bg-[#0A0B0E] px-6 py-16 text-center sm:px-12">
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
        Свыше <span className="text-[#D7FF3F]"><CountUp to={1400} suffix="+" /></span> инфлюенсеров по стримингу в базе
      </h2>
    </section>
  );
}
