"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
] as const;

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof languages)[number]["code"]>("ru");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ante-lang");
      if (stored && languages.some((l) => l.code === stored)) {
        setActive(stored as typeof active);
      }
    } catch {}
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function select(code: (typeof languages)[number]["code"]) {
    setActive(code);
    setOpen(false);
    try {
      localStorage.setItem("ante-lang", code);
    } catch {}
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
      >
        {languages.find((l) => l.code === active)?.label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-30 mt-2 w-24 overflow-hidden rounded-xl border border-white/10 bg-[#111] py-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={active === l.code}
                onClick={() => select(l.code)}
                className={`block w-full px-3.5 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                  active === l.code ? "text-white" : "text-zinc-400"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
