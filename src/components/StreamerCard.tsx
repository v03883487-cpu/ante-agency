import type { Streamer } from "@/lib/streamers";

const platformLabel: Record<Streamer["links"][number]["platform"], string> = {
  kick: "Kick",
  twitch: "Twitch",
  youtube: "YouTube",
  telegram: "Telegram",
  twitter: "X",
  facebook: "Facebook",
};

function formatFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return String(n);
}

function hashHue(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export function StreamerCard({ streamer }: { streamer: Streamer }) {
  const primary = streamer.links[0];
  const initials = streamer.handle.slice(0, 2).toUpperCase();
  const hue = hashHue(streamer.handle);

  return (
    <a
      href={primary.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white transition-colors hover:border-white/30"
    >
      <span className="corner-bracket corner-bracket--tl" aria-hidden />
      <span className="corner-bracket corner-bracket--tr" aria-hidden />
      <span className="corner-bracket corner-bracket--bl" aria-hidden />
      <span className="corner-bracket corner-bracket--br" aria-hidden />

      <div
        className="flex aspect-square w-full items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(150deg, hsl(${hue} 55% 22%), hsl(${(hue + 40) % 360} 45% 12%))` }}
      >
        <span className="font-display text-5xl uppercase tracking-tight text-white/85">{initials}</span>
      </div>

      <div className="flex flex-col gap-2 p-3.5">
        <span className="truncate font-display text-lg uppercase tracking-tight text-white">
          {streamer.handle}
        </span>
        <dl className="flex flex-col gap-1 border-t border-white/10 pt-2.5 text-[11px]">
          <div className="flex items-center justify-between gap-2">
            <dt className="uppercase tracking-wide text-zinc-500">Платформа</dt>
            <dd className="truncate text-zinc-300">{streamer.links.map((l) => platformLabel[l.platform]).join(", ")}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="uppercase tracking-wide text-zinc-500">Подписчики</dt>
            <dd className="text-zinc-300">{formatFollowers(streamer.followers)}</dd>
          </div>
        </dl>
      </div>
    </a>
  );
}
