export type StreamerLink = {
  platform: "kick" | "twitch" | "youtube" | "telegram" | "twitter" | "facebook";
  url: string;
};

export type Streamer = {
  handle: string;
  followers: number;
  links: StreamerLink[];
};

// Реальный ростер — официальные партнёры Ante, топ по подписчикам на Kick
// (фактические цифры получены через публичное Kick API на момент сборки сайта).
export const streamers: Streamer[] = [
  { handle: "malikos", followers: 422756, links: [{ platform: "kick", url: "https://kick.com/malikos" }] },
  { handle: "rammus53", followers: 385473, links: [{ platform: "kick", url: "https://kick.com/rammus53" }] },
  { handle: "noorgamer", followers: 261290, links: [{ platform: "kick", url: "https://kick.com/noorgamer" }] },
  { handle: "luanz7", followers: 138062, links: [{ platform: "kick", url: "https://kick.com/luanz7" }] },
  { handle: "rami110", followers: 118820, links: [{ platform: "kick", url: "https://kick.com/rami110" }] },
  { handle: "locking1", followers: 89181, links: [{ platform: "kick", url: "https://kick.com/locking1" }] },
  { handle: "pabellon4", followers: 88443, links: [{ platform: "twitch", url: "https://www.twitch.tv/pabellon_4" }, { platform: "kick", url: "https://www.kick.com/pabellon4" }] },
  { handle: "kinglegend", followers: 72125, links: [{ platform: "kick", url: "https://kick.com/kinglegend" }, { platform: "twitch", url: "https://www.twitch.tv/legendssmokes" }] },
  { handle: "Pablononis7", followers: 65351, links: [{ platform: "kick", url: "https://kick.com/Pablononis7" }] },
  { handle: "rootthegamer", followers: 62845, links: [{ platform: "kick", url: "https://kick.com/rootthegamer" }] },
  { handle: "MrJayPlays", followers: 62188, links: [{ platform: "kick", url: "https://kick.com/MrJayPlays" }] },
  { handle: "mitsuke", followers: 59779, links: [{ platform: "kick", url: "https://kick.com/mitsuke" }] },
  { handle: "mathematicien", followers: 59741, links: [{ platform: "kick", url: "https://kick.com/mathematicien" }] },
  { handle: "thefiverd", followers: 58102, links: [{ platform: "kick", url: "https://kick.com/thefiverd" }] },
];
