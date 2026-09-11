import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-white px-6 pb-28 sm:px-12">
      <FadeIn className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Начнём работу</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Контакты
          </h2>
          <p className="mt-3 max-w-xl text-lg text-zinc-400">Ответим в течение рабочего дня.</p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Написать</h3>
            <dl className="mt-4 space-y-3 text-base text-zinc-400">
              <div>
                <dt className="text-zinc-500">Email</dt>
                <dd>
                  <a href="mailto:hello@ante.agency" className="text-white hover:opacity-60">
                    hello@ante.agency
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Telegram</dt>
                <dd>
                  <a href="https://t.me/ante_agency" className="text-white hover:opacity-60">
                    @ante_agency
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </FadeIn>
    </section>
  );
}
