export function ArrowIcon({ direction = "right", className = "h-3.5 w-3.5" }: { direction?: "right" | "diagonal"; className?: string }) {
  const rotation = direction === "diagonal" ? "-45deg" : "0deg";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotation})` }}
    >
      <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 3.5L13.5 8L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusMinusIcon({ open, className = "h-6 w-6" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M8 2.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }} />
      <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
