import { basePath } from "./site";

export type Streamer = {
  handle: string;
  seed: string;
  avatar: string;
  platform: "Twitch" | "Kick" | "YouTube";
  niche: string;
  followers: string;
};

const platforms: Streamer["platform"][] = ["Twitch", "Kick", "YouTube"];
const niches = ["Slots", "Live Casino", "Crash-игры", "Ставки на спорт", "Покер", "Рулетка"];

const entries: Array<[string, string, string]> = [
  ["SlotKing_RU", "SlotKing", "480K"],
  ["LuckyMira", "LuckyMira", "1.2M"],
  ["ZigZagSpins", "ZigZagSpins", "210K"],
  ["ReelRider", "ReelRider", "860K"],
  ["BigWinDanya", "BigWinDanya", "95K"],
  ["JackpotJulia", "JackpotJulia", "2.1M"],
  ["Oleg_Spins", "SpinMasterOleg", "340K"],
  ["CasinoCleo", "CasinoCleo", "150K"],
  ["VegasVlad", "VegasVlad", "670K"],
  ["HighRollHana", "HighRollHana", "1.8M"],
  ["WildSpinTima", "WildSpinTima", "72K"],
  ["BonusBoss", "BonusBoss", "410K"],
  ["NeonNikita", "NeonNikita", "990K"],
  ["Sasha_Reels", "ReelQueenSasha", "230K"],
  ["SpinCityKate", "SpinCityKate", "1.4M"],
  ["DropTheJackpot", "DropTheJackpot", "58K"],
];

export const streamers: Streamer[] = entries.map(([handle, seed, followers], i) => ({
  handle,
  seed,
  avatar: `${basePath}/avatars/${seed}.jpg`,
  platform: platforms[i % platforms.length],
  niche: niches[i % niches.length],
  followers,
}));
