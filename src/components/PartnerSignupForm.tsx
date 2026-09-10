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

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-white px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--accent)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="telegram" className="mb-1 block text-xs text-zinc-400">Telegram</label>
        <input id="telegram" name="telegram" required placeholder="@username" className={inputCls} />
      </div>
      <div>
        <label htmlFor="source" className="mb-1 block text-xs text-zinc-400">Источник трафика</label>
        <input id="source" name="source" placeholder="Twitch / Kick / YouTube / Telegram / медиабаинг…" className={inputCls} />
      </div>
      <div>
        <label htmlFor="volume" className="mb-1 block text-xs text-zinc-400">Ожидаемый объём трафика / гео</label>
        <input id="volume" name="volume" placeholder="напр. 500 кликов/день, СНГ" className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs text-zinc-400">Комментарий</label>
        <textarea id="message" name="message" rows={3} className={inputCls} />
      </div>
      <button
        type="submit"
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
      >
        {sent ? "Открываем почтовый клиент…" : "Подать заявку"}
      </button>
    </form>
  );
}
