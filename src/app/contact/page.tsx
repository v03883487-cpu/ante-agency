import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Связаться с нами",
  description: "Расскажите о бренде и целях кампании — подберём gambling-стримеров и запустим размещение.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/contact" label="Контакты" />
      <PageHeader
        eyebrow="Начнём работу"
        title="Контакты"
        subtitle="Ответим в течение рабочего дня."
      />
      <section className="bg-white px-6 pb-28 sm:px-12">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Написать</h2>
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
      </section>
    </>
  );
}
