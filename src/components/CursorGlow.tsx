"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e: MouseEvent) {
      el!.style.setProperty("--x", `${e.clientX}px`);
      el!.style.setProperty("--y", `${e.clientY}px`);
      el!.style.opacity = "1";
    }
    function handleLeave() {
      el!.style.opacity = "0";
    }
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(212,175,55,0.08), transparent 70%)",
      }}
    />
  );
}
