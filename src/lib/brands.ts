import { basePath } from "./site";

export type Brand = {
  name: string;
  vertical: string;
  href: string;
  logo?: string;
};

// Реальные бренды-партнёры. Для части — точно известный домен, поэтому есть
// логотип (реальный favicon бренда) и рабочая ссылка на официальный сайт.
// Для остальных названия слишком общие (Motor, Atom, Spark, Trix, N1...),
// чтобы безопасно угадать домен и не подставить логотип чужой компании —
// у них временная иконка-заглушка и href="#", пришлите точные
// домены/партнёрские ссылки, и я подставлю их логотипы тоже.
const knownDomains: Record<string, string> = {
  "1Win": "1win.com",
  Stake: "stake.com",
  Mostbet: "mostbet.com",
  "1xBet": "1xbet.com",
  Roobet: "roobet.com",
  Vavada: "vavada.com",
  BCGame: "bc.game",
  MelBet: "melbet.com",
  Shuffle: "shuffle.com",
  Betwinner: "betwinner.com",
  RioBet: "riobet.com",
  "1xCasino": "1xcasino.com",
  Yeet: "yeet.com",
  Thrill: "thrill.com",
  "500casino": "500casino.com",
  RainBet: "rainbet.com",
  Bitfortune: "bitfortune.com",
  FairPari: "fairpari.com",
  Leon: "leon.bet",
};

const names = [
  "1Win", "Stake", "Mostbet", "RioBet", "1xBet", "1xCasino", "Roobet", "Disi",
  "Vavada", "Fortune Galaxy", "MegaPari", "Yeet", "Thrill", "500casino", "BCGame",
  "OPCases", "RoyalPartners", "MelBet", "NovaPartners", "Motor", "RainBet", "Fixa",
  "Shuffle", "Bitfortune", "Betwinner", "ToSpin", "WinWin", "CatAff", "MaxBet",
  "FairPari", "Leon", "Jetton", "Champion", "Atom", "LootRun", "ComboPartners",
  "Trix", "VODKA", "7K", "Spark", "N1", "NV", "CatCasino",
];

export const brands: Brand[] = names.map((name) => {
  const domain = knownDomains[name];
  return {
    name,
    vertical: "Casino & Betting",
    href: domain ? `https://${domain}` : "#",
    logo: domain ? `${basePath}/brand-logos/${name}.png` : undefined,
  };
});
