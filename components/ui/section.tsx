export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="mx-auto max-w-6xl px-5 py-20 sm:py-28"
    >
      <h2
        id={`${id}-h`}
        className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-sub">
          {intro}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  );
}
