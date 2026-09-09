import { basePath } from "./site";

export type Brand = {
  name: string;
  vertical: string;
  href: string;
  logo: string;
};

// Только бренды с подтверждённым реальным доменом и логотипом — каждый домен
// вручную проверен (заголовок/контент страницы соответствует казино-бренду
// с этим названием) перед тем, как его логотип попал в список. Бренды, для
// которых домен не удалось надёжно подтвердить (слишком общее название,
// домен не резолвится, "для продажи", услуга закрыта и т.п.), исключены —
// пришлите точный домен/партнёрскую ссылку, и добавим их обратно с логотипом.
const domains: Record<string, string> = {
  "1Win": "1win.com",
  Stake: "stake.com",
  Mostbet: "mostbet.com",
  "1xBet": "1xbet.com",
  Roobet: "roobet.com",
  Disi: "disicasino.com",
  Vavada: "vavada.com",
  MelBet: "melbet.com",
  BCGame: "bc.game",
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
  Motor: "motorcasino.com",
  WinWin: "winwin.bet",
  MaxBet: "maxbet.rs",
  VODKA: "vodka.bet",
  "7K": "7kcasino.com",
  N1: "n1casino.com",
  CatCasino: "catcasino.com",
};

export const brands: Brand[] = Object.entries(domains).map(([name, domain]) => ({
  name,
  vertical: "Casino & Betting",
  href: `https://${domain}`,
  logo: `${basePath}/brand-logos/${name}.png`,
}));
