import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  "Golden Reel": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 4v3.4M12 16.6V20M20 12h-3.4M7.4 12H4" />
    </>
  ),
  "Neon Vegas": <path d="M12 3l3 6.5 7 .9-5.2 4.8L18.2 22 12 18.3 5.8 22l1.4-6.8L2 10.4l7-.9z" />,
  "Fortuna Bay": (
    <>
      <path d="M3 17c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      <path d="M3 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
    </>
  ),
  SpinHaven: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 8 8" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  "Lucky Circuit": (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
    </>
  ),
  "Vegas Pulse": <path d="M2 12h4l2-7 4 14 3-10 2 3h5" />,
  "Jackpot Nova": (
    <>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
      <circle cx="12" cy="12" r="3.4" />
    </>
  ),
  "Royal Drift": <path d="M4 8l3 3 5-6 5 6 3-3v9H4z" />,
};

export function BrandLogo({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        {icons[name] ?? <circle cx="12" cy="12" r="8" />}
      </svg>
      <span className="font-display font-bold uppercase tracking-wide">{name}</span>
    </span>
  );
}
