"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldTopo from "world-atlas/countries-110m.json";
import { tierIdMap, tier1Countries, tier2Countries } from "@/lib/geoTiers";

const TIER_COLOR: Record<1 | 2 | 3, string> = {
  1: "var(--accent)",
  2: "var(--accent-2)",
  3: "#2a2d33",
};

export function WorldTierMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white">
        <ComposableMap
          projectionConfig={{ scale: 148, center: [10, 10] }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={worldTopo as unknown as string}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const tier = (tierIdMap[String(geo.id)] ?? 3) as 1 | 2 | 3;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHovered(geo.properties?.name ?? null)}
                    onMouseLeave={() => setHovered(null)}
                    fill={TIER_COLOR[tier]}
                    stroke="#0a0a0a"
                    strokeWidth={0.5}
                    className="cursor-pointer transition-opacity outline-none hover:opacity-75"
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="mt-4 flex min-h-[1.5rem] items-center justify-center text-sm text-zinc-400">
        {hovered ?? "Наведите на страну"}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: TIER_COLOR[1] }} />
          <span className="text-zinc-300">Tier 1 · {tier1Countries.length} гео</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-white/20" style={{ background: TIER_COLOR[2] }} />
          <span className="text-zinc-300">Tier 2 · {tier2Countries.length} гео</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: TIER_COLOR[3] }} />
          <span className="text-zinc-300">Tier 3 · точечно</span>
        </div>
      </div>
    </div>
  );
}
