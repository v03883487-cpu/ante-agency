import type { Streamer } from "@/lib/streamers";

const platformColor: Record<Streamer["platform"], string> = {
  Twitch: "#9146FF",
  Kick: "#53FC18",
  YouTube: "#FF0033",
};

export function StreamerCard({ streamer }: { streamer: Streamer }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#F4C95D]/30">
      <div className="flex items-center gap-4">
        <img
          src={streamer.avatar}
          alt={`Аватар стримера ${streamer.handle}`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-2xl bg-black/20"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-white">{streamer.handle}</p>
          <span
            className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium text-white/80"
            style={{ backgroundColor: `${platformColor[streamer.platform]}26` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: platformColor[streamer.platform] }} />
            {streamer.platform}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
        <span className="text-zinc-400">{streamer.niche}</span>
        <span className="font-semibold text-white">{streamer.followers}</span>
      </div>
    </div>
  );
}
