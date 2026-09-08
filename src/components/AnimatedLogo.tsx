"use client";

import { motion } from "framer-motion";

const letters = ["a", "n", "t", "e"];
const EDGE_NOTCHES = 16;

const sizes = {
  sm: { icon: 32, text: "text-xl" },
  md: { icon: 44, text: "text-3xl" },
  lg: { icon: 72, text: "text-6xl" },
} as const;

export function AnimatedLogo({ size = "md" }: { size?: keyof typeof sizes }) {
  const { icon, text } = sizes[size];

  return (
    <div className="flex select-none items-center gap-3">
      <motion.svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <defs>
          <linearGradient id="ante-gold" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#F4C95D" />
            <stop offset="100%" stopColor="#E28B2F" />
          </linearGradient>
        </defs>

        {/* chip body */}
        <circle cx="32" cy="32" r="30" fill="#101114" stroke="#2E323C" strokeWidth="1.5" />

        {/* rotating edge stripes, like a real poker chip */}
        <motion.g
          style={{ transformOrigin: "32px 32px" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {Array.from({ length: EDGE_NOTCHES }).map((_, i) => (
            <rect
              key={i}
              x="30.25"
              y="2.5"
              width="3.5"
              height="9"
              rx="1.5"
              fill={i % 2 === 0 ? "url(#ante-gold)" : "#1D1F26"}
              transform={`rotate(${(360 / EDGE_NOTCHES) * i} 32 32)`}
            />
          ))}
        </motion.g>

        {/* inner face */}
        <circle cx="32" cy="32" r="22" fill="#101114" stroke="#2E323C" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="19" fill="none" stroke="url(#ante-gold)" strokeWidth="1" opacity="0.5" />

        {/* geometric "A" mark, drawn as a shape not text, so it can never sit off-baseline */}
        <motion.path
          d="M19 47 L32 17 L45 47 M24.2 35 L39.8 35"
          fill="none"
          stroke="url(#ante-gold)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
        />
      </motion.svg>

      <div className={`flex ${text} font-display font-bold tracking-tight text-zinc-50`}>
        {letters.map((letter, i) => (
          <motion.span
            key={letter + i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="text-[#F4C95D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.4 }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}

