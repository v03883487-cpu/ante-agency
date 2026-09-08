import { AnimatedLogo } from "./AnimatedLogo";

export function LogoShowcase() {
  return (
    <section className="flex flex-col items-center gap-4 bg-[#0A0B0E] px-6 py-24 text-center">
      <span className="text-xs uppercase tracking-widest text-zinc-500">
        Тестовая анимация логотипа — черновой вариант, финальный дизайн дорабатывается
      </span>
      <AnimatedLogo size="lg" />
      <p className="max-w-md text-sm text-zinc-500">
        Кольцо фишки крутится бесконечно, значок и буквы появляются с задержкой при загрузке страницы.
      </p>
    </section>
  );
}
