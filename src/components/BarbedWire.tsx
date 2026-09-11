import { basePath } from "@/lib/site";

export function BarbedWire({ className = "opacity-40" }: { className?: string }) {
  return (
    <img
      src={`${basePath}/textures/barbed-wire.webp`}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-[180px] w-full object-cover mix-blend-screen ${className}`}
    />
  );
}
