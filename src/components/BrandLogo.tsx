import type { ReactNode } from "react";

const genericIcons: ReactNode[] = [
  <circle key="0" cx="12" cy="12" r="8" />,
  <path key="1" d="M12 3l3 6.5 7 .9-5.2 4.8L18.2 22 12 18.3 5.8 22l1.4-6.8L2 10.4l7-.9z" />,
  <>
    <circle key="2a" cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 4v3.4M12 16.6V20M20 12h-3.4M7.4 12H4" />
  </>,
  <path key="3" d="M2 12h4l2-7 4 14 3-10 2 3h5" />,
  <>
    <circle key="4a" cx="6" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
  </>,
  <path key="5" d="M4 8l3 3 5-6 5 6 3-3v9H4z" />,
];

function iconForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return genericIcons[hash % genericIcons.length];
}

export function BrandLogo({ name, logo, className = "" }: { name: string; logo?: string; className?: string }) {
  return (
    <span className={`relative inline-flex items-center gap-2.5 overflow-hidden ${className}`}>
      <span className="shimmer-layer pointer-events-none absolute inset-0 z-10" aria-hidden />
      {logo ? (
        <img src={logo} alt={`${name} logo`} width="22" height="22" className="h-[22px] w-[22px] shrink-0 rounded-md" />
      ) : (
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
          {iconForName(name)}
        </svg>
      )}
      <span className="font-display font-bold uppercase tracking-wide">{name}</span>
    </span>
  );
}
