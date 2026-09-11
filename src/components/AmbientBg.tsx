import { basePath } from "@/lib/site";

export function AmbientBg() {
  return (
    <img
      src={`${basePath}/textures/ambient-bg.webp`}
      alt=""
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover object-top"
    />
  );
}
