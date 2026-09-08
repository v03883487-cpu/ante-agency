export type Brand = {
  name: string;
  vertical: string;
  href: string;
};

// Плейсхолдер-бренды. Замените на логотипы и ссылки реальных партнёров,
// когда появятся подписанные соглашения.
export const brands: Brand[] = [
  { name: "Golden Reel", vertical: "Casino", href: "#" },
  { name: "Neon Vegas", vertical: "Casino", href: "#" },
  { name: "Fortuna Bay", vertical: "Betting", href: "#" },
  { name: "SpinHaven", vertical: "Casino", href: "#" },
  { name: "Lucky Circuit", vertical: "Live Casino", href: "#" },
  { name: "Vegas Pulse", vertical: "Casino", href: "#" },
  { name: "Jackpot Nova", vertical: "Slots", href: "#" },
  { name: "Royal Drift", vertical: "Betting", href: "#" },
];
