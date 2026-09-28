import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  cols?: number;
  rows?: number;
  className?: string;
};

export function InteractiveGrid({
  size = 40,
  cols = 56,
  rows = 26,
  className,
}: Props) {
  return (
    <svg
      aria-hidden
      width={size * cols}
      height={size * rows}
      className={cn(
        "absolute left-1/2 top-0 max-w-none -translate-x-1/2",
        className,
      )}
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <rect
          key={i}
          x={(i % cols) * size}
          y={Math.floor(i / cols) * size}
          width={size}
          height={size}
          className="fill-transparent stroke-line/60 transition-colors duration-700 hover:fill-soft hover:duration-75"
        />
      ))}
    </svg>
  );
}
