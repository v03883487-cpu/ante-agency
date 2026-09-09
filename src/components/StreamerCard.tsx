import type { Streamer } from "@/lib/streamers";

const platformStyle: Record<Streamer["links"][number]["platform"], { color: string; label: string }> = {
  kick: { color: "#53FC18", label: "Kick" },
  twitch: { color: "#9146FF", label: "Twitch" },
  youtube: { color: "#FF0033", label: "YouTube" },
  telegram: { color: "#29A9EB", label: "Telegram" },
  twitter: { color: "#1D9BF0", label: "X" },
  facebook: { color: "#1877F2", label: "Facebook" },
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
      className="group relative flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-5 transition-colors hover:border-black/30"
    >
      <span className="corner-bracket corner-bracket--tl" aria-hidden />
      <span className="corner-bracket corner-bracket--tr" aria-hidden />
      <span className="corner-bracket corner-bracket--bl" aria-hidden />
      <span className="corner-bracket corner-bracket--br" aria-hidden />
      <div className="flex items-center gap-4">
        <img
          src={streamer.avatar}
          alt={`Аватар ${streamer.handle}`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-2xl object-cover bg-black/5"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-[#0A0A0A]">{streamer.handle}</p>
          <p className="text-xs text-zinc-500">{formatFollowers(streamer.followers)} на Kick</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 pt-4">
        {streamer.links.map((l) => (
          <span
            key={l.platform}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-zinc-700"
            style={{ backgroundColor: `${platformStyle[l.platform].color}1A` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: platformStyle[l.platform].color }} />
            {platformStyle[l.platform].label}
          </span>
        ))}
      </div>
    </a>
  );
}
