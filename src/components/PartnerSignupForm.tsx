"use client";

import { useState } from "react";

export function PartnerSignupForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const telegram = String(form.get("telegram") ?? "");
    const source = String(form.get("source") ?? "");
    const volume = String(form.get("volume") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Заявка в партнёрку Ante — ${telegram || "новый вебмастер"}`);
    const body = encodeURIComponent(
      `Telegram: ${telegram}\nИсточник трафика: ${source}\nОжидаемый объём: ${volume}\n\n${message}`
    );
    window.location.href = `mailto:partners@ante.agency?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="telegram" className="mb-1 block text-xs text-zinc-500">Telegram</label>
        <input
          id="telegram"
          name="telegram"
          required
          placeholder="@username"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#D7FF3F]/50"
        />
      </div>
      <div>
        <label htmlFor="source" className="mb-1 block text-xs text-zinc-500">Источник трафика</label>
        <input
          id="source"
          name="source"
          placeholder="Twitch / Kick / YouTube / Telegram / медиабаинг…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#D7FF3F]/50"
        />
      </div>
      <div>
        <label htmlFor="volume" className="mb-1 block text-xs text-zinc-500">Ожидаемый объём трафика / гео</label>
        <input
          id="volume"
          name="volume"
          placeholder="напр. 500 кликов/день, СНГ"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#D7FF3F]/50"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs text-zinc-500">Комментарий</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-[#D7FF3F]/50"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-[#D7FF3F] px-6 py-3 text-sm font-semibold text-[#0A0B0E] transition-transform hover:scale-105"
      >
        {sent ? "Открываем почтовый клиент…" : "Подать заявку"}
      </button>
    </form>
  );
}
