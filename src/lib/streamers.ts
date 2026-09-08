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
  { handle: "malikos", followers: 422756, avatar: `${basePath}/avatars/malikos.webp`, links: [{ platform: "kick", url: "https://kick.com/malikos" }] },
  { handle: "rammus53", followers: 385473, avatar: `${basePath}/avatars/rammus53.webp`, links: [{ platform: "kick", url: "https://kick.com/rammus53" }] },
  { handle: "noorgamer", followers: 261290, avatar: `${basePath}/avatars/noorgamer.webp`, links: [{ platform: "kick", url: "https://kick.com/noorgamer" }] },
  { handle: "luanz7", followers: 138062, avatar: `${basePath}/avatars/luanz7.webp`, links: [{ platform: "kick", url: "https://kick.com/luanz7" }] },
  { handle: "rami110", followers: 118820, avatar: `${basePath}/avatars/rami110.webp`, links: [{ platform: "kick", url: "https://kick.com/rami110" }] },
  { handle: "locking1", followers: 89181, avatar: `${basePath}/avatars/locking1.webp`, links: [{ platform: "kick", url: "https://kick.com/locking1" }] },
  { handle: "pabellon4", followers: 88443, avatar: `${basePath}/avatars/pabellon4.webp`, links: [{ platform: "twitch", url: "https://www.twitch.tv/pabellon_4" }, { platform: "kick", url: "https://www.kick.com/pabellon4" }] },
  { handle: "kinglegend", followers: 72125, avatar: `${basePath}/avatars/kinglegend.webp`, links: [{ platform: "kick", url: "https://kick.com/kinglegend" }, { platform: "twitch", url: "https://www.twitch.tv/legendssmokes" }] },
  { handle: "Pablononis7", followers: 65351, avatar: `${basePath}/avatars/Pablononis7.webp`, links: [{ platform: "kick", url: "https://kick.com/Pablononis7" }] },
  { handle: "rootthegamer", followers: 62845, avatar: `${basePath}/avatars/rootthegamer.webp`, links: [{ platform: "kick", url: "https://kick.com/rootthegamer" }] },
  { handle: "MrJayPlays", followers: 62188, avatar: `${basePath}/avatars/MrJayPlays.webp`, links: [{ platform: "kick", url: "https://kick.com/MrJayPlays" }] },
  { handle: "mitsuke", followers: 59779, avatar: `${basePath}/avatars/mitsuke.webp`, links: [{ platform: "kick", url: "https://kick.com/mitsuke" }] },
  { handle: "mathematicien", followers: 59741, avatar: `${basePath}/avatars/mathematicien.webp`, links: [{ platform: "kick", url: "https://kick.com/mathematicien" }] },
  { handle: "thefiverd", followers: 58102, avatar: `${basePath}/avatars/thefiverd.webp`, links: [{ platform: "kick", url: "https://kick.com/thefiverd" }] },
];
