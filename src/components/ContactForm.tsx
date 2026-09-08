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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs text-zinc-500">Имя</label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F4C95D]/50"
        />
      </div>
      <div>
        <label htmlFor="brand" className="mb-1 block text-xs text-zinc-500">Бренд</label>
        <input
          id="brand"
          name="brand"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F4C95D]/50"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs text-zinc-500">Сообщение</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F4C95D]/50"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-gradient-to-r from-[#F4C95D] to-[#E28B2F] px-6 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
      >
        {sent ? "Открываем почтовый клиент…" : "Отправить"}
      </button>
    </form>
  );
}
