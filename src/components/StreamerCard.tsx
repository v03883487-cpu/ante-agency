import type { Streamer } from "@/lib/streamers";

const platformStyle: Record<Streamer["links"][number]["platform"], { color: string; label: string }> = {
  kick: { color: "#53FC18", label: "Kick" },
  twitch: { color: "#9146FF", label: "Twitch" },
  youtube: { color: "#FF0033", label: "YouTube" },
  telegram: { color: "#29A9EB", label: "Telegram" },
  twitter: { color: "#1D9BF0", label: "X" },
  facebook: { color: "#1877F2", label: "Facebook" },
};

const avatarPalette = ["#F4C95D", "#E28B2F", "#22C55E", "#6366F1", "#EC4899", "#38BDF8"];

function avatarColor(handle: string) {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  return avatarPalette[hash % avatarPalette.length];
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
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-[#0A0B0E]"
          style={{ backgroundColor: avatarColor(streamer.handle) }}
          aria-hidden
        >
          {streamer.handle.slice(0, 2).toUpperCase()}
        </div>
        <p className="min-w-0 truncate font-display text-base font-bold text-white">{streamer.handle}</p>
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
