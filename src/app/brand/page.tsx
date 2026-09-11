import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { basePath } from "@/lib/site";
import { AmbientBg } from "@/components/AmbientBg";

export const metadata: Metadata = {
  title: "Брендбук: логотип Ante",
  description: "Логотип Ante в высоком разрешении — для Telegram, соцсетей и презентаций.",
  alternates: { canonical: "/brand" },
};

export default function BrandPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/brand" label="Брендбук" />
      <PageHeader
        eyebrow="Брендбук"
        title="Логотип"
        subtitle="Файлы для Telegram и презентаций."
      />

      <section className="relative overflow-hidden bg-white px-6 pb-28 sm:px-12">
        <AmbientBg position="bottom" />
        <div className="relative mx-auto flex max-w-md flex-col items-center gap-8">
          <div className="w-full rounded-3xl bg-[#ffffff] p-8">
            <Image
              src={`${basePath}/brand/ante-wordmark.webp`}
              alt="Ante — influence agency for gambling"
              width={1600}
              height={1132}
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`${basePath}/brand/ante-wordmark.png`}
              download
              className="rounded-full bg-[var(--accent)] px-7 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Скачать PNG
            </a>
            <a
              href={`${basePath}/brand/ante-wordmark.webp`}
              download
              className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Скачать WebP
            </a>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-white p-5 text-sm text-zinc-400">
            <p className="font-semibold text-white">Как использовать в Telegram</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Фото профиля / канала: загрузите PNG в настройках профиля.</li>
              <li>В переписке или посте: отправьте PNG или WebP как обычное медиа.</li>
              <li>Не искажайте пропорции и не меняйте цвет вордмарка.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
