import { type ComponentProps } from "react";

const styles = {
  primary: "bg-brand text-brand-ink hover:brightness-110 shadow-sm",
  ghost: "border border-line bg-surface text-ink hover:bg-muted",
};

type Props = ComponentProps<"a"> & { variant?: keyof typeof styles };

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition active:scale-[.98] ${styles[variant]} ${className}`}
    />
  );
}
