import clsx from "clsx";

export default function Placeholder({
  hue,
  label,
  className,
}: {
  hue: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex items-end overflow-hidden",
        className
      )}
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
