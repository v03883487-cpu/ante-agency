const suits = {
  spade: "M12 2C7 8 3 12 3 16.5A6.5 6.5 0 0 0 13.8 21c-.6-2-1.9-3.3-3.7-4.1 2.4.7 4.9-.7 4.9-3.1 0 2.4 2.5 3.8 4.9 3.1-1.8.8-3.1 2.1-3.7 4.1A6.5 6.5 0 0 0 21 16.5C21 12 17 8 12 2Z",
  diamond: "M12 2 21 12 12 22 3 12Z",
  heart: "M12 21s-7.5-4.9-10.1-9.8C.4 8.4 1.9 5 5.2 5c1.9 0 3.4 1 4.8 2.8C11.4 6 12.9 5 14.8 5c3.3 0 4.8 3.4 3.3 6.2C15.5 16.1 12 21 12 21Z",
  club: "M12 3a3.5 3.5 0 0 1 2.9 5.5A3.5 3.5 0 1 1 17 15c-.6 0-1.2-.1-1.7-.4.6 1.9 1.9 3.1 3.7 3.9H7c1.8-.8 3.1-2 3.7-3.9-.5.3-1.1.4-1.7.4a3.5 3.5 0 1 1 2.1-6.5A3.5 3.5 0 0 1 12 3Z",
};

const marks = [
  { suit: "spade", top: "8%", left: "4%", size: 46, rotate: -18, opacity: 0.06 },
  { suit: "diamond", top: "18%", right: "6%", size: 34, rotate: 10, opacity: 0.08 },
  { suit: "heart", bottom: "14%", left: "10%", size: 30, rotate: 12, opacity: 0.06 },
  { suit: "club", bottom: "10%", right: "12%", size: 40, rotate: -8, opacity: 0.07 },
] as const;

export function SuitMarks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {marks.map((m, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={m.size}
          height={m.size}
          fill="#F4C95D"
          style={{
            position: "absolute",
            top: "top" in m ? m.top : undefined,
            bottom: "bottom" in m ? m.bottom : undefined,
            left: "left" in m ? m.left : undefined,
            right: "right" in m ? m.right : undefined,
            opacity: m.opacity,
            transform: `rotate(${m.rotate}deg)`,
          }}
        >
          <path d={suits[m.suit]} />
        </svg>
      ))}
    </div>
  );
}
