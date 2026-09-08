export type Brand = {
  name: string;
  vertical: string;
  href: string;
};

// Реальные бренды-партнёры. href оставлен плейсхолдером "#" — подставьте
// свои настоящие (партнёрские/трекинговые) ссылки на каждый бренд.
const names = [
  "1Win", "Stake", "Mostbet", "RioBet", "1xBet", "1xCasino", "Roobet", "Disi",
  "Vavada", "Fortune Galaxy", "MegaPari", "Yeet", "Thrill", "500casino", "BCGame",
  "OPCases", "RoyalPartners", "MelBet", "NovaPartners", "Motor", "RainBet", "Fixa",
  "Shuffle", "Bitfortune", "Betwinner", "ToSpin", "WinWin", "CatAff", "MaxBet",
  "FairPari", "Leon", "Jetton", "Champion", "Atom", "LootRun", "ComboPartners",
  "Trix", "VODKA", "7K", "Spark", "N1", "NV", "CatCasino",
];

export const brands: Brand[] = names.map((name) => ({
  name,
  vertical: "Casino & Betting",
  href: "#",
}));
