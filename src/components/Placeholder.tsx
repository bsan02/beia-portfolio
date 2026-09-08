import clsx from "clsx";

export default function Placeholder({
  hue,
  label,
  src,
  alt,
  className,
  fit = "cover",
}: {
  hue: number;
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  if (src) {
    if (fit === "contain") {
      // Center the whole image within the box without cropping — used for the
      // focused-photo modal, where portrait photos must never be clipped.
      return (
        <div className={clsx("relative flex items-center justify-center overflow-hidden", className)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? label ?? ""}
            className="h-auto max-h-full w-auto max-w-full object-contain"
          />
        </div>
      );
    }

    return (
      <div className={clsx("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? label ?? ""} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={clsx("relative flex items-end overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 88%), hsl(${hue} 55% 62%))`,
      }}
    >
      {label && (
        <span className="m-2 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-mono tracking-wide text-white/90 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
