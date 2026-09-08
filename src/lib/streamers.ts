import { basePath } from "./site";

export type StreamerLink = {
  platform: "kick" | "twitch" | "youtube" | "telegram" | "twitter" | "facebook";
  url: string;
};

export type Streamer = {
  handle: string;
  avatar: string;
  followers: number;
  links: StreamerLink[];
};

// Реальный ростер — официальные партнёры Ante, топ по подписчикам на Kick
// (фактические цифры и аватары получены через публичное Kick API на момент сборки сайта).
export const streamers: Streamer[] = [
  { handle: "kinglegend", followers: 72125, avatar: `${basePath}/avatars/kinglegend.webp`, links: [{ platform: "kick", url: "https://kick.com/kinglegend" }, { platform: "twitch", url: "https://www.twitch.tv/legendssmokes" }] },
  { handle: "Pablononis7", followers: 65351, avatar: `${basePath}/avatars/Pablononis7.webp`, links: [{ platform: "kick", url: "https://kick.com/Pablononis7" }] },
  { handle: "pipewakatela", followers: 49808, avatar: `${basePath}/avatars/pipewakatela.webp`, links: [{ platform: "kick", url: "https://kick.com/pipewakatela" }] },
  { handle: "dbr666", followers: 33043, avatar: `${basePath}/avatars/dbr666.webp`, links: [{ platform: "kick", url: "https://kick.com/dbr666" }] },
  { handle: "psyqr", followers: 30252, avatar: `${basePath}/avatars/psyqr.webp`, links: [{ platform: "kick", url: "https://kick.com/psyqr" }, { platform: "youtube", url: "https://www.youtube.com/@PsyQR" }] },
  { handle: "DONZI1", followers: 25717, avatar: `${basePath}/avatars/DONZI1.webp`, links: [{ platform: "kick", url: "https://kick.com/DONZI1" }, { platform: "twitch", url: "https://twitch.tv/donzi" }] },
  { handle: "ivybanks", followers: 25493, avatar: `${basePath}/avatars/ivybanks.webp`, links: [{ platform: "kick", url: "https://kick.com/ivybanks" }, { platform: "twitch", url: "https://www.twitch.tv/ivybanks" }] },
  { handle: "tema_akc", followers: 21932, avatar: `${basePath}/avatars/tema_akc.webp`, links: [{ platform: "kick", url: "https://kick.com/tema_akc" }] },
  { handle: "omegagaming77", followers: 21646, avatar: `${basePath}/avatars/omegagaming77.webp`, links: [{ platform: "kick", url: "https://kick.com/omegagaming77" }] },
  { handle: "peu_mc", followers: 20788, avatar: `${basePath}/avatars/peu_mc.webp`, links: [{ platform: "kick", url: "https://kick.com/peu_mc" }, { platform: "twitch", url: "https://www.twitch.tv/peu_mc" }] },
  { handle: "nafanya_off", followers: 19271, avatar: `${basePath}/avatars/nafanya_off.webp`, links: [{ platform: "kick", url: "https://kick.com/nafanya_off" }] },
  { handle: "atustina", followers: 18943, avatar: `${basePath}/avatars/atustina.webp`, links: [{ platform: "kick", url: "https://kick.com/atustina" }] },
  { handle: "skinnny", followers: 17658, avatar: `${basePath}/avatars/skinnny.webp`, links: [{ platform: "kick", url: "https://kick.com/skinnny" }, { platform: "twitch", url: "https://www.twitch.tv/skinnny" }] },
  { handle: "fudow", followers: 17491, avatar: `${basePath}/avatars/fudow.webp`, links: [{ platform: "kick", url: "https://kick.com/fudow" }] },
];
