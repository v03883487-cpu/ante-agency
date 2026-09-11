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

export function StreamerCard({ streamer }: { streamer: Streamer }) {
  const primary = streamer.links[0];

  return (
    <a
      href={primary.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white transition-colors hover:border-white/30"
    >
      <span className="corner-bracket corner-bracket--tl" aria-hidden />
      <span className="corner-bracket corner-bracket--tr" aria-hidden />
      <span className="corner-bracket corner-bracket--bl" aria-hidden />
      <span className="corner-bracket corner-bracket--br" aria-hidden />

      <div className="aspect-square w-full overflow-hidden bg-white/10">
        <img
          src={streamer.avatar}
          alt={`Аватар ${streamer.handle}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-display text-xl font-bold uppercase tracking-tight text-white">
            {streamer.handle}
          </span>
          <span className="shrink-0 text-xs text-zinc-500">{formatFollowers(streamer.followers)}</span>
        </div>
        <dl className="flex flex-col gap-1.5 border-t border-white/10 pt-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <dt className="uppercase tracking-wide text-zinc-500">Платформы</dt>
            <dd className="text-zinc-300">{streamer.links.map((l) => platformLabel[l.platform]).join(", ")}</dd>
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
