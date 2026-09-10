"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const brand = String(form.get("brand") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Заявка от ${name || "бренда"} — Ante`);
    const body = encodeURIComponent(`Имя: ${name}\nБренд: ${brand}\n\n${message}`);
    window.location.href = `mailto:hello@ante.agency?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-white px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--accent)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs text-zinc-400">Имя</label>
        <input id="name" name="name" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="brand" className="mb-1 block text-xs text-zinc-400">Бренд</label>
        <input id="brand" name="brand" className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs text-zinc-400">Сообщение</label>
        <textarea id="message" name="message" rows={4} required className={inputCls} />
      </div>
      <button
        type="submit"
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
      >
        {sent ? "Открываем почтовый клиент…" : "Отправить"}
      </button>
    </form>
  );
}
