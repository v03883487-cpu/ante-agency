function Chip({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="32" r="30" fill="#101114" stroke="#2E323C" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="30.25"
          y="2.5"
          width="3.5"
          height="9"
          rx="1.5"
          fill={i % 2 === 0 ? "#F4C95D" : "#1D1F26"}
          transform={`rotate(${(360 / 12) * i} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="21" fill="#101114" stroke="#2E323C" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#F4C95D" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export function FloatingChips() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      <Chip size={54} className="absolute left-[6%] top-[18%] opacity-40 [animation:chip-float_9s_ease-in-out_infinite]" />
      <Chip size={38} className="absolute right-[10%] top-[28%] opacity-30 [animation:chip-float_11s_ease-in-out_infinite_1s]" />
      <Chip size={70} className="absolute left-[14%] bottom-[10%] opacity-25 [animation:chip-float_13s_ease-in-out_infinite_0.5s]" />
      <Chip size={46} className="absolute right-[16%] bottom-[16%] opacity-35 [animation:chip-spin_18s_linear_infinite]" />
    </div>
  );
}
