export function BarbedWire({ className = "text-white/15" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-[140px] w-full ${className}`}
    >
      <defs>
        <pattern
          id="barb"
          width="70"
          height="70"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-6)"
        >
          <line x1="0" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1="27" x2="18" y2="43" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1="27" x2="10" y2="21" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1="43" x2="10" y2="49" stroke="currentColor" strokeWidth="1" />
          <line x1="52" y1="27" x2="52" y2="43" stroke="currentColor" strokeWidth="1" />
          <line x1="52" y1="27" x2="60" y2="21" stroke="currentColor" strokeWidth="1" />
          <line x1="52" y1="43" x2="60" y2="49" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="140" fill="url(#barb)" />
    </svg>
  );
}
