export type StreamerLink = {
  platform: "kick" | "twitch" | "youtube" | "telegram" | "twitter" | "facebook";
  url: string;
};

export type Streamer = {
  handle: string;
  links: StreamerLink[];
};

// Реальный ростер — официальные партнёры Ante. Ссылки ведут на настоящие
// публичные каналы. Подборка избранных, полный список — по запросу.
export const streamers: Streamer[] = [
  { handle: "psyqr", links: [{ platform: "kick", url: "https://kick.com/psyqr" }, { platform: "youtube", url: "https://www.youtube.com/@PsyQR" }] },
  { handle: "los-pibesdefiorito", links: [{ platform: "twitch", url: "https://www.twitch.tv/los_pibesdefiorito" }, { platform: "kick", url: "https://kick.com/los-pibesdefiorito" }] },
  { handle: "malditochimi", links: [{ platform: "kick", url: "https://kick.com/malditochimi" }, { platform: "twitch", url: "https://twitch.tv/malditochimi" }] },
  { handle: "tinchorslots", links: [{ platform: "twitch", url: "https://twitch.tv/tinchorslots" }, { platform: "kick", url: "https://kick.com/tinchorslots" }] },
  { handle: "fur1os", links: [{ platform: "kick", url: "https://kick.com/fur1os" }, { platform: "twitch", url: "https://www.twitch.tv/6furios9" }] },
  { handle: "xdardi", links: [{ platform: "kick", url: "https://kick.com/xdardi" }, { platform: "twitch", url: "https://www.twitch.tv/xdardi" }] },
  { handle: "kinglegend", links: [{ platform: "kick", url: "https://kick.com/kinglegend" }, { platform: "twitch", url: "https://www.twitch.tv/legendssmokes" }] },
  { handle: "chiper32", links: [{ platform: "twitch", url: "https://twitch.tv/chiper32" }, { platform: "kick", url: "https://kick.com/chiper32" }] },
  { handle: "onexpert", links: [{ platform: "kick", url: "https://kick.com/onexpert" }, { platform: "twitch", url: "https://www.twitch.tv/onexpert127" }] },
  { handle: "gara", links: [{ platform: "kick", url: "https://kick.com/gara" }, { platform: "twitch", url: "https://twitch.tv/gara" }] },
];
