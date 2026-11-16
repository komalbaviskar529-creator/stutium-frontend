export function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 id={id} className="text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-2 max-w-xl text-muted">{subtitle}</p>}
      <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-linear-to-r from-[#d99a2b] to-[#c2386a]" />
    </div>
  );
}