import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { CasinoLogos } from "@/components/CasinoLogos";
import { PartnerSignupForm } from "@/components/PartnerSignupForm";
import { CountUp } from "@/components/CountUp";
import { partnerFaqItems } from "@/lib/partnerFaq";
import { brands } from "@/lib/brands";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Партнёрская программа Ante Partners",
  description:
    "Ante Partners — партнёрская программа для вебмастеров и медиабаингеров: CPA, RevShare и гибридные ставки по 27+ casino и betting брендам, еженедельные выплаты.",
  alternates: { canonical: "/partners" },
};

const plans = [
  { title: "CPA", tag: "За депозит", body: "Фикс за игрока с депозитом." },
  { title: "RevShare", tag: "% от дохода", body: "Доля от дохода, пока игрок активен." },
  { title: "Hybrid", tag: "CPA + RevShare", body: "Фикс плюс сниженный процент." },
];

const steps = [
  { n: "01", title: "Заявка", body: "Отвечаем в течение дня." },
  { n: "02", title: "Оффер", body: "Ссылка под гео и площадку." },
  { n: "03", title: "Трафик", body: "Статистика в реальном времени." },
  { n: "04", title: "Выплата", body: "Раз в неделю." },
];

const payouts = ["USDT", "Карта", "Электронные кошельки", "Под гео"];

const PARTNERS_APP_URL = "https://ante-partners-app.vercel.app";

const partnerFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: partnerFaqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerFaqJsonLd) }} />
      <BreadcrumbsJsonLd path="/partners" label="Партнёрка" />

      <section className="relative bg-white px-6 pb-16 pt-16 text-center text-white sm:px-12 sm:pt-24">
        <div className="relative mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Ante Partners</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            Лей трафик
          </h1>
          <p className="mt-4 text-lg text-zinc-400">CPA, RevShare, гибрид — выплаты каждую неделю.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`${PARTNERS_APP_URL}/register`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Стать партнёром
            </a>
            <a
              href="#plans"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Условия
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-20 sm:px-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: <CountUp to={brands.length} />, label: "офферов" },
            { value: <CountUp to={30} suffix="д" />, label: "cookie" },
            { value: "неделя", label: "выплаты" },
            { value: "0", label: "порог" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white p-6 text-center">
              <div className="font-display text-4xl font-bold text-white">{s.value}</div>
              <p className="mt-2 text-sm text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CasinoLogos withLinkToPage={false} />

      <section id="plans" className="relative bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Оплата</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Модели
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {plans.map((p) => (
              <div key={p.title} className="group relative rounded-3xl border border-white/10 bg-white p-8">
                <span className="corner-bracket corner-bracket--tl" aria-hidden />
                <span className="corner-bracket corner-bracket--br" aria-hidden />
                <span className="text-xs uppercase tracking-widest text-zinc-400">{p.tag}</span>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 text-lg text-zinc-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Процесс</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Как это работает
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-3xl border border-white/10 bg-white p-8">
                <span className="font-display text-4xl font-bold text-white/15">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-base text-zinc-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white p-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Выплаты</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white">Как получаете деньги</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {payouts.map((p) => (
              <span key={p} className="rounded-full border border-white/10 px-5 py-2.5 text-base text-zinc-300">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Вопросы</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Перед стартом
            </h2>
          </div>
          <FaqAccordion items={partnerFaqItems} />
        </div>
      </section>

      <section id="signup" className="bg-white px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Стать партнёром</h2>
            <p className="mt-3 text-lg text-zinc-400">Ссылка сразу после регистрации.</p>
            <a
              href={`${PARTNERS_APP_URL}/register`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Открыть личный кабинет →
            </a>
            <p className="mt-6 text-sm text-zinc-400">
              Или: <a href="mailto:partners@ante.agency" className="text-white hover:opacity-60">partners@ante.agency</a>
            </p>
          </div>
          <PartnerSignupForm />
        </div>
      </section>

      <section className="border-t border-white/10 bg-white px-6 py-8 text-center sm:px-12">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← Сайт агентства Ante
        </Link>
      </section>
    </>
  );
}
