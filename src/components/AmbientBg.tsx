import { basePath } from "@/lib/site";

export function AmbientBg({
  className = "opacity-60",
  position = "top",
}: {
  className?: string;
  position?: "top" | "bottom" | "center";
}) {
  return (
    <img
      src={`${basePath}/textures/ambient-bg.webp`}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
