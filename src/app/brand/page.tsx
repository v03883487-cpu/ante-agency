import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Брендбук: анимированный логотип",
  description: "Анимированный логотип Ante в форматах MP4 и GIF — для Telegram, соцсетей и презентаций.",
  alternates: { canonical: "/brand" },
};

export default function BrandPage() {
  return (
    <>
      <BreadcrumbsJsonLd path="/brand" label="Брендбук" />
      <PageHeader
        eyebrow="Брендбук"
        title="Анимированный логотип"
        subtitle="Тот же чип с буквой A, что крутится в шапке сайта — готовый файл для Telegram, сторис и презентаций."
      />

      <section className="bg-[#0A0B0E] px-6 pb-28 sm:px-12">
        <div className="mx-auto flex max-w-md flex-col items-center gap-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-64 w-64 rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <source src={`${basePath}/downloads/ante-logo-animated.mp4`} type="video/mp4" />
            <source src={`${basePath}/downloads/ante-logo-animated.webm`} type="video/webm" />
          </video>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`${basePath}/downloads/ante-logo-animated.mp4`}
              download
              className="rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-7 py-3 text-center text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
            >
              Скачать MP4
            </a>
            <a
              href={`${basePath}/downloads/ante-logo-animated.gif`}
              download
              className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Скачать GIF
            </a>
            <a
              href={`${basePath}/downloads/ante-logo-animated.webm`}
              download
              className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Скачать WebM
            </a>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
            <p className="font-semibold text-white">Как использовать в Telegram</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Фото профиля / канала: загрузите MP4 в настройках профиля — Telegram сам зациклит видео.</li>
              <li>В переписке или посте: отправьте GIF или MP4 как обычное медиа.</li>
              <li>Файлы квадратные (512×512) — подходят и для профиля, и для превью ссылок.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
