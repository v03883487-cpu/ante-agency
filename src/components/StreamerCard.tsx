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
      className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#F4C95D]/30"
    >
      <div className="flex items-center gap-4">
        <img
          src={streamer.avatar}
          alt={`Аватар ${streamer.handle}`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-2xl object-cover bg-black/20"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-white">{streamer.handle}</p>
          <p className="text-xs text-zinc-500">{formatFollowers(streamer.followers)} на Kick</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        {streamer.links.map((l) => (
          <span
            key={l.platform}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-white/80"
            style={{ backgroundColor: `${platformStyle[l.platform].color}26` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: platformStyle[l.platform].color }} />
            {platformStyle[l.platform].label}
          </span>
        ))}
      </div>
    </a>
  );
}
